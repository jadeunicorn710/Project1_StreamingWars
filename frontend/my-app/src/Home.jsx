import React from "react";
import {Tabs} from '@material-ui/core/';
import {Tab} from '@material-ui/core/';
import DemographicGroupComp from './Comp/DemographicGroupComp';
import AccountComp from './Comp/AccountComp';
import StreamingServiceComp from './Comp/StreamingServiceComp';
import EventComp from './Comp/EventComp';
import EventOfferComp from './Comp/EventOfferComp';
import StudioComp from './Comp/StudioComp';
import WatchEventComp from './Comp/WatchEventComp';
import TimeComp from './Comp/TimeComp';
import ArchiveComp from './Comp/ArchiveComp';

const Home = () => {
	const[selectedTab, setSelectedTab] = React.useState(0);

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};

	return (
		<>
		<Tabs value={selectedTab} scrollButtons='auto' variant='scrollable' onChange={handleChange} >
          <Tab label="Demographic Groups" />
          <Tab label="Accounts" />
          <Tab label="Streaming Services" />
          <Tab label="Studios" />
          <Tab label="Events" />
          <Tab label="Offers" />
          <Tab label="Watch Events" />
          <Tab label="Time" />
          <Tab label="Archive" />


        </Tabs>

        {selectedTab === 0 && <DemographicGroupComp />}
        {selectedTab === 1 && <AccountComp />}
        {selectedTab === 2 && <StreamingServiceComp />}
        {selectedTab === 3 && <StudioComp />}
        {selectedTab === 4 && <EventComp />}
        {selectedTab === 5 && <EventOfferComp />}
        {selectedTab === 6 && <WatchEventComp />}
        {selectedTab === 7 && <TimeComp />}
        {selectedTab === 8 && <ArchiveComp />}


        </>

	);

	};

export default Home;
