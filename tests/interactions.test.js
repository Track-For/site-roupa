import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProductQuickView from '../src/components/sections/ProductQuickView.vue'
import PrivateFitting from '../src/components/sections/PrivateFitting.vue'
import WardrobeBuilder from '../src/components/sections/WardrobeBuilder.vue'
import { products } from '../src/data/products'

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

afterEach(() => {
  document.body.className = ''
  document.body.innerHTML = ''
})

describe('commerce interactions', () => {
  it('selects a size and emits a complete wardrobe item', async () => {
    const wrapper = mount(ProductQuickView, {
      props: { open: false, product: products[0] },
      global: { stubs: { teleport: true } },
    })

    await wrapper.setProps({ open: true })
    await nextTick()

    const medium = wrapper.findAll('.size-options button').find((button) => button.text() === 'M')
    await medium.trigger('click')
    await wrapper.find('.add-button').trigger('click')

    const added = wrapper.emitted('add')[0][0]
    expect(added.name).toBe('Cashmere Polo')
    expect(added.size).toBe('M')
    expect(added.color).toBe('Oatmeal')
    wrapper.unmount()
  })

  it('completes the private fitting request state', async () => {
    const wrapper = mount(PrivateFitting, {
      global: { stubs: { teleport: true, RevealImage: true } },
    })

    await wrapper.find('.fitting-copy button').trigger('click')
    await wrapper.find('input[type="text"]').setValue('Helena Duarte')
    await wrapper.findAll('input[type="text"]')[1].setValue('São Paulo')
    await wrapper.find('.modal-panel form').trigger('submit')

    expect(wrapper.text()).toContain('We will write')
    expect(wrapper.text()).toContain('A member of the house will reply')
    wrapper.unmount()
  })
})

describe('wardrobe builder', () => {
  it('updates the suggested edit from both choices', async () => {
    const wrapper = mount(WardrobeBuilder)
    const city = wrapper.findAll('.builder-choices button').find((button) => button.text() === 'CITY')
    const formal = wrapper.findAll('.builder-choices button').find((button) => button.text() === 'Formal')

    await city.trigger('click')
    await formal.trigger('click')
    await nextTick()

    const suggestions = wrapper.findAll('.wardrobe-piece h4').map((node) => node.text())
    expect(suggestions).toEqual(['Alderwyck Blazer', 'Oxford Shirt', 'Pleated Wool Trouser'])
    wrapper.unmount()
  })
})
