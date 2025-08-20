import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../slices/userSlice';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Profile() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState(user.skills || []);
  const [interests, setInterests] = useState(user.interests || []);
  const [resumeText, setResumeText] = useState(user.resumeText || "");

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_URL}/profile/${user.username}`, {
      username: user.username,
      email: user.email,
      skills,
      interests,
      resume_text: resumeText,
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    dispatch(updateProfile({ skills, interests, resumeText }));
    alert("Profile updated!");
  };

  return (
    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="card">
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <label>Skills (comma separated)</label>
        <input value={skills.join(",")} onChange={e => setSkills(e.target.value.split(","))} />
        <label>Interests (comma separated)</label>
        <input value={interests.join(",")} onChange={e => setInterests(e.target.value.split(","))} />
        <label>Resume Text</label>
        <textarea value={resumeText} onChange={e => setResumeText(e.target.value)} />
        <button type="submit">Update Profile</button>
      </form>
    </motion.div>
  );
}
