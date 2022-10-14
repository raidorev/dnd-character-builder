import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import AppLogo from './app-logo.vue'

describe('app-logo', () => {
  it('should have color prop', () => {
    const wrapper = mount(AppLogo, { props: { color: 'red' } })

    expect(wrapper.props().color).toBe('red')
  })

  it('should render SVG', () => {
    expect(AppLogo).toBeTruthy()

    const wrapper = mount(AppLogo, { props: { color: 'red' } })

    expect(wrapper.get('svg')).toBeTruthy()
  })
})
