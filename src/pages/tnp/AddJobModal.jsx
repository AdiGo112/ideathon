import { useState } from "react"

export default function AddJobModal({ setJobs, close }) {
  const [form, setForm] = useState({
    companyName: "",
    companyInfo: "",
    jd: "",
    requirements: "",
    department: "Computer Engineering"
  })

  const submit = () => {
    setJobs(prev => [
      ...prev,
      {
        id: Date.now(),
        ...form,
        status: "active",
        placedStudents: []
      }
    ])
    close()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        {/* HEADER */}
        <div className="modal-header">
          <h2>Add Job</h2>
          <button className="modal-close" onClick={close}>
            ✕
          </button>
        </div>

        {/* FORM */}
        <input
          placeholder="Company Name"
          onChange={e => setForm({ ...form, companyName: e.target.value })}
        />
        <input
          placeholder="Company Info"
          onChange={e => setForm({ ...form, companyInfo: e.target.value })}
        />
        <input
          placeholder="Job Description"
          onChange={e => setForm({ ...form, jd: e.target.value })}
        />
        <input
          placeholder="Requirements"
          onChange={e => setForm({ ...form, requirements: e.target.value })}
        />

        {/* ACTIONS */}
        <div className="modal-actions">
          <button className="btn-primary" onClick={submit}>
            Submit
          </button>
          <button className="btn-secondary" onClick={close}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}