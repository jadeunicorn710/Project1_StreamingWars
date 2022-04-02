import React from "react";
import { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { toast } from 'react-toastify';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    width: '25ch',
  },
  textFieldShort: {
    marginLeft: theme.spacing(10),
    width: '15ch',
  },

  textFieldPrice: {
    marginLeft: theme.spacing(2),
    width: '15ch',
  },

   buttonGrouping: {
  	marginLeft: theme.spacing(10),
  	marginRight: theme.spacing(1),
  	marginTop: theme.spacing(2),

  },

    pageMargins: {
  	marginLeft: theme.spacing(5),
  	marginTop: theme.spacing(2),

  },


    textStyling: {
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(0),
    fontWeight: theme.fontWeightBold,

  },

}));


const TimeComp = () => {
	
	const classes = useStyles();
  toast.configure();

  const [data, setData] = useState([]);

  async function getTimeData() {
    const result = await axios.get("http://localhost:8090/time/getTime");
    setData(result.data);
  };  

  useEffect(() => {
    (async () => {
      await getTimeData();

    })();
  }, []);

  const state = {
      monthTimeStamp : "",
      yearTimeStamp : ""
    };



  function handleSubmit(event){


    axios.post("http://localhost:8090/time/updatePeriod")
      .then(response => {
        (async () => {
          await getTimeData();})();
        toast("Updated time period successfully!", { autoClose: 3000, position: toast.POSITION.TOP_LEFT })
          })
    .catch(error => {
        toast.error("There was a problem updating the time period. Make sure the backend database is up and running properly.")
        console.error('Error adding demographic group', error);
    });

  }




	return( 

	<div className={classes.pageMargins}>




		<form noValidate autoComplete="off">
		  
		<div className={classes.textStyling}>{"Month: " + data.monthTimeStamp}</div>
		<div className={classes.textStyling}>{"Year: " + data.yearTimeStamp}</div>

       <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.buttonGrouping}
        startIcon={<SaveIcon />}
        onClick={(e) => handleSubmit(e)}
      >
       Update Period
      </Button>

		</form>

	</div>

);
};

export default TimeComp;