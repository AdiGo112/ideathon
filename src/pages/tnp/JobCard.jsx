export default function JobCard({ job, setJobs }) {
  const toggleStatus = () => {
    setJobs(prev =>
      prev.map(j =>
        j.id === job.id
          ? { ...j, status: j.status === "active" ? "completed" : "active" }
          : j
      )
    )
  }

  return (
    <div className="job-card">
      <h3>{job.companyName}</h3>
      <p>{job.jd}</p>
      <p><b>Status:</b> {job.status}</p>

      <button onClick={toggleStatus}>
        Mark as {job.status === "active" ? "Completed" : "Active"}
      </button>

      {job.status === "completed" && (
        <div className="placed-section">
          <h4>Placed Students</h4>
          {job.placedStudents.map((s, i) => (
            <p key={i}>{s.name} – {s.package}</p>
          ))}
        </div>
      )}
    </div>
  )
}