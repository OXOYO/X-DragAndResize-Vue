<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .drag-header {
    border-bottom: 1px solid rgba(0, 0, 0, .3);
  }
</style>

<template>
  <div id="app">
    <a href="https://github.com/OXOYO/X-DragAndResize-Vue" target="_blank">
      <img
        style="position: absolute; top: 0; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png"
        alt="Fork me on GitHub"
      >
    </a>
    <div class="drag-header">
      <img src="./assets/logo.png">
      <h2>X-DragAndResize-Vue</h2>
    </div>
    <!-- 拖拽窗口 -->
    <Window></Window>
  </div>
</template>

<script>
import Window from './components/Window'

export default {
  name: 'App',
  components: {
    Window
  }
}
</script>
