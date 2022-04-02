import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonGroup } from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

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

  },

  textFieldLeft: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(0),
    width: '25ch',
  },

	textFieldRight: {
	marginLeft: theme.spacing(5),
	marginRight: theme.spacing(-5),
	width: '25ch',
	},
	
	textFieldName: {
	marginLeft: theme.spacing(5),
	width: '15ch',
	},

	textFieldYear: {
	marginLeft: theme.spacing(2),
	width: '7ch',
	},

	textFieldDuration: {
	marginLeft: theme.spacing(2),
	width: '10ch',
	},


	textFieldStudio: {
	marginLeft: theme.spacing(2),
	width: '15ch',
	},

	textFieldLicense: {
	marginLeft: theme.spacing(2),
	width: '10ch',
	},

	formControl: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(0),
    minWidth: 120,
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


const EventComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);
  const [update, setUpdate] = useState([]);
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState([]);

  async function getData() {
    const result = await axios.get("http://localhost:8090/event/getall");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      eventType: "",
      eventFullName: "",
      eventYear: "",
      eventDuration: "",
      eventStudioOwner: "",
      eventLicenseFee: ""
    };


  const[selection, setSelection] = React.useState('');
  const handleChange = (event) => {
    setSelection(event.target.value);
    console.log("selection value: " + selection);

  };

  const changeEventFullNameText= (shortName) => {
      state.eventFullName = shortName;
  };

  const changeEventYearText= (year) => {
      state.eventYear = year;
  };

  const changeEventDurationText= (duration) => {
      state.eventDuration = duration;
  };
    const changeEventStudioOwnerText= (studio) => {
      state.eventStudioOwner = studio;
  };

  const changeEventLicenseFeeText= (license) => {
      state.eventLicenseFee = license;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.eventFullName && state.eventYear && state.eventDuration && state.eventStudioOwner && state.eventLicenseFee) && (state.eventFullName.trim().length > 0 && state.eventYear.trim().length > 0 && state.eventDuration.trim().length > 0 && state.eventStudioOwner.trim().length > 0 && state.eventLicenseFee.trim().length > 0)){
    const data = {
      eventType: selection === 2 ? "Movie" : "PPV",
      eventFullName : state.eventFullName,
      eventYear : state.eventYear,
      eventDuration: state.eventDuration,
      eventStudioOwner: state.eventStudioOwner,
      eventLicenseFee: state.eventLicenseFee
    }

    axios.post("http://localhost:8090/event/add", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textEventTypeText = document.getElementById('event-Type');
        if(textEventTypeText != null) 
            textEventTypeText.value = '';

        const textEventFullNameText = document.getElementById('event-FullName');
        if(textEventFullNameText != null) 
            textEventFullNameText.value = '';


        const textEventYearText = document.getElementById('event-Year');
        if(textEventYearText != null)  
            textEventYearText.value = '';

        const textEventDurationText = document.getElementById('event-Duration');
        if(textEventDurationText != null) 
            textEventDurationText.value = '';

        const textEventStudioOwnerText = document.getElementById('event-StudioOwner');
        if(textEventStudioOwnerText != null)  
            textEventStudioOwnerText.value = '';

        const textEventLicenseFeeText = document.getElementById('event-LicenseFee');
        if(textEventLicenseFeeText != null)  
            textEventLicenseFeeText.value = '';

        toast("Event added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem adding the event. Make sure the fields are correct. The studio name must match the database!")
        console.error('Error adding the event', error);
      });
    }
    else {
      toast.error("All fields are required");
    }
  }

   function handleUpdate(event) {
    event.preventDefault();
    const textDuration = document.getElementById('update-duration');
    if(textDuration)  
      update.duration = textDuration.value;
  
    const textLicense = document.getElementById('update-license');
    if(textLicense) 
        update.license = textLicense.value;

    if(update.duration && update.license){

    const data = {
      id: update.id,
      eventType: selection === 2 ? "Movie" : "PPV",
      eventFullName : update.name,
      eventYear : update.year,
      eventDuration: update.duration,
      eventStudioOwner: update.studio,
      eventLicenseFee: update.license

    }

    axios.post("http://localhost:8090/event/update", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textDuration = document.getElementById('update-duration');
        if(textDuration != null)  
            textDuration.value = '';

        const textLicense = document.getElementById('update-license');
        if(textLicense != null) 
            textLicense.value = '';

        toast("Event updated succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
        handleClose();
      })
      .catch(error => {
        toast.error("Error! Make sure studio exists")
        console.error('Error updating Event', error);;
      });
    }
    else {
      toast.error("Duration and License Fee are required");
    }
  }

  function handleDelete(event, row) {
    event.preventDefault();
    const data = {
      id: row.id,
      eventType : row.eventType,
      eventFullName : row.eventFullName,
      eventDuration: row.eventDuration,
      eventStudioOwner: row.eventStudioOwner,
      eventLicenseFee: row.eventLicenseFee
    }

    axios.delete("http://localhost:8090/event/delete", { data: data })
      .then(response => {
        (async () => {
          await getData();
        })();
        toast("Event deleted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem deleting the event.")
        console.error('Error deleting event', error);
      });
  }

  const handleOpen = (event, row) => {
    update.id = row.id;
    update.type = row.eventType;
    update.name = row.eventFullName;
    update.year = row.eventYear;
    update.duration = row.eventDuration;
    update.studio = row.eventStudioOwner;
    update.license = row.eventLicenseFee;

    setUpdate(update);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	return( 

	<div className={classes.pageMargins}>


		<form noValidate autoComplete="off">

		<FormControl className={classes.formControl}>
        <InputLabel id="eventTypeSelectionButton">Type</InputLabel>
        <Select
          labelId="eventTypeSelectionButtonlabelID"
          id="event-Type"
          value={selection}
          onChange={handleChange}
          defaultValue={1}

        >
          <MenuItem value={1}>PPV</MenuItem>
          <MenuItem value={2}>Movie</MenuItem>

        </Select>
      </FormControl>
		  
		  <TextField
          label="Name"
          id="event-FullName"
          className={classes.textFieldName}
          helperText="Name of event"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeEventFullNameText(e.target.value)}
        />

		  <TextField
          label="Year"
          id="event-Year"
          className={classes.textFieldYear}
          helperText="Year Produced"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeEventYearText(e.target.value)}
        />
		  <TextField
          label="Duration"
          id="event-Duration"
          className={classes.textFieldDuration}
          helperText="Duration of event"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeEventDurationText(e.target.value)}
        />

		  <TextField
          label="Studio"
          id="event-StudioOwner"
          className={classes.textFieldStudio}
          helperText="Studio receiving the license"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeEventStudioOwnerText(e.target.value)}
        />

		  <TextField
          label="License"
          id="event-LicenseFee"
          className={classes.textFieldLicense}
          helperText="Licensing Fee"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeEventLicenseFeeText(e.target.value)}
        />


       <ButtonGroup>
       <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.buttonGrouping}
        startIcon={<SaveIcon />}
        onClick={(e) => handleSubmit(e)}
      >
        Create Event
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
            <TableCell>Event Type</TableCell>
            <TableCell>Studio</TableCell>
            <TableCell align="right">Event Name</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.eventType}</TableCell>
              <TableCell>{row.eventStudioOwner}</TableCell>
              <TableCell align="right">{row.eventFullName}</TableCell>
              <TableCell align="right">{row.eventYear}</TableCell>
              <TableCell align="right">{row.eventDuration}</TableCell>
              <TableCell align="right">{row.eventLicenseFee}</TableCell>
              <TableCell><DeleteIcon onClick={(event) => handleDelete(event, row)} className={classes.cursorPointer}/></TableCell>
              <TableCell><UpdateIcon onClick={(event) => handleOpen(event,row)} className={classes.updateCursorPointer}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>

		</form>
    <div>
      <Modal
        aria-labelledby="update-event"
        aria-describedby="update-event-group"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>

          <p><b>Note: </b>
            Updating event. To exit out the modal click any where outside.
          <br/>
          </p>

               <TextField
                  label="Event Type"
                  id="update-type"
                  className={classes.textFieldShort}
                  helperText="event type cannot be updated"
                  margin="dense"
                  variant="outlined"
                  value={update.type}
                  disabled={true}
                />

               <TextField
                  label="Event Name"
                  id="update-name"
                  className={classes.textFieldShort}
                  helperText="name cannot be updated"
                  margin="dense"
                  variant="outlined"
                  value={update.name}
                  disabled={true}
                />

                  <TextField
                  label="Year Produced"
                  id="update-year"
                  className={classes.textFieldShort}
                  helperText="year cannot be updated"
                  margin="dense"
                  variant="outlined"
                  value={update.year}
                  disabled={true}
                />

                <TextField
                  label="Duration"
                  id="update-duration"
                  className={classes.textFieldShort}
                  helperText="update duration"
                  margin="dense"
                  variant="outlined"
              />

                <TextField
                  label="Studio"
                  id="update-studio"
                  className={classes.textFieldShort}
                  helperText="studio cannot be updated"
                  margin="dense"
                  variant="outlined"
                  value={update.studio}
                  disabled={true}
              />

                <TextField
                  label="License Fee"
                  id="update-license"
                  className={classes.textFieldShort}
                  helperText="update license fee"
                  margin="dense"
                  variant="outlined"
              />

                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.buttonGrouping}
                    startIcon={<SaveIcon />}
                    onClick={(e) => handleUpdate(e)}
                  >
                    update group
                </Button>

          </div>
        </Fade>
      </Modal>
    </div>

	</div>

);
};

export default EventComp;