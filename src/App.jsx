import { useState, useEffect } from "react";
import './App.css'

function App(){
  const [applications, setApplications] = useState([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [dateApplied, setDateApplied] = useState('')
  const [status, setStatus] = useState('applied')

  useEffect(() => {
    fetch('https://job-tracker-backend-oqia.onrender.com/api/applications/')
      .then(response => response.json())
      .then(data => setApplications(data))
  }, [])

  function handleSubmit(event){
    event.preventDefault()

    if (editingId) {
      fetch(`https://job-tracker-backend-oqia.onrender.com/api/applications/${editingId}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company,
          role: role,
          status: status,
        })
      })
        .then(response => response.json())
        .then(updatedApp => {
          setApplications(applications.map((app) =>
            app.id === editingId ? updatedApp : app
          ))
          setCompany('')
          setRole('')
          setEditingId(null)

      })
  }
    else {
      fetch('https://job-tracker-backend-oqia.onrender.com/api/applications/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: company,
          role: role,
          date_applied: dateApplied
      })
  })
    .then(response => response.json())
    .then(newApp => {
      setApplications([...applications, newApp])
      setCompany('')
      setRole('')
      setDateApplied('')
    })
  }
}
  
  function handleDelete(id){
    fetch(`https://job-tracker-backend-oqia.onrender.com/api/applications/${id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id))
      })
  }

  function handleEditClick(app) {
    setEditingId(app.id)
    setCompany(app.company)
    setRole(app.role)
    setStatus(app.status)
    setDateApplied(app.date_applied)
    
  }
  return (
    <div className = "container">
      <h1>Job Application Tracker</h1>
      <form onSubmit = {handleSubmit}>
        <input
          type = "text"
          placeHolder = "Company"
          value = {company}
          onChange = { (e) => setCompany(e.target.value)}
        />
        <input
          type = "text"
          placeHolder = "Role"
          value = {role}
          onChange = { (e) => setRole(e.target.value)}
        />
        <input
          type = "date"
          value = {dateApplied}
          onChange = { (e) => setDateApplied(e.target.value)}
        />
        <select value ={status} onChange ={ (e) => setStatus(e.target.value)}>
          <option value = "applied">Applied</option>
          <option value = "interviewing">Interviewing</option>
          <option value = "offer">Offer</option>
          <option value = "rejected">Rejected</option>
        </select>
        <button type="submit">{editingId ? 'Save Changes' : 'Add Application'}</button>
      </form>
      <ul>
        {applications.map((app) => (
          <li key = {app.id}>
            <span className = "app-info">
              {app.role} at {app.company} - {app.status}
            </span>
            <div className = "app-actions">
              <button onClick = {() => handleEditClick(app)}>Edit</button>
              <button onClick = {() => handleDelete(app.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App