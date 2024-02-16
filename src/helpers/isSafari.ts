// Check if the browser is Safari
const isSafari = () =>
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

export default isSafari;
