import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import type { ReactNode } from "react";

interface Job {
  _id: string;
  input: string;
  regexPattern: string;
  status: "Validating" | "Valid" | "Invalid";
}

interface JobListProps {
  jobs: Job[];
}

const StatusIcon = ({ status }: { status: Job["status"] }): ReactNode => {
  switch (status) {
    case "Valid":
      return <CheckCircle className="status-icon" size={18} />;
    case "Invalid":
      return <AlertCircle className="status-icon" size={18} />;
    case "Validating":
      return <Clock className="status-icon" size={18} />;
    default:
      return null;
  }
};

const JobList = ({ jobs }: JobListProps) => {
  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📋</div>
        <h3>No validation jobs yet</h3>
        <p>Submit a regular expression above to see results here</p>
      </div>
    );
  }

  return (
    <div className="job-list">
      <h2 className="list-title">Validation Results ({jobs.length})</h2>

      {jobs.map((job) => (
        <div
          key={job._id}
          className={`job-item status-${job.status.toLowerCase()}`}
        >
          <div className="job-status-indicator"></div>

          <div className="job-content">
            <div className="job-id">
              <strong className="job-id-label">ID:</strong>
              <code className="job-id-value">{job._id}</code>
            </div>
            <div className="job-header">
              <div className="job-input-wrapper">
                <strong className="job-input-label">Input:</strong>
                <code className="job-input">{job.input}</code>
              </div>
              <span
                className={`status-badge status-${job.status.toLowerCase()}`}
              >
                <StatusIcon status={job.status} />
                {job.status}
              </span>
            </div>

            {job.regexPattern && (
              <div className="job-details">
                <div className="job-pattern-label">Pattern:</div>
                <code className="job-pattern">{job.regexPattern}</code>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
