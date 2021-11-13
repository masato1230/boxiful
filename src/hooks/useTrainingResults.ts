import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import API from '../api';
import { ACCESS_TOKEN } from '../constants/cookieKeys';
import { TrainingResult } from '../models/TrainingResult';
import { useIsLoggedIn } from './useIsLoggedIn';

export const useTrainingResult = () => {
  const [trainingResults, setTrainingResults] = useState<TrainingResult[]>([]);
  const [cookies] = useCookies();
  const { isLoggedIn } = useIsLoggedIn();

  // Fetch trainingResults from API
  const fetchTrainingResults = async () => {
    const response = await API.get('/training_results', {
      headers: {
        Authorization: `JWT ${cookies[ACCESS_TOKEN]}`,
      },
    });
    setTrainingResults(response.data);
  };

  const postTrainingResult = async (trainingResult: TrainingResult) => {
    if (!isLoggedIn) {
      return;
    }
    await API.post('/training_results', trainingResult, {
      headers: {
        Authorization: `JWT ${cookies[ACCESS_TOKEN]}`,
      },
    });
    // update local training results
    fetchTrainingResults();
  };

  // Set up: fetch training results
  useEffect(() => {
    if (isLoggedIn) {
      fetchTrainingResults();
    }
  }, [isLoggedIn, fetchTrainingResults]);

  return {
    trainingResults,
    postTrainingResult,
  }
};
