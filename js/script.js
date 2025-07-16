
  const track = document.getElementById('slider-track');
  const slides = track.children;
  const totalSlides = slides.length;
  const slideWidth = () => slides[0].clientWidth;

  const dotContainer = document.getElementById("dots");
  const actualSlides = totalSlides - 2; // remove 2 clones
  let currentIndex = 1;
  let interval;

  // Generate dot indicators
  for (let i = 0; i < actualSlides; i++) {
    const dot = document.createElement("div");
    dot.className =
      "h-2 w-2 bg-gray-400 rounded-full transition-all duration-300 cursor-pointer";
    dotContainer.appendChild(dot);

    // Add click to navigate to slide
    dot.addEventListener("click", () => {
      currentIndex = i + 1;
      setSlide(currentIndex);
      updateDots();
      restartAutoSlide();
    });
  }

  const dotElems = dotContainer.children;

  function updateDots() {
    [...dotElems].forEach((dot, i) => {
      if (i === currentIndex - 1) {
        dot.className =
          "h-2 w-6 bg-gray-700 rounded-full transition-all duration-300";
      } else {
        dot.className =
          "h-2 w-2 bg-gray-400 rounded-full transition-all duration-300";
      }
    });
  }

  // Set slide position
  function setSlide(index) {
    track.style.transition = 'transform 0.6s ease-in-out';
    track.style.transform = `translateX(-${slideWidth() * index}px)`;
    updateDots();
  }

  function nextSlide() {
    if (currentIndex >= totalSlides - 1) return;
    currentIndex++;
    setSlide(currentIndex);
  }

  function prevSlide() {
    if (currentIndex <= 0) return;
    currentIndex--;
    setSlide(currentIndex);
  }

  // Loop fix
  track.addEventListener('transitionend', () => {
    if (currentIndex === totalSlides - 1) {
      track.style.transition = 'none';
      currentIndex = 1;
      track.style.transform = `translateX(-${slideWidth() * currentIndex}px)`;
    }
    if (currentIndex === 0) {
      track.style.transition = 'none';
      currentIndex = totalSlides - 2;
      track.style.transform = `translateX(-${slideWidth() * currentIndex}px)`;
    }
    updateDots();
  });

  // Auto-play
  function startAutoSlide() {
    interval = setInterval(() => {
      nextSlide();
    }, 5000);
  }

  function stopAutoSlide() {
    clearInterval(interval);
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  window.addEventListener("load", () => {
    setSlide(currentIndex);
    updateDots();
    startAutoSlide();
  });

  window.addEventListener("resize", () => {
    track.style.transition = 'none';
    setSlide(currentIndex);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
  });

  document.getElementById("prevBtn").addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
  });

