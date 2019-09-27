const isDevEnvironment = window.location.hostname === "localhost";

export const trackEvent = (category, action, label = null, value = null) => {
  if (typeof gtag === "undefined") {
    return;
  }

  if (isDevEnvironment) {
    console.log("Event tracked:", category, action, label, value);
    return;
  }

  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

export const trackTiming = (category, action, value, label = null) => {
  if (typeof gtag === "undefined") {
    return;
  }

  if (isDevEnvironment) {
    console.log("Event tracked:", category, action, label, value);
    return;
  }

  gtag("event", "timing_complete", {
    name: action,
    value: value,
    event_category: category,
    event_label: label
  });
};
