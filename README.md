# X-DragAndResize-Vue

> A Vue.js plugin use for modal window drag and resize.

## Example

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```


## Preview
![](https://raw.githubusercontent.com/OXOYO/X-DragAndResize-Vue/master/docs/preview.gif "preview")

## Usage

```bash
## main.js
import XDrag from '../src/XDrag'
Vue.use(XDrag)

## xx.vue
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
      let _t = this
      return {
        dragConfig: {
          // Context, if necessary, for broadcast events
          context: _t,
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
            }
          }
        }
      }
    }
  }
</script>
```
