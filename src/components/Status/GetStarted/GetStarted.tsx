import { Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment, useState } from 'react';
import { aboutDescriptionPages } from '../../../models/descriptionPage';
import GetStartedPage from './GetStartedPage';

const GetStarted = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onNextClick = () => {
    setValue(value + 1);
  };

  const onPreviousClick = () => {
    setValue(value - 1);
  };

  return (
    <Fragment>
      <h2 className="text-xl pt-3 mb-3 font-bold">Get Started</h2>
      <div className="rounded-lg shadow-xl bg-white p-6 flex">
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
              {aboutDescriptionPages.map((descriptionPage) => {
                return (
                  <Tab
                    key={descriptionPage.tabTitle}
                    label={descriptionPage.tabTitle}
                  />
                );
              })}
            </Tabs>
          </Box>
          {aboutDescriptionPages.map((descriptionPage, index) => {
            return (
              <GetStartedPage
                key={descriptionPage.tabTitle}
                value={value}
                index={index}
                descriptionPage={descriptionPage}
              />
            );
          })}
          <div
            className={`${
              value === 0 && 'flex-row-reverse'
            } flex justify-between`}
          >
            <button
              className={`${
                value === 0 && 'hidden'
              } font-bold text-sm text-center mt-5 px-2 py-1 rounded-xl hover:bg-gray-400`}
              onClick={onPreviousClick}
            >
              前へ
            </button>
            <button
              className={`${
                value === aboutDescriptionPages.length - 1 && 'hidden'
              } font-bold text-sm text-center mt-5 px-2 py-1 rounded-xl hover:bg-gray-400`}
              onClick={onNextClick}
            >
              次へ
            </button>
          </div>
        </Box>
      </div>
    </Fragment>
  );
};

export default GetStarted;
