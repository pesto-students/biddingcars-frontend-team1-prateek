import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button,TextField,Box , MenuItem,Select } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { toast } from "react-toastify";
import {InputLabel ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle} from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { addCardInfo } from '../actions/userinfo.action';
const CardDetails = () => {
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    accounttype: '',
    namec: '',
    accountnumber: 0,
    aadhar:0,
    pan: '',
    creditscore:0,
    annualavgincome:0,
    incomesource:'',

  });

  const formatAccountNumber = (value) => {
    return value.slice(0, 14);
  };
  const formatAadharNumber = (value) => {
    return value.slice(0, 12);
  };
  const formatPanNumber = (value) => {
    return value.toUpperCase().slice(0, 10);
  };
  const formatCreditScore= (value) => {
    return value.slice(0, 3);
  };

  const handleSubmit = () => {
    if(state.accounttype &&
      state.namec &&
      state.accountnumber&&
      state.aadhar&&
      state.pan&&
      state.creditscore&&
      state.annualavgincome&&
      state.incomesource
    ) {
      dispatch(addCardInfo(state,auth.accessToken,userinfo))
    } else {
      toast('Please fill all the fields!', { type: 'warning' });
    }
  };
  const handleInputChange = ({ target }) => {
    if (target.name === 'accountnumber') {
      target.value = formatAccountNumber(target.value);
    }else if (target.name === 'aadhar') {
      target.value = formatAadharNumber(target.value);
    }else if (target.name === 'pan') {
      target.value = formatPanNumber(target.value);
    } else if (target.name === 'creditscore') {
      target.value = formatCreditScore(target.value);
    } else if (target.name === 'accounttype') {
      target.value = target.value;
    }
    setState({ ...state, [target.name]: target.value });
    console.log(state)
  };
  return (
    <Box
    className="profile-card"
    sx={{
      // marginLeft: "226px",
      marginLeft: { xs: "30px", sm: "150px", md: "240px" },
      width: { xs: "95vw", sm: "50vw", md: "40vw" },
      padding: "20px"
    }}
  >

      <br />
      <FormControl>
        <FormLabel id="">Account Type</FormLabel>
        <RadioGroup row name="row-card-group">
          <FormControlLabel
            value="Savings"
            name="accounttype"
            control={<Radio />}
            label="Savings"
            onChange={handleInputChange}
          />
          <FormControlLabel
            name="accounttype"
            value="Current"
            control={<Radio />}
            label="Current"
            onChange={handleInputChange}
          />
        </RadioGroup>
      </FormControl>
      <TextField
      sx={{ mt: '10px', mr: '20px' }}
        margin="dense"
        id="outlined-basic"
        name="namec"
        label="Account holder name"
        type="text"
        fullWidth
        size="small"
        onChange={handleInputChange}
      />
      <TextField
        sx={{ mt: '10px', mr: '20px' }}
        id="outlined-basic"
        label="Account Number"
        name="accountnumber"
        pattern="[\d| ]{16,22}"
        type="number"
        fullWidth
        size="small"
        onChange={handleInputChange}
      />
      <TextField
      sx={{ mt: '10px', mr: '7px', width: { xs: "48%", sm: "48%", md: "48%" } }}
        margin="dense"
        id="outlined-basic"
        name="aadhar"
        label="Aadhar Number"
        type="number"
        size="small"
        onChange={handleInputChange}
      />
      <TextField
      sx={{ mt: '10px', ml: '7px' , width: { xs: "48%", sm: "46%", md: "49%" }}}
        margin="dense"
        id="outlined-basic"
        name="pan"
        label="PAN Number"
        type="text"
        size="small"
        onChange={handleInputChange}
      />
      <TextField
      sx={{ mt: '10px', mr: '7px', width: { xs: "48%", sm: "48%", md: "48%" } }}
        margin="dense"
        id="outlined-basic"
        name="creditscore"
        label="Credit Score"
        type="number"
        size="small"
        onChange={handleInputChange}
      />
      <TextField
      sx={{ mt: '10px', ml: '7px' , width: { xs: "48%", sm: "46%", md: "49%" }}}
        margin="dense"
        id="outlined-basic"
        name="annualavgincome"
        label="Annual Avg Income in LPA"
        type="number"
        size="small"
        onChange={handleInputChange}
      />
      <FormControl fullWidth sx={{ mt: '10px', mr: '20px' }}
        margin="dense"
        id="outlined-basic"
        name="incomesource"
        type="text"
        size="small"
        onChange={handleInputChange}>
        <InputLabel id="outlined-basic">Income Source</InputLabel>
        <Select
          id="outlined-basic"
          label="Income Source"
          onChange={handleInputChange}
          name="incomesource"
          value={state.incomesource}
        >
          <MenuItem value={'Salary'}>Salary</MenuItem>
          <MenuItem value={'House Property'}>House Property</MenuItem>
          <MenuItem value={'Business/Profession'}>Business/Profession</MenuItem>
          <MenuItem value={'Pension'}>Pension</MenuItem>
          <MenuItem value={'Agriculture'}>Agriculture</MenuItem>
        </Select>
      </FormControl>
    <DialogActions>
      <Button
      variant="contained"
        onClick={() => {handleSubmit()
        }}
      >
        Submit
      </Button>
    </DialogActions>
  </Box>

  );
};

export default CardDetails;
