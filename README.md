# X-DragAndResize-Vue

> A Vue.js directive use for modal window drag and resize.

[![Version](https://img.shields.io/npm/v/x-dragandresize.svg)](https://www.npmjs.com/package/x-dragandresize)
[![License](https://img.shields.io/npm/l/x-dragandresize.svg)](https://www.npmjs.com/package/x-dragandresize)
[![NPM downloads](http://img.shields.io/npm/dm/x-dragandresize.svg?style=flat-square)](https://npmjs.org/package/x-dragandresize)
[![Downloads](https://img.shields.io/npm/dt/x-dragandresize.svg)](https://www.npmjs.com/package/x-dragandresize)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/x-dragandresize/dist/XDrag.js?compression=gzip&label=gzip%20size:%20JS&style=flat-square)

## Example

``` bash
# git clone https://github.com/OXOYO/X-DragAndResize-Vue.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```


## Preview
[Demo](https://oxoyo.github.io/X-DragAndResize-Vue/)

![https://oxoyo.github.io/X-DragAndResize-Vue/](https://raw.githubusercontent.com/OXOYO/X-DragAndResize-Vue/master/docs/preview.gif "preview")

## Usage

```bash
## Packages install
npm install x-dragandresize --save

## main.js
import XDrag from 'x-dragandresize'
Vue.use(XDrag)

## xx.vue
<style lang="less" rel="stylesheet/less">
  .drag-box {
    position: relative;
    width: 100%;
    min-height: 500px;
    box-sizing: border-box;
    padding: 10px;
    background: rgba(0, 0, 0, .1);
  }
  .x-window {
    position: absolute;
    width: 300px;
    height: 200px;
    border: 1px solid rgba(0, 0, 0, .3);
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;

    .x-window-header {
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid rgba(0, 0, 0, .3);
      background: rgba(245, 247, 249, 1);
      cursor: default;

      &:hover {
        background: rgba(0, 0, 0, .1);
      }

      .x-window-title {
        padding: 0 10px;
        text-align: left;
        cursor: default;
      }
    }
    .x-window-body {
      padding: 10px;

      .x-window-bar {
        padding: 10px;
        border: 1px solid rgba(0, 0, 0, .1);
        background: rgba(245, 247, 249, 1);
        cursor: default;
        &:hover {
          background: rgba(0, 0, 0, .1);
        }
      }
    }
  }

  .x-drag-start,
  .x-drag-move {
    transition: none;
    opacity: .7;

    .x-window-header {
      .x-window-title {
        cursor: move !important;
      }
    }
    .x-window-body {
      .x-window-bar {
        cursor: move !important;
      }
    }
  }

  .app-window-resize {
    width: 20px;
    height: 20px;
    position: absolute;
    background: transparent;
    &.resize-top-left {
      cursor: nw-resize;
      top: 0;
      left: 0;
    }
    &.resize-top-right {
      cursor: ne-resize;
      top: 0;
      right: 0;
    }
    &.resize-bottom-left {
      cursor: sw-resize;
      bottom: 0;
      left: 0;
    }
    &.resize-bottom-right {
      cursor: se-resize;
      bottom: 0;
      right: 0;
    }
    &.resize-top-border {
      cursor: ns-resize;
      top: 0;
      width: 100%;
      height: 2px;
    }
    &.resize-right-border {
      cursor: ew-resize;
      right: 0;
      width: 2px;
      height: 100%;
    }
    &.resize-bottom-border {
      cursor: ns-resize;
      bottom: 0;
      width: 100%;
      height: 2px;
    }
    &.resize-left-border {
      cursor: ew-resize;
      left: 0;
      width: 2px;
      height: 100%;
    }
  }
</style>

<template>
  <div class="drag-box">
    <div class="x-window" v-x-drag="dragConfig">
      <div class="app-window-resize resize-top-left"></div>
      <div class="app-window-resize resize-top-right"></div>
      <div class="app-window-resize resize-bottom-left"></div>
      <div class="app-window-resize resize-bottom-right"></div>
      <div class="app-window-resize resize-top-border"></div>
      <div class="app-window-resize resize-right-border"></div>
      <div class="app-window-resize resize-bottom-border"></div>
      <div class="app-window-resize resize-left-border"></div>
      <div class="x-window-header">
        <div class="x-window-title">Drag Here</div>
      </div>
      <div class="x-window-body">
        <h1>TODO Window</h1>
        <div class="x-window-bar">Drag Here</div>.
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Window',
    data () {
      return {
        dragConfig: {
          // Drag and drop configuration
          drag: {
            // Whether to enable drag and drop
            enable: true,
            // Specify drag and drop handle element, support for one or more handles
            handler: ['.x-window-title', '.x-window-bar'],
            // Drag the different stages of className
            class: {
              start: 'x-drag-start',
              move: 'x-drag-move',
              done: 'x-drag-done',
              main: 'x-drag'
            },
            // callback
            callback: {
              start: null,
              move: null,
              done: (style) => {
                console.log('drag done', style)
              }
            }
          },
          // Zoom configuration
          resize: {
            // Whether to enable zooming
            enable: true,
            // Specify the zoom handle element to support one or more handles
            handler: {
              'top-left': '.resize-top-left',
              'top-right': '.resize-top-right',
              'bottom-left': '.resize-bottom-left',
              'bottom-right': '.resize-bottom-right',
              'top-border': '.resize-top-border',
              'right-border': '.resize-right-border',
              'bottom-border': '.resize-bottom-border',
              'left-border': '.resize-left-border'
            },
            // Scaling different stages of className
            class: {
              start: 'x-resize-start',
              move: 'x-resize-move',
              done: 'x-resize-done',
              main: 'x-resize'
            },
            // callback
            callback: {
              start: null,
              move: null,
              done: (style) => {
                console.log('resize done', style)
              }
            }
          }
        }
      }
    }
  }
</script>
```
