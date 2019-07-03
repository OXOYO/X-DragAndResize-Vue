import _extends from 'babel-runtime/helpers/extends';
import _getIterator from 'babel-runtime/core-js/get-iterator';
import _Object$values from 'babel-runtime/core-js/object/values';
import _Object$keys from 'babel-runtime/core-js/object/keys';
/**
 * Created by OXOYO on 2018/1/19.
 */

var XDrag = {};

XDrag.installed = false;
XDrag.install = function (Vue) {
  if (XDrag.installed) {
    return;
  }
  Vue.directive('x-drag', {
    inserted: function inserted(el, binding) {
      /*
      // config 配置结构参考
      config = {
        // 拖拽配置
        drag: {
          // 是否启用拖拽
          enable: true,
          // 指定拖拽把手元素，支持一个或多个把手
          handler: [],
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
          // 是否启用拖拽
          enable: false,
          // 指定缩放把手元素，支持一个或多个把手
          handler: [],
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
      */
      var getCss = function getCss(element) {
        return element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element, null);
      };
      var getStyle = function getStyle(element, key) {
        return getCss(element)[key];
      };
      var config = binding.value || {};
      if (_Object$keys(config).length) {
        // 处理拖拽
        if (config.drag && config.drag.enable) {
          // 处理 target
          var target = el;
          // 处理函数
          var handler = function handler(target, bar) {
            var dragInfo = {
              flag: false,
              position: {
                left: 0,
                top: 0
              },
              start: {
                x: 0,
                y: 0
              },
              done: {}
              // 绑定事件
            };bar.onmousedown = function (event) {
              var disabledDrag = el.getAttribute('disabled-drag');
              if (disabledDrag) {
                console.log('XDrag Info:: drag not enabled!');
                return;
              }
              if (event.stopPropagation) {
                event.stopPropagation();
              }
              if (event.preventDefault) {
                event.preventDefault();
              }
              dragInfo.flag = true;
              // 添加class
              target.classList.add(config.drag.class.start, config.drag.class.main);
              dragInfo.start = {
                x: event.clientX,
                y: event.clientY
              };
              dragInfo.position = {
                left: parseFloat(target.offsetLeft),
                top: parseFloat(target.offsetTop)
              };
              if (config.drag.callback && typeof config.drag.callback.start === 'function') {
                config.drag.callback.start(dragInfo.position);
              }
              // 绑定mousemove事件
              document.onmousemove = function (event) {
                if (event.stopPropagation) {
                  event.stopPropagation();
                }
                if (event.preventDefault) {
                  event.preventDefault();
                }
                if (dragInfo.flag) {
                  if (target.classList.contains(config.drag.class.start)) {
                    target.classList.remove(config.drag.class.start);
                  }
                  if (!target.classList.contains(config.drag.class.move)) {
                    target.classList.add(config.drag.class.move);
                  }
                  var dis = {
                    x: event.clientX - dragInfo.start.x,
                    y: event.clientY - dragInfo.start.y
                  };
                  dragInfo.done = {
                    left: dragInfo.position.left + dis.x + 'px',
                    top: dragInfo.position.top + dis.y + 'px'
                  };
                  _Object$keys(dragInfo.done).map(function (key) {
                    target.style[key] = dragInfo.done[key];
                  });
                  if (config.drag.callback && typeof config.drag.callback.move === 'function') {
                    config.drag.callback.move(dragInfo.done);
                  }
                }
              };
              // 绑定mouseup事件
              document.onmouseup = function (event) {
                if (event.stopPropagation) {
                  event.stopPropagation();
                }
                if (event.preventDefault) {
                  event.preventDefault();
                }
                dragInfo.flag = false;
                _Object$values(config.drag.class).map(function (className) {
                  target.classList.remove(className);
                });
                if (config.drag.callback && typeof config.drag.callback.done === 'function') {
                  config.drag.callback.done(dragInfo.done);
                }
                bar.onmouseup = null;
                document.onmousemove = null;
                document.onmouseup = null;
              };
            };
          };
          if (typeof config.drag.handler === 'string') {
            config.drag.handler = [config.drag.handler];
          }
          // 处理 bar
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _getIterator(config.drag.handler), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              var bar = item ? target.querySelector(item) : el;
              handler(target, bar);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        } else {
          console.log('XDrag Info:: drag not enabled!');
        }
        // 处理缩放
        if (config.resize && config.resize.enable) {
          // 处理 target
          var _target = el;
          if (typeof config.resize.handler === 'string') {
            console.log('XDrag Warning:: resize handler config error!');
            return;
          }
          // 处理函数
          var _handler = function _handler(target, bar, direction) {
            var resizeInfo = {
              flag: false,
              position: {
                left: 0,
                top: 0
              },
              start: {
                x: 0,
                y: 0
              },
              direction: direction,
              done: {}
              // 绑定事件
            };bar.onmousedown = function (event) {
              var disabledResize = el.getAttribute('disabled-resize');
              if (disabledResize) {
                console.log('XDrag Info:: resize not enabled!');
                return;
              }
              if (event.stopPropagation) {
                event.stopPropagation();
              }
              if (event.preventDefault) {
                event.preventDefault();
              }
              resizeInfo.flag = true;
              // 添加class
              target.classList.add(config.resize.class.start, config.resize.class.main);
              resizeInfo.start = {
                x: event.clientX,
                y: event.clientY
              };
              resizeInfo.position = {
                left: parseFloat(target.offsetLeft),
                top: parseFloat(target.offsetTop),
                width: parseFloat(getStyle(target, 'width')),
                height: parseFloat(getStyle(target, 'height'))
              };
              if (config.resize.callback && typeof config.resize.callback.start === 'function') {
                config.resize.callback.start(resizeInfo.position);
              }
              // 绑定mousemove事件
              document.onmousemove = function (event) {
                if (event.stopPropagation) {
                  event.stopPropagation();
                }
                if (event.preventDefault) {
                  event.preventDefault();
                }
                if (resizeInfo.flag) {
                  if (target.classList.contains(config.resize.class.start)) {
                    target.classList.remove(config.resize.class.start);
                  }
                  if (!target.classList.contains(config.resize.class.move)) {
                    target.classList.add(config.resize.class.move);
                  }
                  var dis = {
                    x: event.clientX - resizeInfo.start.x,
                    y: event.clientY - resizeInfo.start.y
                  };
                  var style = void 0;
                  switch (resizeInfo.direction) {
                    case 'top-left':
                      style = {
                        width: resizeInfo.position.width - dis.x + 'px',
                        height: resizeInfo.position.height - dis.y + 'px',
                        left: resizeInfo.position.left + dis.x + 'px',
                        top: resizeInfo.position.top + dis.y + 'px'
                      };
                      break;
                    case 'top-right':
                      style = {
                        width: resizeInfo.position.width + dis.x + 'px',
                        height: resizeInfo.position.height - dis.y + 'px',
                        top: resizeInfo.position.top + dis.y + 'px'
                      };
                      break;
                    case 'bottom-left':
                      style = {
                        width: resizeInfo.position.width - dis.x + 'px',
                        height: resizeInfo.position.height + dis.y + 'px',
                        left: resizeInfo.position.left + dis.x + 'px'
                      };
                      break;
                    case 'bottom-right':
                      style = {
                        width: resizeInfo.position.width + dis.x + 'px',
                        height: resizeInfo.position.height + dis.y + 'px'
                      };
                      break;
                    case 'top-border':
                      style = {
                        height: resizeInfo.position.height - dis.y + 'px',
                        top: resizeInfo.position.top + dis.y + 'px'
                      };
                      break;
                    case 'right-border':
                      style = {
                        width: resizeInfo.position.width + dis.x + 'px'
                      };
                      break;
                    case 'bottom-border':
                      style = {
                        height: resizeInfo.position.height + dis.y + 'px'
                      };
                      break;
                    case 'left-border':
                      style = {
                        width: resizeInfo.position.width - dis.x + 'px',
                        left: resizeInfo.position.left + dis.x + 'px'
                      };
                      break;
                  }
                  resizeInfo.done = _extends({}, style);
                  _Object$keys(resizeInfo.done).map(function (key) {
                    target.style[key] = resizeInfo.done[key];
                  });
                  if (config.resize.callback && typeof config.resize.callback.move === 'function') {
                    config.resize.callback.move(resizeInfo.done);
                  }
                }
              };
              // 绑定mouseup事件
              document.onmouseup = function (event) {
                if (event.stopPropagation) {
                  event.stopPropagation();
                }
                if (event.preventDefault) {
                  event.preventDefault();
                }
                resizeInfo.flag = false;
                _Object$values(config.resize.class).map(function (className) {
                  target.classList.remove(className);
                });
                if (config.resize.callback && typeof config.resize.callback.done === 'function') {
                  config.resize.callback.done(resizeInfo.done);
                }
                bar.onmouseup = null;
                document.onmousemove = null;
                document.onmouseup = null;
              };
            };
          };
          // 处理 bar
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _getIterator(_Object$keys(config.resize.handler)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var direction = _step2.value;

              var _item = config.resize.handler[direction];
              var _bar = _item ? _target.querySelector(_item) : el;
              _handler(_target, _bar, direction);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        } else {
          console.log('XDrag Info:: resize not enabled!');
        }
      }
    }
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(XDrag);
}

export default XDrag;