import React from "react";
import { Redirect, useHistory } from "react-router";

const TrainingResultBuffer = () => {
  console.log('buffer');
  const history = useHistory();
  history.push('/result');
  
  return <div></div>
}

export default TrainingResultBuffer;