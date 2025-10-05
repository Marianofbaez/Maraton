
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PodiumBadge from '../src/components/PodiumBadge.vue'

describe('PodiumBadge', () => {
  it('muestra medalla para top 3', () => {
    const wrap = mount(PodiumBadge, { props: { position: 1 } })
    expect(wrap.text()).toContain('1°')
  })
  it('no renderiza para posición > 3', () => {
    const wrap = mount(PodiumBadge, { props: { position: 4 } })
    expect(wrap.html()).toBe('')
  })
})
