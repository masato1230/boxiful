import React, { Dispatch, SetStateAction } from 'react';
import { Box } from '@mui/system';
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';
import DescriptionPage from './DescriptionPage';
import descriptionPage from '../../models/descriptionPage';

interface DescriptionTabsProps {
  setIsShowDescriptions: Dispatch<SetStateAction<boolean>>;
  descriptionPages: descriptionPage[];
}

const DescriptionTabs: React.FC<DescriptionTabsProps> = ({ setIsShowDescriptions, descriptionPages }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const onNextClick = () => {
    setValue(value + 1);
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
            return <Tab key={descriptionPage.tabTitle} label={descriptionPage.tabTitle} />;
          })}
        </Tabs>
      </Box>
      {descriptionPages.map((descriptionPage, index) => {
        return (
          <DescriptionPage
            key={descriptionPage.tabTitle}
            value={value}
            index={index}
            descriptionPage={descriptionPage}
          />
        );
      })}
      <div className="flex flex-row-reverse">
        {value !== descriptionPages.length - 1 ? (
          <button
            className="font-bold text-sm text-center mt-5 px-2 py-1 rounded-xl hover:bg-gray-400"
            onClick={onNextClick}
          >
            次へ
          </button>
        ) :(
          <button
            className="font-bold text-sm text-center mt-5 px-2 py-1 rounded-xl hover:bg-gray-400"
            onClick={() => setIsShowDescriptions(false)}
          >
            閉じる
          </button>
        )}
      </div>
    </Box>
  );
};

export default DescriptionTabs;
