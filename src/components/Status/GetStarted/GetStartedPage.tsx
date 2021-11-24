import React from "react";
import { Box } from '@mui/material';
import descriptionPage from "../../../models/descriptionPage";
import getStartedPageModel from "../../../models/getStartedPageModel";

interface GetStartedPageProps {
  index: number;
  value: number;
  getStartedPageModel: getStartedPageModel;
}


const GetStartedPage: React.FC<GetStartedPageProps> = ({
  index,
  value,
  getStartedPageModel
}) => {
  return (
    <div
      className="mt-5 rounded-xl"
      role="tabpanel"
      hidden={value !== index}
    >
      <Box sx={{ p: 3 }}>
        <h2 className="font-bold text-xl mb-5">{getStartedPageModel.tabTitle}</h2>
        {getStartedPageModel.content}
      </Box>
    </div>
  );
};

export default GetStartedPage;
