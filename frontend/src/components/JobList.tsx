interface Job {
  _id: string;
  input: string;
  regexPattern: string;
  status: string;
}

function JobList({ jobs }: { jobs: Job[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Valid":
        return "green";
      case "Invalid":
        return "red";
      default:
        return "orange";
    }
  };

  return (
    <div className="job-list">
      <h2>Job History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Input</th>
            <th>Regex Pattern</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job._id.substring(18)}</td>
              <td>{job.input}</td>
              <td>{job.regexPattern}</td>
              <td style={{ color: getStatusColor(job.status) }}>
                {job.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default JobList;
