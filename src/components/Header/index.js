import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import logo from '../../logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth, db } from '../../firebase';
import { Avatar, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { updateAuthId } from '../../redux/dataSlice';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import { MDBCardImage } from 'mdb-react-ui-kit';
import { deepOrange } from '@mui/material/colors';
import Contact from './Contact';


export default function Header() {
  const authId = useSelector((state) => state.authId);
  const [currentUser, setCurrentUser] = React.useState(``)
  const history = useNavigate()
  const dispatch = useDispatch();
  const [modalShowAbout, setModalShowAbout] = React.useState(false);
  const [modalShowContact, setModalShowContact] = React.useState(false);


  React.useEffect(() => {
    const unsub = auth?.onAuthStateChanged((user) => {
      db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
        setCurrentUser(doc.data());
      });
    });
  
    // Clean up the listener when the component unmounts
    return () => unsub();
  }, []);



const logout = () => {
  auth.signOut();
  dispatch(updateAuthId(''))
  Swal.fire({
    icon: 'success',
    title: 'Logged out successfully',
    text: 'See you soon!',
  })
  history('/login')
}

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar
    style={{
      background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      zIndex: 1500,
      position: 'fixed', // Make the header fixed
      top: 0, // Distance from the top of the viewport
      width: '100%', // Set the width to take the full viewport width
    }}
  >
        <Toolbar>
        <Link to='/'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          <img src={logo} className="App-logo" alt="logo" />
          </IconButton>
          </Link>
          <Typography style={{
            display:'flex',
            alignItems:'center',
          }} variant="h6" component="div" sx={{ flexGrow: 1 }}>          
        <Button style={{
          fontWeight: "bold",
          color:'#fff'
        }} variant='outlined' onClick={() =>setModalShowAbout(true)}>About</Button>  

        <Button style={{
          fontWeight: "bold",
          color:'#fff',
          marginLeft:5
        }} variant='outlined' onClick={() =>setModalShowContact(true)}>Contact</Button>  
          </Typography>
          {authId ? (
            <>
            {authId === 'Kkatkd6HvQc3ekAxFzps9ZjZqsJ2' ? (
              <Avatar style={{cursor:'pointer'}} onClick={logout}>AD</Avatar>
            ):(
              <Tooltip title="Logout">
              <MDBCardImage onClick={logout} src={currentUser?.profilePhoto}
                      alt={currentUser?.firstName} style={{ width:40, height:40, borderRadius:40/2, cursor: 'pointer', objectFit: 'cover' }} fluid />
              </Tooltip>
            )}
            </>
          ):(
            <Link to='/register'>
            <Button style={{
              fontWeight: "bold",
              color:'#fff'
            }} variant='outlined'>Register</Button>  
            </Link>
          )}
        </Toolbar>
      </AppBar>


      <Modal
      show={modalShowAbout}
      onHide={() => setModalShowAbout(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        zIndex:1500
      }}
    >
    <Modal.Header
    style={{
      background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      color:'#fff',
      display:'flex',
      justifyContent:'space-between',
    }}
    >
    <Modal.Title id="contained-modal-title-vcenter">
    Web themes profile 
    </Modal.Title>
    <CloseIcon onClick={() => setModalShowAbout(false)} fontSize="medium" style={{cursor:'pointer'}} />
  </Modal.Header>
      <Modal.Body
      style={{
        height:500,
        overflowY:'auto',
        background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
        color:'#fff'
      }}
      >
      <center><i style={{fontWeight:'bold'}}>Mission</i></center>
      <hr />
      <Typography variant="body2" color="text.secondary">
      Empowering the Next Generation of Digital Innovators
      WebThemesKenya is a Non-profit organisation launched by MarketConnect, a conglomerate of WHMCS on July 6th 2023 aiming to equip university students with the knowledge and skills necessary to excel in the rapidly evolving world of web development and technology. <br/>We are dedicated to empowering the next generation of digital innovators by providing them with comprehensive training programs tailored to their needs.
      Our mission is driven by the recognition that the digital landscape is constantly evolving, and proficiency in web themes design and tech-related skills is crucial for success in today's job market. <br />We believe that every student should have access to high-quality training that prepares them to meet the demands of the digital age and pursue rewarding careers in the field.   
      <br />
      <br />
      To achieve our mission, we have developed a multifaceted approach:
