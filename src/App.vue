<template>
  <div id="app">
    <TableComponent/>
  </div>
</template>

<script>
import TableComponent from './components/table'

export default {
  name: 'App',
  components: {
    TableComponent
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
