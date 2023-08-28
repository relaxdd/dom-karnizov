import 'owl.carousel'

function useBannerCarousel() {
  if (window.innerWidth < 740) return

  $('.banner-slider').owlCarousel({
    items: 1,
    dots: false,
    nav: true,
    navClass: ['owl-prev banner-slider__nav', 'owl-next banner-slider__nav'],
    navText: [
      '<img src="./images/banner-carousel-btn-prev.svg" alt="banner-carousel-btn-prev" />',
      '<img src="./images/banner-carousel-btn-next.svg" alt="banner-carousel-btn-next" />',
    ],
    margin: 30
  })
}

function main() {
  useBannerCarousel()
}

main()
