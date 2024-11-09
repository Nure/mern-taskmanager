// client/src/components/TaskForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({ title: '', description: '', dueDate: new Date() });
  
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/tasks/${id}`)
        .then((response) => setTask(response.data))
        .catch((error) => console.error(error));
    }
  }, [id]);
  
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  
  const handleDateChange = (date) => {
    setTask({ ...task, dueDate: date });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const request = id
      ? axios.put(`http://localhost:5000/api/tasks/${id}`, task)
      : axios.post('http://localhost:5000/api/tasks', task);
    
    request.then(() => navigate('/'))
      .catch((error) => console.error(error));
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <DatePicker
        selected={task.dueDate}
        onChange={handleDateChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default TaskForm;
