import { useHistory } from "react-router";

const TrainingResultBuffer = () => {
  console.log('buffer');
  const history = useHistory();
  history.replace('/result');
  
  return <div></div>
}

export default TrainingResultBuffer;