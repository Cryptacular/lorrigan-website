export const trackEvent = (category, action, label = null, value = null) => {
  if (typeof ga === "undefined") {
    return;
  }

  ga("send", "event", category, action, label, value);
};

export const trackTiming = (category, action, value, label = null) => {
  if (typeof ga === "undefined") {
    return;
  }

  ga("send", "timing", category, action, label, value);
};
