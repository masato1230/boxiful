import { useEffect } from "react";
import { useHistory } from "react-router";

const GoogleAnalytics = () => {
  const { listen } = useHistory();

  useEffect(() => {
    const unlisten = listen((location) => {
      if (!window.gtag) return;
      window.gtag('config', 'G-FJ91VPT6N4', { page_path: location.pathname });
    });
    return unlisten;
  
  }, [listen]);
  return null;
}

export default GoogleAnalytics;