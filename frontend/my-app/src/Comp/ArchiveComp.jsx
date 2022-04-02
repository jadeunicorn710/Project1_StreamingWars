import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import { ButtonGroup } from '@material-ui/core';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
  
	pageMargins: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(2),
  
	},
  
	buttonGrouping: {
		marginLeft: theme.spacing(10),
		marginRight: theme.spacing(1),
		marginTop: theme.spacing(2),
  
	},
  
	textFieldShort: {
	  marginLeft: theme.spacing(10),
	  width: '15ch',
	},
  
	cursorPointer: {
	  cursor: "pointer",
	  color: "#f50057"
	},
  
	updateCursorPointer: {
	  cursor: "pointer",
	  color: "#1CA0D7"
	},
  
	textFieldLong: {
	marginLeft: theme.spacing(2),
	  width: '25ch',
	},
  
	  textFieldAccount: {
	  marginLeft: theme.spacing(2),
	  marginRight: theme.spacing(-5),
	  width: '20ch',
	},
	table: {
	  minWidth: 650,  
	},
	modal: {
	  display: 'flex',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	paper: {
	  backgroundColor: theme.palette.background.paper,
	  border: '2px solid #000',
	  boxShadow: theme.shadows[5],
	  padding: theme.spacing(2, 4, 3),
	},
  
  }));

const ArchiveComp = () => {
	const classes = useStyles();
	toast.configure();

	const [data, setData] = useState([]);

	
	const state = {
		demoShortName : "",
	};

	const changeShortNameText = (shortName) => {
		state.demoShortName = shortName;
	};
  

	async function getData() {
		var queryString = "http://localhost:8091/archive/" + state.demoShortName;
		  await axios.get(queryString)
		   .then(response => {
			(async () => {
				  setData(response.data);
			  })();
		   })
		   .catch(error => {
			   setData([]);
		   });
	};  
	

	return( 

		<div className={classes.pageMargins}>
	
			<p><b>Note: </b>
			Accounts that are inactive are archived by a scheduled process and stored in a second database. To
			view archived accounts for a demographic group enter it in the textbox and click on search.
			<br/><br/>

			</p>
			
			<form noValidate autoComplete="off">
			  
			  <TextField
			  label="Short Name"
			  id="short-name"
			  className={classes.textFieldLong}
			  helperText="Short Name for Demographic Group"
			  margin="dense"
			  variant="outlined"
			  onChange={(e) => changeShortNameText(e.target.value)}
			/>
	
		   <ButtonGroup>
		   <Button
			variant="contained"
			color="primary"
			size="small"
			className={classes.buttonGrouping}
			startIcon={<SaveIcon />}
			onClick={(e) => getData()}
		  >
			search archive accounts
		  </Button>
		   </ButtonGroup>
	
	  <br/>
	  <br/>
	  <br/>
	  <div style={{ maxWidth: "80%" }}>
	  <TableContainer component={Paper}>
		  <Table className={classes.table} aria-label="simple table">
			<TableHead>
			  <TableRow>
				<TableCell>Id</TableCell>
				<TableCell>Account Name</TableCell>
				<TableCell>Demo Short Name</TableCell>
			  </TableRow>
			</TableHead>
			<TableBody>
			  {data.map((row) => (
				<TableRow key={row.id}>
				  <TableCell>{row.id}</TableCell>
				  <TableCell>{row.name}</TableCell>
				  <TableCell>{row.demoShortName}</TableCell>
				</TableRow>
			  ))}
			</TableBody>
		  </Table>
		</TableContainer>
	
	  </div>
	
		</form>
	</div>
)};

export default ArchiveComp;