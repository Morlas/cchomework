<template>
  <div id="app">
    <Table/>
  </div>
</template>

<script>
import Table from './components/table'

export default {
  name: 'App',
  components: {
    Table
  }
}
</script>

<style lang="scss">

@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
