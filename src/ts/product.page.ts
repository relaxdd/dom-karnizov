import 'owl.carousel'

function getCssVariable(selector: string, variable: string) {
  const element = document.querySelector<HTMLElement>(selector)
  if (!element) return undefined

  const style = window.getComputedStyle(element)
  return style.getPropertyValue(variable)
}

/**
 * TODO: Добавлять скриптом padding-left если выбран первый элемент и padding-right если выбран крайний элемент плюс transform: translateX(-6px);
 */
function useProductGallery() {
  const $current = $('#productCurrent')
  const $gallery = $('#productGallery')
  const active = 'item-selected'

  function setCurrentActiveBorder(next: number) {
    let prev = -1

    $gallery.find('.product__gallery__item').each(function (this) {
      if (!$(this).hasClass(active)) return
      prev = $(this).data('index')
      $(this).removeClass(active)
    })

    $gallery.find('.product__gallery__item').eq(next).addClass(active)

    return prev
  }

  $current.owlCarousel({
    items: 1,
    nav: false,
    dots: false,
    margin: 30,
    onChanged: (e) => {
      if (e.item.index === null) return

      const next = e.item.index
      const prev = setCurrentActiveBorder(next)

      if (next > prev) $gallery.trigger('next.owl.carousel')
      else if (next < prev) $gallery.trigger('prev.owl.carousel')
    }
  })

  $gallery.owlCarousel({
    items: $gallery.data('qty-items') ?? 4,
    nav: true,
    dots: false,
    margin: 18,
    navClass: ['owl-prev product__gallery__nav', 'owl-next product__gallery__nav'],
    navText: [
      '<img src="/images/product-gallery-nav-button-prev.svg" alt="product-gallery-nav-button-prev" />',
      '<img src="/images/product-gallery-nav-button-next.svg" alt="product-gallery-nav-button-next" />'
    ],
    onInitialized: (e) => {
      if (e.item.index !== 0) return

      const size = getCssVariable('#productGallery', '--outline-width')
      if (!size) return

      $gallery.find('.owl-stage-outer').css({
        paddingLeft: size,
        paddingRight: size,
        marginLeft: `-${size}`,
        marginRight: `-${size}`,
      })
    },
  })

  $gallery.find('.product__gallery__item').on('click', (e) => {
    const $item = $(e.currentTarget)
    $current.trigger('to.owl.carousel', [$item.data('index')])
  })
}

function main() {
  useProductGallery()
}

main()
