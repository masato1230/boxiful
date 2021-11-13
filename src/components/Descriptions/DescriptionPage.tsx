import { Box } from "@mui/system";
import descriptionPage from "../../models/descriptionPage";

interface DescriptionPageProps {
  index: number;
  value: number;
  descriptionPage: descriptionPage;
}

const DescriptionPage: React.FC<DescriptionPageProps> = ({ index, value, descriptionPage }) =>  {

  return (
    <div
      className="bg-yellow-600 mt-5 rounded-xl h-1/2"
      role="tabpanel"
      hidden={value !== index}
    >
        <Box sx={{ p: 3 }}>
          <h2 className="font-bold text-xl mb-5">{descriptionPage.tabTitle}</h2>
          <img src={descriptionPage.imageSrc} className="mx-auto h-56 object-contain" />
          <p className="mt-5 text-sm sm:text-lg">{descriptionPage.description}</p>
        </Box>
    </div>
  );
}

export default DescriptionPage;