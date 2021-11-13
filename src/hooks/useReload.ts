import { useHistory } from "react-router";

export const useReload = () => {
  const history = useHistory();
  
  const backToDashBoard = () => {
    history.replace('/');
    window.location.reload();
  }

  return backToDashBoard;
}