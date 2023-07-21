import React from 'react';
import { motion } from 'framer-motion';
import './styles.css';
import SoftButton from '../../../soft-components/SoftButton';
import logo from '../../../logo.svg';
import { Link } from 'react-router-dom';

const Auth = () => {
    const gradientStyle = {
        background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
        WebkitBackgroundClip: 'text', // For Safari support
        WebkitTextFillColor: 'transparent', // For Safari support
        color: '#000', // Fallback color for non-supporting browsers
        fontWeight: 'bold',
        fontSize: '2rem',
        familyFont: 'Roboto',
      };

  return (
    <div className="container">
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="content"
      >
       <center><img src={logo} className="App-logo" alt="logo" /></center>
    <div style={gradientStyle}>
      <i>Web Theme Kenya</i>
    </div>
        <p>
        The  2023 WebThemesKenya Launch
        Project launch: 7th August, 2023. 1,100
        universities students will be selected for Pioneering this project.
        </p>
        <p>
        <i>Empowering the Next Generation of Digital Innovators...</i>
        </p>
      </motion.section>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="cta-button"
      >
      <Link to='/login'>
      <SoftButton
      component="a"
      target="_blank"
      rel="noreferrer"
      variant="gradient"
      color="info"
      fullWidth
    >
      Sign In
    </SoftButton>
    </Link>
      </motion.div>
    </div>
  );
};

export default Auth;
