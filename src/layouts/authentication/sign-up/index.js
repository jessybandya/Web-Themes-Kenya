import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "../../../soft-components/SoftBox";
import SoftTypography from "../../../soft-components/SoftTypography";
import SoftInput from "../../../soft-components/SoftInput";
import SoftButton from "../../../soft-components/SoftButton";

// Authentication layout soft-components
import BasicLayout from "../components/BasicLayout";
import Socials from "../components/Socials";
import Separator from "../components/Separator";

// Images
import curved6 from "../../../assets/images/curved-images/curved14.jpg";
import { Space, Spin } from 'antd';
import { toast } from 'react-toastify'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { auth, db } from "../../../firebase";
import { updateAuthId } from "../../../redux/dataSlice";
import { useSelector, useDispatch } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
import swal from "@sweetalert/with-react";
import Swal from "sweetalert2";



function SignUp() {
  const [agreement, setAgremment] = useState(true);
  const handleSetAgremment = () => setAgremment(!agreement);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [idNo, setIdNo] = useState('')
  const [country, setCountry] = useState('')
  const [institution, setInstitution] = useState('')
  const [password, setPassword] = useState('')
  const [cPassword, setCPassword] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('')
  const history = useNavigate("");
  const dispatch = useDispatch();

  const handleChangeInstitution = (event) => {
    setInstitution(event.target.value);
  };


useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(async (user) => {
    if(user){
      const idTokenResult = await user.getIdTokenResult()
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
          
        }
      })
      dispatch(updateAuthId(user?.uid))

    }
  })
  return () => unsubscribe()
}, [])

