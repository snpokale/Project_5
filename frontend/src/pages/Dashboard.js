import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSuggestions } from '../slices/careerSlice';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Chart } from 'react-chartjs-2';

export default function Dashboard() {
  const user = useSelector(state => state.user);
  const career = useSelector(state => state.career);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      axios.post(`${process.env.REACT_APP_API_URL}/careers/suggest`, {
        skills: user.skills,
        interests: user.interests,
        resume_text: user.resumeText,
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      }).then(res => dispatch(setSuggestions(res.data)));
    }
  }, [user, dispatch]);

  return (
    <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="card">
      <h2>Dashboard</h2>
      <h3>Career Suggestions</h3>
      <ul>
        {career.suggestions.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <h3>Career Roadmap</h3>
      <ul>
        {career.roadmap.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
      {/* Analytics with charts */}
      <Chart type="bar" data={{
        labels: career.suggestions,
        datasets: [{
          label: 'Career Match',
          data: career.suggestions.map(() => Math.random()*100),
          backgroundColor: '#5865f2'
        }]
      }} />
    </motion.div>
  );
}
