import React from 'react';
import { Box } from '@mui/system';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Typography } from '@mui/material';
import DescriptionPage from './DescriptionPage';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DescriptionTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 0 }}>
        <Tabs
          textColor="inherit"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
        >
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <DescriptionPage value={value} index={0}/>
      <DescriptionPage value={value} index={1}/>
      <DescriptionPage value={value} index={2}/>
    </Box>
  );
};

export default DescriptionTabs;
