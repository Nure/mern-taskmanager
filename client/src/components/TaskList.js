// client/src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);
  
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error(error));
  };
  
  return (
    <div>
      <h1>Task Manager</h1>
      <Link to="/task">Add New Task</Link>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
