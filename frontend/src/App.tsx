"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { io, type Socket } from "socket.io-client";
import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import "./styles.css"; // Import the CSS file

interface Job {
  _id: string;
  input: string;
  regexPattern: string;
  status: "Validating" | "Valid" | "Invalid";
}

const statusMap: Record<string, Job["status"]> = {
  VALID: "Valid",
  INVALID: "Invalid",
  VALIDATING: "Validating",
};

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const url = import.meta.env.VITE_API_URL;
  const wsUrl = import.meta.env.VITE_WS_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${url}/jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();

    const socket: Socket = io(wsUrl, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("✅ Connected to WebSocket");
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from WebSocket");
    });

    socket.onAny((event, data) => {
      const normalizedStatus =
        statusMap[data.status.toUpperCase()] ?? "Validating";
      if (event.startsWith("job:update:")) {
        console.log("📡 Received job update:", data);
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job._id === data.jobId ? { ...job, status: normalizedStatus } : job
          )
        );
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [url, wsUrl]);

  const addJob = async (input: string) => {
    try {
      const response = await axios.post(`${url}/jobs`, { input });
      setJobs((prevJobs) => [response.data, ...prevJobs]);
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="container">
      <h1>Real-Time Regex Validator</h1>
      <JobForm onSubmit={addJob} />
      <JobList jobs={jobs} />
    </div>
  );
}

export default App;
