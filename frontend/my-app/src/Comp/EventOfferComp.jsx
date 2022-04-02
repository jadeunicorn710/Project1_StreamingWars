import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonGroup } from '@material-ui/core';
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

import { toast } from 'react-toastify';


//TODO: make sure to check if the streaming service exists before sending the data

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
	marginLeft: theme.spacing(2),
	width: '15ch',
	},

	textFieldYear: {
	marginLeft: theme.spacing(2),
	width: '7ch',
	},

	textFieldPrice: {
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

}));


const EventOfferComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);

  async function getData() {
    const result = await axios.get("http://localhost:8090/offer/getall");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getData();
    })();
  }, []);

  const state = {
      offerType : "",
      offerStream : "",
      offerEventName: "",
      offerEventYear: "",
      offerEventPrice: 0
    };

  const changeOfferTypeText= (typeOfOffer) => {
      state.offerType = typeOfOffer;
      console.log("offerType: " + state.offerType);
  };

  const[selection, setSelection] = React.useState('');
  const handleChange = (event) => {
    setSelection(event.target.value);
    if(event.target.value === 1){
    console.log("Chose PPV"); //helpful debug statement. Remove later
    changeOfferTypeText("PPV");
    }
    else{
    console.log("Chose movie");
    changeOfferTypeText("Movie");
    }
  };

  const changeOfferStreamText= (stream) => {
      state.offerStream = stream;
  };

  const changeOfferEventNameText= (name) => {
      state.offerEventName = name;
  };

  const changeOfferEventYearText= (year) => {
      state.offerEventYear = year;
  };
  const changeOfferEventPriceText= (price) => {
      state.offerEventPrice = price;
  };

  function handleSubmit(event) {
    event.preventDefault();

    if((state.offerStream && state.offerEventName && state.offerEventYear) && (state.offerStream.trim().length > 0 && state.offerEventName.trim().length > 0 && state.offerEventYear.trim().length > 0)){
    const data = {
      offerType : selection === 2 ? "Movie" : "PPV",
      offerStream : state.offerStream,
      offerEventName: state.offerEventName,
      offerEventYear: state.offerEventYear,
      offerEventPrice: state.offerEventPrice
    }

    axios.post("http://localhost:8090/offer/add", data)
      .then(response => {
        (async () => {
          await getData();
        })();

        const textOfferTypeText = document.getElementById('offer-Type');
        if(textOfferTypeText != null) 
            textOfferTypeText.value = '';

        const textOfferStreamText = document.getElementById('offer-Service');
        if(textOfferStreamText != null) 
            textOfferStreamText.value = '';


        const textOfferEventNameText = document.getElementById('offer-Name');
        if(textOfferEventNameText != null)  
            textOfferEventNameText.value = '';

        const textOfferEventYear = document.getElementById('offer-Year');
        if(textOfferEventYear != null) 
            textOfferEventYear.value = '';

        const textOfferEventPrice = document.getElementById('offer-Price');
        if(textOfferEventPrice != null) 
            textOfferEventPrice.value = '';


        toast("Event offered added succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        if(state.offerEventPrice == null){toast.error("Please enter a price for the PPV")}
        toast.error("There was a problem offering the event. Make sure the fields are correct. The studio name and event name must match the database!")
        console.error('Error offering the event', error);
      });
    }
    else {
      toast.error("All fields are required");
    }
  }

  function handleDelete(event, row) {
    event.preventDefault();
    const data = {
      id: row.id,
      offerStream : row.offerStream,
      offerEventName: row.offerEventName,
      offerEventYear: row.offerEventYear
    }
    if(row.offerType == "Movie"){

    axios.delete("http://localhost:8090/offer/retract", { data: data })
      .then(response => {
        (async () => {
          await getData();
          console.log('I was triggered during render')
        })();
        toast("Offer retracted succesfully!!!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
      })
      .catch(error => {
        toast.error("There was a problem retracting the event offer.")
        console.error('Error retracting event offer', error);
      });
      }
      else{toast.error("Can't retract a PPV")}
  }

	return( 

	<div className={classes.pageMargins}>


		<form noValidate autoComplete="off">

		<FormControl className={classes.formControl}>
        <InputLabel id="eventTypeSelectionButton">Offer</InputLabel>
        <Select
          labelId="eventTypeSelectionButtonlabelID"
          id="offer-Type"
          value={selection}
          onChange={handleChange}
          defaultValue={1}

        >
          <MenuItem value={1}>PPV</MenuItem>
          <MenuItem value={2}>Movie</MenuItem>

        </Select>
      </FormControl>
		  
		  <TextField
          label="Streaming Service"
          id="offer-Service"
          className={classes.textFieldName}
          helperText="Short Streaming service name"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeOfferStreamText(e.target.value)}
        />
		  <TextField
          label="Name"
          id="offer-Name"
          className={classes.textFieldName}
          helperText="Name of event"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeOfferEventNameText(e.target.value)}
        />

		  <TextField
          label="Year"
          id="offer-Year"
          className={classes.textFieldYear}
          helperText="Year Produced"
          margin="dense"
          variant="outlined"
          onChange={(e) => changeOfferEventYearText(e.target.value)}
        />
		  <TextField
          label="Price"
          id="offer-Price"
          className={classes.textFieldPrice}
          helperText="Viewing Price(PPV ONLY)"
          margin="dense"
          disabled={selection === 2 ? true : false}
          variant="outlined"
          onChange={(e) => changeOfferEventPriceText(e.target.value)}
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
        Offer Event
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
            <TableCell>Offer Type</TableCell>
            <TableCell>Stream Service</TableCell>
            <TableCell align="right">Event Name</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.offerType}</TableCell>
              <TableCell>{row.offerStream}</TableCell>
              <TableCell align="right">{row.offerEventName}</TableCell>
              <TableCell align="right">{row.offerEventYear}</TableCell>
              <TableCell align="right">{row.offerEventPrice}</TableCell>
              <TableCell><DeleteIcon onClick={(event) => handleDelete(event, row)} className={classes.cursorPointer}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  </div>

		</form>

	</div>

);
};

export default EventOfferComp;