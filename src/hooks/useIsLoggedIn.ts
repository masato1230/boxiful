import { Dispatch, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants/cookieKeys";

export const useIsLoggedIn = (): [boolean, () => void] => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  
  // Check if user is logged in
  useEffect(() => {    
    if (cookies[ACCESS_TOKEN], cookies[REFRESH_TOKEN]) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }    
  }, [cookies]);

  // Remove token from cookie after isLoggedIn set false
  const logout = () => {
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
    setIsLoggedIn(false);
  }

  return [isLoggedIn, logout];
}