function useHeaderDropdownToggle() {
  const shell = '#headerDropdownShell'
  const $parent = document.querySelector(shell)
  const $btn = document.querySelector<HTMLButtonElement>('#headerDropdownToggle')

  if (!$parent) return

  function onClickHandler() {
    if ($parent!.classList.contains('dropdown-visible'))
      $parent!.classList.remove('dropdown-visible')
    else
      $parent!.classList.add('dropdown-visible')
  }

  $btn?.addEventListener('click', onClickHandler)

  window.addEventListener('click', (e) => {
    const $maybeParent = (e.target as HTMLElement).closest(shell)
    if ($maybeParent !== null) return
    $parent?.classList.remove('dropdown-visible')
  })
}

function useStickyHeader() {
  if (window.innerWidth < 1400) return

  const $nav = document.querySelector<HTMLElement>('.header-bottom')!
  const offsetTop = $nav?.offsetTop || 0

  window.addEventListener('scroll', () => {
    if (window.scrollY >= offsetTop) {
      $nav.classList.add('header-bottom__fixed')
      document.querySelector('html')!.style.setProperty('margin-top', '62px')
    } else {
      $nav.classList.remove('header-bottom__fixed')
      document.querySelector('html')!.style.removeProperty('margin-top')
    }
  })
}

function useHeaderTabletToggle() {
  const active = 'header-top__float-show'
  const shell = '#headerTopFloatShell'
  const $shell = document.querySelector(shell)
  const $btn = document.querySelector('#headerTopFloatToggle')

  if (!$btn || !$shell) return

  $btn.addEventListener('click', () => {
    if ($shell.classList.contains(active))
      $shell.classList.remove(active)
    else
      $shell.classList.add(active)
  })

  window.addEventListener('click', (e) => {
    const $maybeParent = (e.target as HTMLElement).closest(shell)
    if ($maybeParent !== null) return
    $shell?.classList.remove(active)
  })
}

function header() {
  useStickyHeader()
  useHeaderDropdownToggle()
  useHeaderTabletToggle()
}

export default header
