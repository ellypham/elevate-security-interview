import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('events');
        setEvents(result.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Security Incident Event Log</h1>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Employee ID</th>
            <th>Incident Type</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td>{new Date(event.timestamp * 1000).toLocaleString()}</td>
              <td>{event.id}</td>
              <td>{event.types}</td>
              <td>{event.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
