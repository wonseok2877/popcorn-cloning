// method : window.scroll()
const scrollSmooth = (top) => {
  window.scroll({
    top,
    behavior: "smooth",
  });
};

export default scrollSmooth;
