import Vue from 'vue'
import Table from '@/components/Table'

const Constructor = Vue.extend(Table)
const vm = new Constructor().$mount()

describe('Component', () => {
  it('has rendered component', () => {
    expect(Table.created).to.be.a('function')
  })

  describe('It has static elements', () => {
    const staticElements = [
      'table',
      '.add-user',
      '.search-user',
      '.add-user-button'
    ]
    staticElements.forEach(value => {
      it(`should render static element ${value}`, () => {
        expect(vm.$el.querySelectorAll(value)).to.have.lengthOf(1)
      })
    })
  })

  describe('Table data', () => {
    vm._data.tableData = [
      {name: 'Ant-man'},
      {name: 'Black Panther'},
      {name: 'Captain America'}
    ]
    it('has created a table with names', () => {
      expect(vm.$el.querySelectorAll('table tr td')).to.have.lengthOf(3)
    })
    it('shows user action buttons', () => {
      expect(vm.$el.querySelectorAll('.edit-user-trigger')).to.have.lengthOf(3)
      expect(vm.$el.querySelectorAll('.delete-user')).to.have.lengthOf(3)
    })
    it('it sorts ASC', () => {
      const tableTd = vm.$el.querySelectorAll('table tr td')
      expect(tableTd[0].innerHTML).to.contain('Ant-man')
    })
  })
})
