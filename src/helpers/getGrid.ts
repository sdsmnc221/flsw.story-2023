import gsap from "gsap";

// Helper function that lets you dynamically figure out a grid's rows/columns as well as further refine those with "odd" or "even" ones
// https://greensock.com/forums/topic/34808-how-can-i-animate-the-odd-and-even-columns-rows-of-a-grid-with-gsapto/?do=findComment&comment=174346
const getGrid = (selector: any) => {
  let elements: any = gsap.utils.toArray(selector),
    bounds: any,
    getSubset = (axis: any, dimension: any, alternating: any, merge: any) => {
      let a = [],
        subsets: any = {},
        onlyEven = alternating === "even",
        p;
      bounds.forEach((b: any, i: number) => {
        let position = Math.round(b[axis] + b[dimension] / 2),
          subset = subsets[position];
        subset || (subsets[position] = subset = []);
        subset.push(elements[i]);
      });
      for (p in subsets) {
        a.push(subsets[p]);
      }
      if (onlyEven || alternating === "odd") {
        a = a.filter((_el, i) => !(i % 2) === onlyEven);
      }
      if (merge) {
        let a2: any = [];
        a.forEach((subset) => a2.push(...subset));
        return a2;
      }
      return a;
    };
  elements.refresh = () =>
    (bounds = elements.map((el: any) => el.getBoundingClientRect()));
  elements.columns = (alternating: any, merge: any) =>
    getSubset("left", "width", alternating, merge);
  elements.rows = (alternating: any, merge: any) =>
    getSubset("top", "height", alternating, merge);
  elements.refresh();

  return elements;
};

export { getGrid };
