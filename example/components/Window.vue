/**
* Created by OXOYO on 2018/1/19.
*
*/

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
    <div class="x-window" v-x-drag="dragConfig" :disabled-drag="disabledDrag" :disabled-resize="disabledResize">
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
    props: {
      disabledDrag: {
        type: Boolean,
        default: false
      },
      disabledResize: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dragConfig: {
          // 拖拽配置
          drag: {
            // 是否启用拖拽
            enable: true,
            // 指定拖拽把手元素，支持一个或多个把手
            handler: ['.x-window-title', '.x-window-bar'],
            // 拖拽不同阶段 className
            class: {
              start: 'x-drag-start',
              move: 'x-drag-move',
              done: 'x-drag-done',
              main: 'x-drag'
            },
            // 回调
            callback: {
              start: null,
              move: null,
              done: (style) => {
                console.log('drag done', style)
              }
            }
          },
          // 缩放配置
          resize: {
            // 是否启用缩放
            enable: true,
            // 指定缩放把手元素，支持一个或多个把手
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
            // 缩放不同阶段 className
            class: {
              start: 'x-resize-start',
              move: 'x-resize-move',
              done: 'x-resize-done',
              main: 'x-resize'
            },
            // 回调
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

