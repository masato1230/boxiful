import React from "react";
import { Box } from '@mui/material';
import descriptionPage from "../../../models/descriptionPage";

interface GetStartedPageProps {
  index: number;
  value: number;
  descriptionPage: descriptionPage;
}


const GetStartedPage: React.FC<GetStartedPageProps> = ({
  index,
  value,
  descriptionPage
}) => {
  return (
    <div
      className="mt-5 rounded-xl"
      role="tabpanel"
      hidden={value !== index}
    >
      <Box sx={{ p: 3 }}>
        <h2 className="font-bold text-xl mb-5">{descriptionPage.tabTitle}</h2>
        <div className="bg-yellow-500 rounded-xl py-5">
          <img
            src={descriptionPage.imageSrc}
            className="mx-auto h-56 object-contain"
            alt={descriptionPage.tabTitle}
          />
        </div>
        <p className="mt-5 text-sm sm:text-lg">{descriptionPage.description}</p>
      </Box>
    </div>
  );
};

export default GetStartedPage;
