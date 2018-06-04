import Vue from 'vue'
import Table from '@/components/Table'
import { mount } from 'avoriaz'
import { expect } from 'chai'

// beforeEach
const Constructor = Vue.extend(Table)
const vm = new Constructor().$mount()

describe('Component', () => {
  it('has rendered component', () => {
    expect(Table.created).to.be.a('function')
  })
})

describe('It has static elements', () => {
  const staticElements = [
    'table',
    '.add-user',
    '.search-user',
    '.add-user-button'
  ]
  staticElements.forEach(selector => {
    it(`should render static element ${selector}`, () => {
      expect(vm.$el.querySelectorAll(selector)).to.have.lengthOf(1)
    })
  })
})

describe('Table data', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Table)
    wrapper.setData({
      usersList: [
        {name: 'Ant-man'},
        {name: 'Black Panther'},
        {name: 'Captain America'}
      ]
    })
  })
  it('has created a table with names', () => {
    expect(wrapper.find('table tr td')).to.have.lengthOf(3)
  })
  it('shows user action buttons', () => {
    expect(wrapper.find('.edit-user-trigger')).to.have.lengthOf(3)
    expect(wrapper.find('.delete-user')).to.have.lengthOf(3)
  })
  it('it renders with ASC sort', () => {
    expect(wrapper.find('table tr td')[0].text()).to.contain('Ant-man')
    expect(wrapper.find('table tr td')[2].text()).to.contain('Captain America')
  })
  it('it sorts DESC on click', () => {
    wrapper.find('.sort-by')[0].trigger('click')
    expect(wrapper.find('table tr td')[0].text()).to.contain('Captain America')
  })
  xit('filters users', () => {
    const searchUser = wrapper.find('.search-user')[0]
    searchUser.element.value = 'Black Panther'
    searchUser.trigger('input')
    expect(wrapper.find('table tr td')[0].text()).to.contain('Black Panther')
  })
})
