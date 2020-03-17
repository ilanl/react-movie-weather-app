console.log(navigator.userAgent);

export const isMobile =
  navigator.userAgent.match(/Android|webOS|iPhone|iPad|etc/) !== null;
