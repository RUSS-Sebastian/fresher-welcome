document.addEventListener("DOMContentLoaded", function () {
  const animations = {
    "main-img": "animate__zoomIn",
    "left-img": "animate__backInLeft",
    "right-img": "animate__fadeInDown",
    "black-con":"animate__backInRight"
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const animationClass = animations[el.id];

        el.classList.add("animate__animated", animationClass);

        // When animation ends, remove Animate.css classes and add floating
        el.addEventListener("animationend", function handler() {
          el.classList.remove("animate__animated", animationClass);
          el.classList.add("floating");
          el.removeEventListener("animationend", handler); // Clean up
        });

        observer.unobserve(el); // Only animate once
      }
    });
  }, {
    threshold: 0.3
  });

  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const target = document.getElementById("typewriter-text");
  const originalText = target.textContent;
  target.textContent = ""; // clear text initially

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        typeWriterEffect(target, originalText);
        obs.unobserve(entry.target); // Run only once
      }
    });
  }, { threshold: 0.5 });

  observer.observe(target);

  function typeWriterEffect(element, text, speed = 140) {
    let index = 0;
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
    type();
  }
});
