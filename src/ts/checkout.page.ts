function getTarget<T extends HTMLElement>(ev: Event) {
  return ev.currentTarget as T
}

function deleteOrderRowByClick() {
  const base = 'order-table'
  const rows = document.querySelectorAll<HTMLTableRowElement>(`.${base}__row`)

  rows.forEach(($it) => {
    const $input = $it.querySelector<HTMLInputElement>(`.${base}__qty input`)
    const buttons = $it.querySelectorAll<HTMLButtonElement>(`.${base}__qty button`)

    $it.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target !== $it) return

      const ind = +(target.dataset?.['item'] || -1)
      if (ind === -1 || ind === rows.length - 1) return

      $it.remove()
    })

    $input?.addEventListener('input', (e) => {
      const target = getTarget<HTMLInputElement>(e)

      if (target.value.match(/[^0-9]/g)) {
        target.value = target.value.replace(/[^0-9]/g, '')
      }

      if (target.value.trim() === '') return
      if (+target.value < 1) target.value = '1'
      if (+target.value > 250) target.value = '250'
    })

    $input?.addEventListener('blur', (e) => {
      const target = getTarget<HTMLInputElement>(e)
      if (!target.value.trim()) target.value = '1'
    })

    buttons.forEach(($button) => {
      $button.addEventListener('click', (e) => {
        if (!$input) return

        const target = getTarget<HTMLButtonElement>(e)
        const action = target.dataset?.['action']

        if (!action) return

        const plus = (val: number) => val < 250 ? String(val + 1) : '250'
        const minus = (val: number) => val > 1 ? String(val - 1) : '1'

        switch (action) {
          case 'minus':
            $input.value = minus(+$input.value)
            break
          case 'plus':
            $input.value = plus(+$input.value)
            break
        }
      })
    })
  })
}

function main() {
  deleteOrderRowByClick()
}

main()
