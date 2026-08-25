import type { Directive } from 'vue'

/**
 * v-reveal — fades/slides elements in when they enter the viewport.
 * Usage: <div v-reveal> or <div v-reveal="200"> (delay in ms)
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('revealed')
            io.unobserve(el)
          }
        }
      },
      { threshold: 0.1 },
    )
    io.observe(el)
  },
}
