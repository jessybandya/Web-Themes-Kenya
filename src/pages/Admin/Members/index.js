import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {Button,Modal } from 'react-bootstrap';
import Allmembers from './Allmembers';
import { auth, db } from '../../../firebase';
import SoftTypography from '../../../soft-components/SoftTypography';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import DownloadIcon from '@mui/icons-material/Download';

function Members() {
  const [modalShow, setModalShow] = React.useState(false);
  const [posts1, setPosts1] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  
  // Fetch data from Firebase Firestore and update `posts1` state
  React.useEffect(() => {
    db.collection('users').onSnapshot((snapshot) => {
      setPosts1(snapshot.docs.map((doc) => doc.data()))
    });
  }, []);
  
  // Filter posts based on `searchTerm`
  React.useEffect(() => {
    if (posts1 !== undefined) {
      const finalPosts = posts1.filter((res) => {
        return res?.firstName?.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });
      setFilteredPosts(finalPosts);
    }
  }, [searchTerm, posts1]);
  
  const updateSearchResults = (e) => {
    setSearchTerm(e.target.value);
  };

  const downloadExcel = () => {
    if (posts1.length === 0) {
      alert("Can't download Excel with an empty list!");
    } else {
      // Define the fields you want to include in the Excel file
      const fieldsToInclude = ["firstName", "lastName", "email", "phone", "institution", "isApproved", "formattedDateRegistered"];
  
      // Define the custom header names for the specific fields
      const headerMapping = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        phone: "Phone Number",
        institution: "Institution",
        isApproved: "Approval Status",
        formattedDateRegistered: "Date Registered",
      };
  
      // Create a new array with only the selected fields and modified header names
      const filteredPosts = posts1.map(item => {
        const filteredItem = {};
        fieldsToInclude.forEach(field => {
          if (field === "formattedDateRegistered") {
            // Convert the numeric timestamp to a Date object
            const timestamp = new Date(parseInt(item.timestamp));
  
            // Format the date as a string
            filteredItem['Date Registered'] = timestamp.toLocaleString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            });
          } else {
            filteredItem[headerMapping[field] || field] = item[field];
          }
        });
        return filteredItem;
      });
  
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(filteredPosts, {
        header: fieldsToInclude.map(field => headerMapping[field] || field), // Use the custom header names for fields
      });
  
      XLSX.utils.book_append_sheet(workbook, worksheet, "Web Themes Kenya Members");
      const excelBuffer = XLSX.write(workbook, { type: "buffer" });
  
      const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Web Themes Kenya Members.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };
  
  return (
    <SoftTypography>
    <div>
    <Paper
    component="form"
    sx={{ display: 'flex', alignItems: 'center'}}
  >
  <IconButton type="button" sx={{ p: '10px' }} aria-label="pdf">
  <DownloadIcon onClick={downloadExcel} style={{color:'#2a68af'}}/>
</IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      onChange={updateSearchResults}
      placeholder="Search members..."
    />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>

    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
    {auth?.currentUser?.uid &&(
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
    </IconButton>   
    )}   
  </Paper>  
  
  <Allmembers filteredPosts={filteredPosts} searchTerm={searchTerm}/>

  <Modal
  show={modalShow}
  style={{zIndex:2000}}
  onHide={() => setModalShow(false)}
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter">
      Add Article
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
  </Modal.Body>
</Modal>
    </div>
    </SoftTypography>
  )
}

export default Members