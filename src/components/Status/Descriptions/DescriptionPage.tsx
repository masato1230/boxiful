import { Box } from "@mui/system";
import descriptionPage from "../../../models/descriptionPage";

interface DescriptionPageProps {
  index: number;
  value: number;
  descriptionPage: descriptionPage;
}

const DescriptionPage: React.FC<DescriptionPageProps> = ({ index, value, descriptionPage }) =>  {

  return (
    <div
      className="bg-yellow-600 mt-5 rounded-xl"
      role="tabpanel"
      hidden={value !== index}
    >
        <Box sx={{ p: 3 }}>
          <img src={descriptionPage.imageSrc} className="mx-auto" />
          <p>{descriptionPage.description}</p>
        </Box>
    </div>
  );
}

export default DescriptionPage;