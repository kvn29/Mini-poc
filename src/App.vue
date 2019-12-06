<template>
  <div id="app">
    <app-header ref="header"/>
    <app-graph ref="graph"/>
    <app-panel ref="panel"/>
    <app-main ref="main"/>
    <app-help ref="help"/>
    <app-logs ref="logs"/>
  </div>
</template>
<script>
import Header from './components/Header';
import Main from './components/Main';
import Panel from './components/Panel';
import Help from './components/Help';
import Graph from './components/Graph';
import Logs from './components/Logs';

export default {
  components: {
    [Header.name]: Header,
    [Main.name]: Main,
    [Panel.name]: Panel,
    [Help.name]: Help,
    [Graph.name]: Graph,
    [Logs.name]: Logs,
  }
}
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
