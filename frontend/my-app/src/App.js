import React from "react";
import Home from "./Home";
import {  Route,  Switch } from "react-router";


export default function App(){
	return(
	<Switch>
		<Route exact path="/" render={props => <Home {...props}/>} />
	</Switch>
	);
}
