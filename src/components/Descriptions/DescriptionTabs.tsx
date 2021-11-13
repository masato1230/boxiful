import React from 'react';
import { Box } from '@mui/system';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import { Typography } from '@mui/material';
import DescriptionPage from './DescriptionPage';
import { descriptionPages } from '../../models/descriptionPage';

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
          variant="scrollable"
          scrollButtons="auto"
          onChange={handleChange}
        >
          {descriptionPages.map((descriptionPage) => {
            return <Tab label={descriptionPage.tabTitle} />
          })}
        </Tabs>
      </Box>
      {descriptionPages.map((descriptionPage, index) => {
        return (
          <DescriptionPage
            value={value}
            index={index}
            descriptionPage={descriptionPage}
          />
        )
      })}
    </Box>
  );
};

export default DescriptionTabs;
