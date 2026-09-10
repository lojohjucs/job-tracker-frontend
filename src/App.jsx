import { useState, useEffect } from "react";

function App(){
  const [applications, setApplications] = useState([])
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/applications/')
      .then(response => response.json())
      .then(data => setApplications(data))
  }, [])

  function handleSubmit(event){
    event.preventDefault()

    fetch('http://127.0.0.1:8000/api/applications/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        company: company,
        role: role,
        date_applied: '2026-09-09'
      })
    })
      .then(response => response.json())
      .then(newApp => {
        setApplications([...applications, newApp])
        setCompany('')
        setRole('')
      })
  }
  
  function handleDelete(id){
    fetch(`http://127.0.0.1:8000/api/applications/${id}/`, {
      method: 'DELETE'
    })
      .then(() => {
        setApplications(applications.filter((app) => app.id !== id))
      })
  }

  return (
    <div>
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
        <button type = "submit">Add Application</button>
      </form>
      <ul>
        {applications.map((app) => (
          <li key = {app.id}>
            {app.role} at {app.company} - {app.status}
            <button onClick = {() => handleDelete(app.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App