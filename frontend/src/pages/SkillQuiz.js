import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setSuggestions } from '../slices/careerSlice';
import { motion } from 'framer-motion';

export default function SkillQuiz() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [resumeText, setResumeText] = useState("");

  const handleQuiz = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/careers/suggest`, {
      skills,
      interests,
      resume_text: resumeText,
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    dispatch(setSuggestions(res.data));
    alert("Quiz submitted! Check dashboard for updated suggestions.");
  };

  return (
    <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="card">
      <h2>Skill Assessment Quiz</h2>
      <form onSubmit={handleQuiz}>
        <label>Skills (comma separated)</label>
        <input value={skills.join(",")} onChange={e => setSkills(e.target.value.split(","))} />
        <label>Interests (comma separated)</label>
        <input value={interests.join(",")} onChange={e => setInterests(e.target.value.split(","))} />
        <label>Paste Resume Text</label>
        <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} />
        <button type="submit">Submit Quiz</button>
      </form>
    </motion.div>
  );
}
