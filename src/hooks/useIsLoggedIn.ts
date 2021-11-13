import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/cookieKeys';

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookies = useCookies()[0];
  const removeCookie = useCookies()[2];

  // Check if user is logged in
  useEffect(() => {
    if (cookies[ACCESS_TOKEN] && cookies[REFRESH_TOKEN]) {
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
  };

  return {
    isLoggedIn,
    logout,
  };
};
