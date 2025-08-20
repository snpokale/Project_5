import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CareerExplorer() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/careers`).then(res => setCareers(res.data));
  }, []);

  return (
    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card">
      <h2>Career Explorer</h2>
      <ul>
        {careers.map(c => (
          <li key={c.id}>
            <strong>{c.name}</strong>: {c.description}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
