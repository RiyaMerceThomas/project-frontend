import Covid from './Covid';
import Dengu from './Dengue';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect, useState } from 'react';
import Infection from './Infection';

function App() {
  const [value, setValue] = useState('1');
  const searchParam = window.location.search.split("disease=")[1];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (searchParam === "dengue") {
      setValue("2")
    } else if (searchParam === "covid") {
      setValue("1")
    } else {
      setValue("3")
    }
  }, [searchParam])

  return (

    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList onChange={handleChange} aria-label="app select">
          <Tab label="Covid Predictor" value="1" />
          <Tab label="Dengue Predictor" value="2" />
          <Tab label="Infection Predictor" value="3" />
        </TabList>
      </Box>
      <TabPanel value="1"><Covid /></TabPanel>
      <TabPanel value="2"><Dengu /></TabPanel>
      <TabPanel value="3"><Infection /></TabPanel>
    </TabContext>

  );
}

export default App;
