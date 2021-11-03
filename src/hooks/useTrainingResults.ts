import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import API from '../api';
import { ACCESS_TOKEN } from '../constants/cookieKeys';

interface TrainingResult {
  id?: number;
  menu: string;
  calorie: number;
  point: number;
  score: number;
  created_at?: string;
  user?: number;
}

export const useTrainingResult = (): [TrainingResult[], (trainingResult: TrainingResult) => Promise<void>] => {
  const [trainingResults, setTrainingResults] = useState<TrainingResult[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies();

  // Fetch trainingResults from API
  const fetchTrainingResults = async () => {
    const response = await API.get('/training_results', {
      headers: {
        Authorization: `JWT ${cookies[ACCESS_TOKEN]}`,
      },
    });
    console.log(response.data);
    setTrainingResults(response.data);
  };

  const postTrainingResult = async (trainingResult: TrainingResult) => {
    const response = await API.post('/training_results', trainingResult, {
      headers: {
        Authorization: `JWT ${cookies[ACCESS_TOKEN]}`,
      },
    });
    console.log(response.data);
    
    // update local training results
    fetchTrainingResults();
  };

  // Set up: fetch training results
  useEffect(() => {
    fetchTrainingResults();
  }, []);

  return [trainingResults, postTrainingResult];
};
