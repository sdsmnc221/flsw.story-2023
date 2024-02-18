const changeAppBackground = (self: any) => {
  const { pin, trigger } = self;
  const app = document.querySelector("#app");

  // console.log(pin, trigger);

  if (app) {
    const el = trigger?.parentNode?.parentNode;
    if (el) {
      const backgroundString = window
        .getComputedStyle(pin || el, null)
        .getPropertyValue("background");

      const linearGradientRegex = /linear-gradient\(.*?100%\)/;
      const match = backgroundString.match(linearGradientRegex);

      if (match) {
        const linearGradientString = match[0];
        (app as any).style.background = linearGradientString;
      } else {
        console.log("No linear-gradient found in the string.");
      }
    }
  }
};

export { changeAppBackground };
