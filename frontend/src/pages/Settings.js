import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setLanguage } from '../slices/uiSlice';
import { motion } from 'framer-motion';

export default function Settings() {
  const dispatch = useDispatch();
  const darkTheme = useSelector(state => state.ui.darkTheme);
  const language = useSelector(state => state.ui.language);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card">
      <h2>Settings</h2>
      <div>
        <button onClick={() => dispatch(toggleTheme())}>
          Toggle {darkTheme ? "Light" : "Dark"} Theme
        </button>
      </div>
      <div>
        <label>Language</label>
        <select value={language} onChange={e => dispatch(setLanguage(e.target.value))}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          {/* Add more languages */}
        </select>
      </div>
    </motion.div>
  );
}
