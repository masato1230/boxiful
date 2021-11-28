import { useHistory } from 'react-router';

export const useCameraResetReload = () => {
  const history = useHistory();

  const backToDashBoard = () => {
    console.log(history.location.pathname);
    if (
      history.location.pathname === '/training' ||
      history.location.pathname === '/result'
    ) {
      window.location.replace('/');
    }
    history.push('/');
  };

  return backToDashBoard;
};
