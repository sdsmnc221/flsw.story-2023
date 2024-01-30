// Get the existing style sheet or create a new one
export default function dynamicStyles(
  newCssRules: { class: string; css: string }[]
) {
  let styleSheet: any = document.styleSheets;
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
  }

  styleSheet = [...styleSheet].find((sheet) =>
    [...sheet.rules].some((rule) => {
      // console.log(rule);
      return rule?.conditionText?.includes("min-width: 53em");
    })
  );

  console.log(styleSheet);

  newCssRules.forEach((rule) => {
    // Check if the rule already exists and update it, or add a new rule
    // let ruleIndex = -1;
    // for (let i = 0; i < styleSheet.cssRules.length; i++) {
    //   //   console.log(styleSheet.cssRules);
    //   //   if (styleSheet.cssRules[i].selectorText === rule.class) {
    //   if (styleSheet.cssRules[i].conditionText?.includes("min-width: 53em")) {
    //     ruleIndex = i;
    //     break;
    //   }
    // }

    // if (ruleIndex !== -1) {
    //   // If the rule exists, update it
    //   styleSheet.deleteRule(ruleIndex);
    //   styleSheet.insertRule(rule.css, ruleIndex);
    // } else {
    // If the rule doesn't exist, add a new rule
    styleSheet.insertRule(
      `${rule.class} {${rule.css}}`,
      styleSheet.cssRules.length
    );
    // }
  });
}