Comprehensive Training: We offer a well designed training that covers a wide range of topics, including:
              <br />
              <b >-the Classic Cpanel and the Plate Web fundamentals</b>
              <br />
              <b >-web themes design fundamentals(No Coding)</b>
              <br />
              <b >-front-end and back-end development(No Coding)</b>
              <br />
              <b >-user experience (UX) design(No Coding)</b>
              <br />
              <b >-responsive design.(No Coding)</b>
              
    </Typography>
    <br />
    <Typography variant="body2" color="text.secondary">
    <p>
    Our training is regularly updated to keep pace with the latest industry trends and emerging technologies.
    Experienced Instructors: We engage industry professionals with extensive experience in web development to serve as instructors and mentors. They bring their real-world expertise and passion for the field, providing students with invaluable insights and guidance throughout their learning journey.
    </p>
    <p>
    Hands-on Learning: We emphasize hands-on learning experiences to ensure that students gain practical skills that they can apply in real-world scenarios. Our training programs incorporate:
    <br />
    <b>-project-based assignments</b>
    <br />
    <b>-group collaborations</b>
    <br />
    <b>-interactive workshops, enabling students to develop their creativity, problem-solving abilities, and teamwork skills.</b>
    </p>
  </Typography>
  <br />
  <Typography variant="body2" color="text.secondary">
  Industry Connections: We foster strong relationships with leading tech companies, startups, and industry professionals. Through guest instructors, networking events, and internship opportunities, we provide students with access to valuable industry connections, opening doors to future employment and collaboration possibilities.
  Inclusive and Accessible: We strive to create an inclusive and accessible learning environment. Our programs are open to students from all backgrounds, regardless of their prior experience or educational discipline. We actively seek to bridge the gender and diversity gap in the tech industry, promoting equal opportunities for all aspiring digital professionals.
  <p>
  By executing this mission, we aim to transform university students into skilled developers and technologists who can shape the future of digital innovation. We are committed to making a positive impact on their educational journey and equipping them with the tools they need to succeed in a technology-driven world.
Join us on our mission to empower the next generation of digital innovators and create a brighter future for development and technology. Together, we can unleash the potential of university students and prepare them for the exciting challenges that lie ahead.
  </p>
    </Typography>
    <br />
    <center><i style={{fontWeight:'bold'}}>The  2023 WebThemesKenya Launch</i></center>
    <hr />
    <Typography variant="body2" color="text.secondary">
    Project launch: 8th August, 2023
    <br />
    Slots: 1,100 students will be allocated for students in over 10 universities in Kenya
    <br />
    Universities selected for Pioneering and allocate students 
    <br />
    The university of Nairobi - 200 
    <br />
Kenyatta university - 200
<br />
JKUAT - 100
<br />
T.U.K - 100
<br />
Moi university - 100
<br />
Masinde Muliro university (MMUST) - 100
<br />
Embu university - 100
<br />
Maseno University -100
<br />
Machakos University -100
<br />
    </Typography>
    <br />
    <center><i style={{fontWeight:'bold'}}>Eligibility</i></center>
    <hr />
    <Typography variant="body2" color="text.secondary">
    <b >✓Must be a registered student (Specify University)</b>
    <br />
    <b >✓Must be below 25 years Requirements</b>
    <br />
    <b >✓Classic Cpanel [Scolemax is the Classic Cpanel provider)</b>
    <br />
    <b >✓ .ke domain i.e .co.ke, .info.ke, etc( Remember this comes with Classic cpanel )</b>
    <br />
    <b > ✓ Smartphone/ laptop/ Desktop (since it's no code training, having a computer is not mandatory)</b>
    <br />
    <br />
    Training ( online) 
<p>Tuesday 5 pm - 6pm (EAT) - Fundamentals of Cpanel and the plate web.
<p>Wednesday 5 pm - 6pm (EAT)  - Customization and selling.</p>
</p>
    </Typography>
      </Modal.Body>
    </Modal>


    <Modal
    show={modalShowContact}
    onHide={() => setModalShowContact(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    style={{
      zIndex:1500
    }}
  >
  <Modal.Header
  style={{
    background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
    color:'#fff',
    display:'flex',
    justifyContent:'space-between',
  }}
  >
  <Modal.Title id="contained-modal-title-vcenter">
  Contact Us
  </Modal.Title>
  <CloseIcon onClick={() => setModalShowContact(false)} fontSize="medium" style={{cursor:'pointer'}} />
</Modal.Header>
    <Modal.Body
    style={{
      height:500,
      overflowY:'auto',
      background: 'linear-gradient(310deg, #2E2EFF, #81c784)',
      color:'#fff'
    }}
    >
    <Contact setModalShowContact={setModalShowContact}/>
    </Modal.Body>
    </Modal>
    </Box>
  );
}