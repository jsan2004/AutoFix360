const slides = document.querySelector('.slides');
  const slide = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  let currentIndex = 0;
  const totalSlides = slide.length;

  function showSlide(index) {
    if (index >= totalSlides) currentIndex = 0;
    if (index < 0) currentIndex = totalSlides - 1;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  next.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
  });

  prev.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
  });

  // Auto Slide
  setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
  }, 4000);
