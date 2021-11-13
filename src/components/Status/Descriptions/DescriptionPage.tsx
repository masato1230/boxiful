import { Box } from "@mui/system";

interface DescriptionPageProps {
  index: number;
  value: number;
}

const DescriptionPage: React.FC<DescriptionPageProps> = ({ index, value }) =>  {

  return (
    <div
      className="bg-yellow-600 mt-5 rounded-xl"
      role="tabpanel"
      hidden={value !== index}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          gffggfgfgfgff{index}
        </Box>
      )}
    </div>
  );
}

export default DescriptionPage;