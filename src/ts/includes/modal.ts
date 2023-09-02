type HE = HTMLElement

function modal() {
  const buttons = document.querySelectorAll('[data-modal]')
  const closes = document.querySelectorAll('.callback_modal__close')

  function onOpenBtnClickHandler({ currentTarget }: Event) {
    const modal = (currentTarget as HE).dataset?.['modal']
    if (!modal) return

    const $target = document.querySelector<HE>(modal)
    if (!$target) return

    $target.classList.add('show')
    $target.style.setProperty('display', 'block')

    document.querySelector('html')!.classList.add('modal-show')
  }

  function onCloseBtnClickHandler({ currentTarget }: Event) {
    const $modal = (currentTarget as HE).closest<HE>('.modal')
    if (!$modal) return

    $modal.classList.remove('show')
    $modal.style.setProperty('display', 'none')

    document.querySelector('html')!.classList.remove('modal-show')
  }

  buttons.forEach(($btn) => {
    $btn.addEventListener('click', onOpenBtnClickHandler)
  })

  closes.forEach(($btn) => {
    $btn.addEventListener('click', onCloseBtnClickHandler)
  })
}

export default modal
