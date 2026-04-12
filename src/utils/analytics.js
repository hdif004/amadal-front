import ReactGA from "react-ga4";

export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};

export const trackEvent = (eventName, params = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      send_to: 'G-2Z08SZ18HT'
    });
  }
};

export const initializeGA = (hasConsent) => {
  if (hasConsent) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  } else {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }
};