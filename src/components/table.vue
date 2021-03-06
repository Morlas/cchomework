<template>
<div id="app">
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><icon name="user"></icon></span>
  </div>
    <input type="text" v-model="newUser" class="add-user form-control" placeholder="Add user">
    <div class="input-group-append">
      <button class="add-user-button btn outline-secondary" v-on:click="addUser()"><icon name="user-plus"></icon></button>
    </div>
  </div>
  <div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1"><icon name="search"></icon></span>
  </div>
  <input v-model="search" class="search-user form-control" placeholder="Filter users by name (case sensitive)">
  </div>
  <table class="table table-bordered">
   <thead>
      <tr>
        <th class="sort-by" v-on:click="sort('name')">Name</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="search === ''" v-for="user in sortedUsers" :key="user.name">
        <td>{{user.name}}
          <button class="btn delete-user btn-danger" v-on:click="deleteUser(user, true)"><icon name="times"></icon></button>
          <b-btn class="btn btn-warning edit-user-trigger" v-on:click="editedUser = user" v-b-modal.edit-user><icon name="edit"></icon></b-btn>
        </td>
      </tr>
      <tr v-if="search !== ''" v-for="user in filteredUsers" :key="user.name">
        <td>{{user.name}}<button class="btn delete-user btn-danger" v-on:click="deleteUser(user)"><icon name="times"></icon></button></td>      </tr>
    </tbody>
  </table>
  <p>
  <button class="btn btn-secondary" v-on:click="prevPage" v-if="showPreviousButton">Previous</button>
  <button class="btn btn-primary" v-on:click="nextPage" v-if="showNextButton">Next</button>
  </p>
  debug: sort={{currSort}}, dir={{currSortDir}}, page={{currPage}}
  <b-modal id="edit-user" title="Edit user">
    <p class="my-4">Editing name of <strong>{{editedUser.name}}</strong></p>
    <div class="aligner">
      <div class="input-group">
        <input type="text" v-model="newUserName" placeholder="New name" />
          <div class="input-group-append">
        <button class="btn btn-outline-secondary" v-on:click="editUser" type="button">Edit</button>
          </div>
    </div>
    </div>
  </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data: function () {
    return {
      usersList: [],
      sortedData: [],
      currSort: 'name',
      currSortDir: 'ASC',
      pageSize: 3,
      currPage: 1,
      search: '',
      newUser: '',
      editedUser: '',
      newUserName: ''
    }
  },
  created: function () {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(resp => resp.json())
      .then(resp => {
        this.usersList = resp
      })
  },
  methods: {
    addUser: function (optionalName) {
      if (this.newUser !== '') {
        this.usersList.push({ name: this.newUser })
      } else if (optionalName) {
        this.usersList.push({ name: optionalName })
      }
      return this
    },
    deleteUser: function (user, toConfirm) {
      if (toConfirm) {
        if (confirm('Are you sure you want to delete ' + user.name + '?')) {
          this.usersList.splice(this.usersList.indexOf(user), 1)
        }
      }
      return this
    },

    editUser: function () {
      this.deleteUser(this.editedUser, false).addUser(this.newUserName)
    },

    sort: function (sortBy) {
      if (sortBy === this.currSort) {
        this.currSortDir = this.currSortDir === 'ASC' ? 'DESC' : 'ASC'
      }
      this.currSort = sortBy
    },

    nextPage: function () {
      if (this.isNextPage()) {
        this.currPage++
      }
    },

    prevPage: function () {
      if (this.currPage > 1) {
        this.currPage--
      }
    },

    isNextPage: function () {
      return this.currPage * this.pageSize < this.usersList.length
    }
  },

  computed: {
    showPreviousButton: function () {
      return this.currPage > 1
    },
    showNextButton: function () {
      if (this.usersList) {
        return this.isNextPage()
      }
    },
    sortedUsers: function () {
      return Array.from(this.usersList)
        .sort((a, b) => {
          const sort = this.currSort
          let modifier = this.currSortDir === 'ASC' ? 1 : -1
          if (a[sort] < b[sort]) {
            return -1 * modifier
          }
          if (a[sort] > b[sort]) {
            return 1 * modifier
          }
          return 0
        })
        .filter((row, index) => {
          const start = (this.currPage - 1) * this.pageSize
          const end = this.currPage * this.pageSize
          if (index >= start && index < end) {
            return true
          }
        })
    },
    filteredUsers: function () {
      var _this = this
      if (_this.search) {
        return _this.tableData.filter(user => {
          return user.name.indexOf(_this.search) !== -1
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
thead {
  th {
    cursor: pointer;
  }
}
.delete-user, .edit-user-trigger {
  float: right;
  padding: 0px 8px;
  margin-right: 5px;

  svg.fa-icon {
    margin-top: 5px;
    color: #fff;
  }
}

.edit-user-trigger {
  padding: 1px 7px;
}

.aligner {
  display: flex;
  align-items: center;
  justify-content: center;
  .input-group{
    width: auto;
  }
}
</style>
