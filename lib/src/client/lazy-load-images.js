module.exports = function () {
  const io = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image = entry.target;
        image.src = image.dataset.src;

        io.unobserve(image);
      }
    })
  );

  document.querySelectorAll(".lazy").forEach((element) => io.observe(element));
};
