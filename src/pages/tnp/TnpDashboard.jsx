import { useState } from "react"
import { jobs as initialJobs } from "../../data/jobs"
import JobCard from "./JobCard"
import AddJobModal from "./AddJobModal"
import { useAuth } from "../../context/AuthContext"

export default function TnpDashboard() {
  const [jobs, setJobs] = useState(initialJobs)
  const [department, setDepartment] = useState("Computer Engineering")
  const [showAdd, setShowAdd] = useState(false)

  const { logout } = useAuth()

  const filteredJobs = jobs.filter(j => j.department === department)

  return (
    <>
      <div className="tnp-dashboard">
        {/* HEADER */}
        <div className="tnp-header">
          <h1>TnP Dashboard</h1>
          <button className="tnp-logout" onClick={logout}>
            Logout
          </button>
        </div>

        {/* CONTROLS */}
        <div className="tnp-controls">
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
          >
            <option>Computer Engineering</option>
            <option>IT Engineering</option>
            <option>AI & DS</option>
          </select>

          <button onClick={() => setShowAdd(true)}>+ Add Job</button>
        </div>

        {/* JOB CARDS */}
        <div className="job-grid">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} setJobs={setJobs} />
          ))}
        </div>
      </div>

      {/* ✅ MODAL IS OUTSIDE NORMAL FLOW */}
      {showAdd && (
        <AddJobModal
          setJobs={setJobs}
          close={() => setShowAdd(false)}
        />
      )}
    </>
  )
}