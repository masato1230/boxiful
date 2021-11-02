import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();
  
  useEffect(() => {
    if (cookies.accessToken && cookies.refreshToken) {
      setIsLoggedIn(true);
    }
  }, []);

  return { isLoggedIn };
}