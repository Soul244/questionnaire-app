export default (component, attr) => {
  const wrappper = component.find(`[data-test='${attr}']`);
  return wrappper;
};
