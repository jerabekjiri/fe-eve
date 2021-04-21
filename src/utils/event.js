export const onEnterEvent = (callback) => {
    document.addEventListener('keydown', e => {
      e.key === 'Enter' && callback()
    })
}