const completeRegistration = () => {
  setLoading(true)

  if(!firstName){
    toast.error('First Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!lastName){
    toast.error('Last Name is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!email){
    toast.error('E-mail is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!phone){
    toast.error('Phone No. is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!institution){
    toast.error('Institution is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!password){
    toast.error('Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(!cPassword){
    toast.error('Confirm Password is required!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(password.length <8){
    toast.error('Password must have atleast 8 characters!', {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else if(cPassword !== password){
    toast.error("Passwords don't match each other!", {
      position: toast.POSITION.TOP_CENTER
  })
    setLoading(false)
  }else{

              db.collection('users').where("email", "==", email).get().then((resultSnapShot) => {

                  // resultSnapShot is an array of docs where "email" === "user_mail"
          
                  if (resultSnapShot.size == 0) {                      
                        auth
                        .createUserWithEmailAndPassword(email, password)
                        .then((auth) => {
                            if (auth.user) {
                                auth.user.updateProfile({
                                    photoURL: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                                }).then((s) => {

                                    db.collection('users').doc(auth.user.uid).set({
                                        uid: auth.user.uid,
                                        firstName,
                                        lastName,
                                        phone,
                                        email,
                                        institution,
                                        profilePhoto: "https://firebasestorage.googleapis.com/v0/b/uon-foe.appspot.com/o/profile-photos%2Fmale.png?alt=media&token=87975cfa-98e0-4350-bbe5-ec68d547b59d",
                                        bio:"",
                                        isApproved:false,
                                        wpBuilder:'',
                                        requestDelete:false,
                                        spBuilder:'',
                                        backgroundImage:"",
                                        timestamp: Date.now(),
                                        pWorks:[],
                                        diviworks:[],
                                        mcworks:[],
                                    }).then((r) => {
                                          setLoading(false)
                                          Swal.fire({
                                            icon: 'success',
                                            title: 'Successfully created Web Theme Kenya account.\n',
                                            text: '\nThank you!',
                                          });
                                          history('/');
                                        })
                                })
                            }
                        })
                        .catch((e) => {
                                toast.error(e.message, {
                                  position: toast.POSITION.TOP_CENTER
                              })
                                setLoading(false)
                        });
          
                  } else {
                      //Already registered
                      setLoading(false)
                      toast.error("The email you enterd already in use!", {
                        position: toast.POSITION.TOP_CENTER
                    })
                  }
          
              })
  
  }
}

  return (
    <BasicLayout
      title="Welcome!"
      description="Use these awesome forms to login or create new account in your project for free."
      image="https://media.istockphoto.com/id/637912692/photo/nairobi-cityscape-capital-city-of-kenya.jpg?s=612x612&w=0&k=20&c=S8wPNq9om-IMcapXFC030ew28nhpYCFYBStX5yxCQbs="
    >
    <Card>
    <SoftBox p={3} mb={1} textAlign="center">
    <SoftTypography variant="h5" fontWeight="medium">
      Sign Up Here!
    </SoftTypography>
  </SoftBox>
    <Separator />
    <SoftBox pt={0} pb={3} px={3}>
      <SoftBox component="form" role="form">
        <SoftBox style={{display:'flex'}} mb={2}>
          <SoftInput style={{marginRight:3}}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name" />
          <SoftInput style={{marginLeft:3}} 
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name" />
        </SoftBox>
        <SoftBox mb={1} style={{display:'flex'}}>
          <SoftInput type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email"/>
          <SoftInput style={{marginRight:3}} 
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone No." />
          </SoftBox>
    <SoftBox mb={1}>
    <FormControl fullWidth size="small">
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={institution}
      label="Institution"
      onChange={handleChangeInstitution}
      displayEmpty
    renderValue={institution !== "" ? undefined : () => <span style={{color:'#9E9E9E'}}>Select your institution</span>}
    >
      <MenuItem value="University of Nairobi">University of Nairobi</MenuItem>
      <MenuItem value="Moi University">Moi University</MenuItem>
      <MenuItem value="Kenyatta University">Kenyatta University</MenuItem>
      <MenuItem value="Egerton University">Egerton University</MenuItem>
      <MenuItem value="Maseno University">Maseno University</MenuItem>
      <MenuItem value="Jomo Kenyatta University of Agriculture and Technology">Jomo Kenyatta University of Agriculture and Technology</MenuItem>
      <MenuItem value="Technical University of Mombasa">Technical University of Mombasa</MenuItem>
      <MenuItem value="Masinde Muliro University of Science and Technology">Masinde Muliro University of Science and Technology</MenuItem>
      <MenuItem value="Dedan Kimathi University of Technology">Dedan Kimathi University of Technology</MenuItem>
      <MenuItem value="Chuka University">Chuka University</MenuItem>
      <MenuItem value="Laikipia University">Laikipia University</MenuItem>
      <MenuItem value="South Eastern Kenya University">South Eastern Kenya University</MenuItem>
      <MenuItem value="Kisii University">Kisii University</MenuItem>
      <MenuItem value="Multimedia University of Kenya">Multimedia University of Kenya</MenuItem>
<MenuItem value="Technical University of Kenya">Technical University of Kenya</MenuItem>
<MenuItem value="University of Eastern Africa, Baraton">University of Eastern Africa, Baraton</MenuItem>
<MenuItem value="Daystar University">Daystar University</MenuItem>
<MenuItem value="Strathmore University">Strathmore University</MenuItem>
<MenuItem value="KCA University">KCA University</MenuItem>
<MenuItem value="United States International University Africa">United States International University Africa</MenuItem>
<MenuItem value="Africa Nazarene University">Africa Nazarene University</MenuItem>
<MenuItem value="Kabarak University">Kabarak University</MenuItem>
<MenuItem value="Mount Kenya University">Mount Kenya University</MenuItem>
<MenuItem value="Kenya Methodist University">Kenya Methodist University</MenuItem>
<MenuItem value="Adventist University of Africa">Adventist University of Africa</MenuItem>
<MenuItem value="Pwani University">Pwani University</MenuItem>
<MenuItem value="Maasai Mara University">Maasai Mara University</MenuItem>
<MenuItem value="Kirinyaga University">Kirinyaga University</MenuItem>
<MenuItem value="Meru University of Science and Technology">Meru University of Science and Technology</MenuItem>
<MenuItem value="University of Embu">University of Embu</MenuItem>
<MenuItem value="Riara University">Riara University</MenuItem>
<MenuItem value="Pan Africa Christian University">Pan Africa Christian University</MenuItem>
<MenuItem value="Kenya Highlands Evangelical University">Kenya Highlands Evangelical University</MenuItem>
<MenuItem value="Great Lakes University of Kisumu">Great Lakes University of Kisumu</MenuItem>
<MenuItem value="Lukenya University">Lukenya University</MenuItem>
<MenuItem value="Rongo University">Rongo University</MenuItem>
<MenuItem value="Taita Taveta University">Taita Taveta University</MenuItem>
<MenuItem value="Kaimosi Friends University College">Kaimosi Friends University College</MenuItem>
<MenuItem value="Garissa University">Garissa University</MenuItem>
<MenuItem value="Rift Valley Institute of Science and Technology">Rift Valley Institute of Science and Technology</MenuItem>
<MenuItem value="Co-operative University of Kenya">Co-operative University of Kenya</MenuItem>
<MenuItem value="Kenya Coast National Polytechnic">Kenya Coast National Polytechnic</MenuItem>


    </Select>
  </FormControl>
  </SoftBox>

    <SoftBox style={{display:'flex'}} mb={1}>
    <SoftInput style={{marginRight:3}}
    type="password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    placeholder="Password" />
    <SoftInput style={{marginLeft:3}}
    value={cPassword}
    type="password"
    onChange={e => setCPassword(e.target.value)}
    placeholder="Confirm Password" />
  </SoftBox>

        <SoftBox mt={2} mb={1}>
          <SoftButton style={{backgroundColor:'#2152ff',color:'#fff'}} onClick={completeRegistration} variant="gradient" color="info" fullWidth>
          {loading === true ?(
            <span><span style={{color:'#fff'}}>signing up...<Spin size="middle" /></span></span>
          ):(
            <span>Sign Up</span>
          )}
          </SoftButton>

          <SoftBox mt={2} textAlign="center">
          <Link to="/login">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            <SoftTypography
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
              style={{cursor:'pointer'}}
            >
              Do have an account?
            </SoftTypography>
          </SoftTypography>
          </Link>
        </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  </Card>
    </BasicLayout>
  );
}

export default SignUp;
