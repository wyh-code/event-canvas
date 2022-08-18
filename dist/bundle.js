'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var Event = /*#__PURE__*/function () {
  function Event() {
    _classCallCheck(this, Event);

    this.listeners = {};
  }

  _createClass(Event, [{
    key: "on",
    value: function on(eventName, fn) {
      this.listeners[eventName] = this.listeners[eventName] || [];
      this.listeners[eventName].push(fn);
    }
  }, {
    key: "once",
    value: function once(eventName, fn) {
      var _this = this;

      var once = function once() {
        fn();

        _this.off(eventName, once);
      };

      once.l = fn;
      this.on(eventName, once);
    }
  }, {
    key: "off",
    value: function off(eventName, fn) {
      if (!fn) {
        this.listeners[eventName] = [];
      } else {
        this.listeners[eventName] = this.listeners[eventName].filter(function (_fn) {
          return fn !== _fn && fn !== _fn.l;
        });
      }
    }
  }, {
    key: "emit",
    value: function emit(eventName, args) {
      var _this$listeners$event;

      // console.log(args, '==args==')
      (_this$listeners$event = this.listeners[eventName]) === null || _this$listeners$event === void 0 ? void 0 : _this$listeners$event.forEach(function (fn) {
        return fn(args.event, args.nodes);
      });
    }
  }]);

  return Event;
}();

var creatId = function creatId() {
  return [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255), 255].join('-');
};
var idToRgba = function idToRgba(id) {
  return id.split('-');
};
var rgbaToId = function rgbaToId(rgba) {
  return rgba.toString().split(',').join('-');
};
var EventNames = {
  click: 'click',
  mousedown: 'mousedown',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave'
};

var Base = /*#__PURE__*/function () {
  // 绘制上下文实例

  /**
   * eleIds: 已有元素的id,
   * ctx: 画布绘制上下文,
   * hideCtx: 影子画布上下文 
   * options: 元素节点信息,
   * index: 元素绘制顺序下标
   * @param {*} props 
   */
  function Base(props) {
    _classCallCheck(this, Base);

    Object.assign(this, props); // 创建id

    this.id = this.creatId();
  }

  _createClass(Base, [{
    key: "creatId",
    value: function creatId$1() {
      var id = creatId();

      while (Base.context.eleIds[id]) {
        this.id = creatId();
      }

      Base.context.eleIds[id] = this;
      return id;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.id;
    }
  }]);

  return Base;
}();

_defineProperty(Base, "context", null);

var Rect = /*#__PURE__*/function (_Base) {
  _inherits(Rect, _Base);

  var _super = _createSuper(Rect);

  function Rect(props) {
    _classCallCheck(this, Rect);

    return _super.call(this, props);
  }

  _createClass(Rect, [{
    key: "draw",
    value: function draw() {
      var _this$options = this.options,
          x = _this$options.x,
          y = _this$options.y,
          width = _this$options.width,
          height = _this$options.height,
          fillColor = _this$options.fillColor,
          strokeColor = _this$options.strokeColor,
          _this$options$strokeW = _this$options.strokeWidth,
          strokeWidth = _this$options$strokeW === void 0 ? 1 : _this$options$strokeW;
      var ctx = this.ctx,
          hideCtx = this.hideCtx;
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = strokeColor || fillColor;
      ctx.lineWidth = strokeWidth;
      ctx.fillStyle = fillColor;
      ctx.rect(x, y, width, height);
      ctx.fill();
      ctx.stroke();
      ctx.restore(); // 绘制隐藏屏幕

      var _idToRgba = idToRgba(this.getId()),
          _idToRgba2 = _slicedToArray(_idToRgba, 4),
          r = _idToRgba2[0],
          g = _idToRgba2[1],
          b = _idToRgba2[2],
          a = _idToRgba2[3];

      hideCtx.save();
      hideCtx.beginPath();
      hideCtx.strokeStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.rect(x, y, width, height);
      hideCtx.fill();
      hideCtx.stroke();
      hideCtx.restore();
    }
  }]);

  return Rect;
}(Base);

var Circle = /*#__PURE__*/function (_Base) {
  _inherits(Circle, _Base);

  var _super = _createSuper(Circle);

  function Circle(props) {
    _classCallCheck(this, Circle);

    return _super.call(this, props);
  }

  _createClass(Circle, [{
    key: "draw",
    value: function draw() {
      var _this$options = this.options,
          x = _this$options.x,
          y = _this$options.y,
          radius = _this$options.radius,
          fillColor = _this$options.fillColor,
          strokeColor = _this$options.strokeColor,
          _this$options$strokeW = _this$options.strokeWidth,
          strokeWidth = _this$options$strokeW === void 0 ? 1 : _this$options$strokeW;
      var ctx = this.ctx,
          hideCtx = this.hideCtx;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.strokeColr = strokeColor || fillColor, ctx.linWidth = strokeWidth;
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore(); // 离屏绘制

      var _idToRgba = idToRgba(this.getId()),
          _idToRgba2 = _slicedToArray(_idToRgba, 4),
          r = _idToRgba2[0],
          g = _idToRgba2[1],
          b = _idToRgba2[2],
          a = _idToRgba2[3];

      hideCtx.save();
      hideCtx.beginPath();
      hideCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.lineWidth = strokeWidth;
      hideCtx.arc(x, y, radius, 0, Math.PI * 2);
      hideCtx.fill();
      hideCtx.restore();
    }
  }]);

  return Circle;
}(Base);

var EventCanvas = /*#__PURE__*/function (_Event) {
  _inherits(EventCanvas, _Event);

  var _super = _createSuper(EventCanvas);

  /**
   * canvas 画布
   * data 元素数据
   * sort 重叠时事件触发顺序：1-由上到下，0-由下到上
   * @param {*} options
   */
  function EventCanvas(_options) {
    var _this;

    _classCallCheck(this, EventCanvas);

    _this = _super.call(this, _options);

    _defineProperty(_assertThisInitialized(_this), "custom", function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if ((options.x === undefined || options.y === undefined) && options.drag) {
        console.error("".concat(JSON.stringify(options), "\n      drag \u51FD\u6570\u9700\u8981\u4F20\u9012\u8D77\u59CB\u4F4D\u7F6E\u5C5E\u6027\u4FE1\u606F\uFF08x\uFF0Cy\uFF09"));
      }

      _this.data.push(options);

      var hideCtx = _this.createHideCtx();

      var ele = new Base({
        ctx: _this.ctx,
        hideCtx: hideCtx,
        options: options,
        index: _this.nodes.length,
        // draw: options.font ? this.customFont(options, hideCtx, ele) : this.customDraw(options, hideCtx, ele)
        draw: options.font ? function () {
          return _this.customFont(options, hideCtx, ele);
        } : function () {
          return _this.customDraw(options, hideCtx, ele);
        }
      });

      _this.nodes.push(ele);

      _this.draw();
    });

    _defineProperty(_assertThisInitialized(_this), "getTextInfo", function (options) {
      var span = document.createElement('span');
      span.innerText = options.font.value;
      span.style.font = options.font.font || '26px "Microsoft YaHei"';
      span.style.position = 'fixed';
      span.style.lineHeight = 1;
      span.style.top = options.y + 'px';
      span.style.left = options.x + 'px';
      span.style.whiteSpace = 'nowrap';
      span.style.zIndex = 2;
      document.body.appendChild(span);
      var width = span.clientWidth;
      var height = span.clientHeight;
      span.remove();
      return {
        width: width,
        height: height
      };
    });

    _defineProperty(_assertThisInitialized(_this), "customDraw", function (options, hideCtx, ele) {
      // 重写 draw 添加影子画布绘制
      _this.ctx.save();

      options.draw(_this.ctx);

      _this.ctx.restore(); // 绘制离屏


      var _idToRgba = idToRgba(ele.getId()),
          _idToRgba2 = _slicedToArray(_idToRgba, 4),
          r = _idToRgba2[0],
          g = _idToRgba2[1],
          b = _idToRgba2[2],
          a = _idToRgba2[3];

      hideCtx.save();
      options.draw(hideCtx);
      hideCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.strokeStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.stroke();

      if (options.fill) {
        hideCtx.fill();
      }

      hideCtx.restore();
    });

    if (!_options.canvas) {
      console.error('canvas 为必传参数');
      return _possibleConstructorReturn(_this);
    } // 传递绘制实例


    Base.context = _assertThisInitialized(_this);
    _this.data = _options.data || [];
    _this.sort = _options.sort === 0 ? 0 : 1;
    _this.canvas = _options.canvas; // 画布上下文

    _this.ctx = _this.canvas.getContext('2d'); // 清晰度适配

    _this.devicePixelRatio(); // 存放所有绘制的元素id


    _this.eleIds = {}; // 存放可拖动元素

    _this.move = null;
    _this.isMove = false; // 收集处于事件中的元素

    _this.eventNodes = new Set(); // 初始化数据

    _this.initNodes(); // 绘制元素


    _this.draw(); // 事件注册


    _this.addEventListener();

    return _this;
  }
  /**
   * 事件注册
   */


  _createClass(EventCanvas, [{
    key: "addEventListener",
    value: function addEventListener() {
      var _this2 = this;

      Object.keys(EventNames).forEach(function (eventName) {
        _this2.canvas.addEventListener(eventName, _this2.eventHandler(eventName));
      });
    }
    /**
     * 事件处理函数
     * @param {*} eventName 事件名称
     */

  }, {
    key: "eventHandler",
    value: function eventHandler(eventName) {
      var _this3 = this;

      return function (event) {
        var _nodes;

        var x = event.offsetX;
        var y = event.offsetY;
        var clientX = event.clientX;
        var clientY = event.clientY; // console.log(clientX, clientY, x, y)
        // 获取元素

        var nodes = _this3.getNodes({
          x: x,
          y: y
        }); // console.log(nodes, '==nodes==')
        // 组装事件回调参数


        var options = {
          eventName: eventName,
          ex: x,
          ey: y,
          clientX: clientX,
          clientY: clientY
        }; // 如果元素不在上次收集的里边，触发 mouseenter 事件

        nodes.forEach(function (node) {
          if (!_this3.eventNodes.has(node)) {
            node.options.mouseenter && node.options.mouseenter(event, Object.assign({}, options, node.options)); // 如果有拖动元素，且新增元素下标大于拖动下标，说明新增元素在拖动元素上方，则终止拖动事件

            if (_this3.move && node.index > _this3.move.index) {
              _this3.move = null;
              _this3.isMove = false;
            }
          }
        }); // 如果上次已有的元素不在本次收集的元素内，触发 mouseleave 事件

        var newSet = new Set(nodes);

        _this3.eventNodes.forEach(function (node) {
          if (!newSet.has(node)) {
            node.options.mouseleave && node.options.mouseleave(event, Object.assign({}, options, node.options));
          }
        });
        /**
         * 鼠标拖拽可移动元素后，移动过快会产生以下情况：
         *  - 脱离移动元素后，落在了另一个可移动元素上，此时 isMove: true, this.move: 新的移动元素。干扰绘制，出现错乱
         * 
         * 如果有移动元素，且该元素在 eventNodes 中，不在 newSet 中，则认为脱离移动元素，终止移动
         */


        if (_this3.eventNodes.has(_this3.move) && !newSet.has(_this3.move)) {
          _this3.isMove = false;
        } // 更新记录值


        _this3.eventNodes = newSet; // 判断鼠标点击的最上方元素是否可以拖动

        _this3.move = (_nodes = nodes[nodes.length - 1]) !== null && _nodes !== void 0 && _nodes.options.drag ? nodes[nodes.length - 1] : null; // 设置事件触发顺序

        if (_this3.sort) {
          nodes.reverse();
        } // 触发元素事件


        var stop;

        var _iterator = _createForOfIteratorHelper(nodes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var node = _step.value;

            if (node.options[eventName]) {
              node.options[eventName](event, Object.assign({}, options, node.options));
            }

            if (node.options.stop === true || node.options.stop === eventName) {
              stop = true;
              break;
            }
          } // canvas 层面事件派发

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        _this3.dispatchEvent({
          x: x,
          y: y,
          stop: stop,
          eventName: eventName,
          event: event,
          nodes: nodes
        });
      };
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(_ref) {
      var x = _ref.x,
          y = _ref.y,
          stop = _ref.stop,
          eventName = _ref.eventName,
          event = _ref.event,
          nodes = _ref.nodes;

      if (eventName === EventNames.mousedown) {
        this.downx = x;
        this.downy = y;
        this.isMove = true;

        if (this.move) {
          this.move.options.startX = this.move.options.x;
          this.move.options.startY = this.move.options.y;
        }
      }

      if (eventName === EventNames.mouseup) {
        this.upx = x;
        this.upy = y;
        this.isMove = false;
        this.move = null;
      }

      if (eventName === EventNames.mousemove) {
        var ele = this.move;

        if (ele && this.isMove) {
          var offsetX = this.downx - ele.options.startX;
          var offsetY = this.downy - ele.options.startY;

          if ((ele.options.x === undefined || ele.options.y === undefined) && ele.options.drag) {
            console.error("".concat(JSON.stringify(ele.options), "\n          drag \u51FD\u6570\u9700\u8981\u4F20\u9012\u8D77\u59CB\u4F4D\u7F6E\u5C5E\u6027\u4FE1\u606F\uFF08x\uFF0Cy\uFF09"));
            return;
          }

          ele.options.x = x - offsetX;
          ele.options.y = y - offsetY;
          ele.hideCtx.clearRect(0, 0, this.canvas.width, this.canvas.height); // ele.hideCtx.clearRect(0, 0, 2000, 1200)

          console.log(ele.hideCtx.canvas, 0, 0, this.canvas.width, this.canvas.height);
          this.draw();
          ele.options.drag && ele.options.drag(event, ele.options);
        }
      } // 触发 canvas 事件


      if (!stop) {
        this.emit(eventName, {
          event: event,
          nodes: nodes.map(function (node) {
            return node.options;
          })
        });
      }
    }
  }, {
    key: "getNodes",
    value: function getNodes(_ref2) {
      var _this4 = this;

      var x = _ref2.x,
          y = _ref2.y;
      return this.nodes.filter(function (ele) {
        var data = ele.hideCtx.getImageData(x * _this4.dpr, y * _this4.dpr, 1, 1).data; // 如果影子画布获取到的颜色与元素id相等，则鼠标在该元素上方

        return rgbaToId(data) === ele.id;
      });
    }
    /**
     * 初始化元素节点
     */

  }, {
    key: "initNodes",
    value: function initNodes() {
      var _this5 = this;

      this.nodes = this.data.map(function (item, index) {
        var hideCtx = _this5.createHideCtx();

        if (item.type === 'circle') {
          return new Circle({
            ctx: _this5.ctx,
            hideCtx: hideCtx,
            options: item,
            index: index
          });
        }

        if (item.type === 'rect') {
          return new Rect({
            ctx: _this5.ctx,
            hideCtx: hideCtx,
            options: item,
            index: index
          });
        }
      });
      this.size = this.nodes.length;
    }
    /**
     * 创建影子画布
     * @returns
     */

  }, {
    key: "createHideCtx",
    value: function createHideCtx() {
      var canvas = this.canvas;
      var width = canvas.width;
      var height = canvas.height;
      /**
       * 兼容 OffscreenCanvas
       */

      var hideCanvas = null;

      if (OffscreenCanvas) {
        hideCanvas = new OffscreenCanvas(width, height);
      } else {
        hideCanvas = document.createElement('canvas');
        hideCanvas.width = width;
        hideCanvas.height = height;
      }

      var hideCtx = hideCanvas.getContext('2d');
      hideCtx.scale(this.dpr, this.dpr); // 根据dpr 缩放画布

      return hideCtx;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "draw",
    value: function draw() {
      this.clear();
      this.nodes.map(function (ele) {
        return ele.draw();
      });
    }
    /**
     * 设备像素比 = 物理像素（设备像素） / 逻辑像素（独立像素，或者分辨率） 
     *  物理像素（设备像素）是屏幕最小的物理单位。需要注意的是一个像素并不一定是一个小正方形区块
     * 一个彩灯（物理像素）由红、蓝、绿小灯组成，三盏小灯不同的亮度混合出各种色彩。
     * 
     * 一个独立像素里可能包含 1 个或者多个物理像素点，包含的越多则屏幕看起来越清晰。
     * 
     * @returns 
     */

  }, {
    key: "devicePixelRatio",
    value: function devicePixelRatio() {
      var canvas = this.canvas;
      var dpr = window.devicePixelRatio;

      var _this$getStyle = this.getStyle(),
          width = _this$getStyle.width,
          height = _this$getStyle.height; // 设置样式


      canvas.style.width = "".concat(width, "px");
      canvas.style.height = "".concat(height, "px"); // 设置画布宽高

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      this.ctx.scale(dpr, dpr); // 根据dpr 缩放画布

      this.dpr = dpr;
    }
    /**
     * 根据父节点确定canvas宽高
     * @returns 
     */

  }, {
    key: "getStyle",
    value: function getStyle() {
      var parentNode = this.canvas.parentNode;
      var styles = getComputedStyle(parentNode);
      var width = parseFloat(styles.width);
      var height = parseFloat(styles.height);
      var borderLeftWidth = parseFloat(styles.borderLeftWidth);
      var borderRightWidth = parseFloat(styles.borderRightWidth);
      var borderTopWidth = parseFloat(styles.borderTopWidth);
      var borderBottomWidth = parseFloat(styles.borderBottomWidth);
      var paddingLeft = parseFloat(styles.paddingLeft);
      var paddingRight = parseFloat(styles.paddingRight);
      var paddingTop = parseFloat(styles.paddingTop);
      var paddingBottom = parseFloat(styles.paddingBottom);
      return {
        width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight,
        height: height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom
      };
    }
    /**
     * 动态添加元素
     */

  }, {
    key: "addElement",
    value: function addElement(ele) {
      var options = _objectSpread2({}, ele);

      delete options.id;
      delete options.canvas;
      delete options.eleIds;
      this.data.push(options); // 补全实例属性

      var hideCtx = this.createHideCtx();
      ele.index = this.nodes.length;
      ele.hideCtx = hideCtx;
      ele.ctx = this.ctx, ele.options = options; // console.log(ele, '==ele===')

      this.nodes.push(ele);
      this.draw();
    }
    /**
     * 自定义绘制
     * @param {*} options
     */

  }, {
    key: "customFont",
    value:
    /**
     * getImageData 无法获取到文本颜色，绘制矩形单独处理
     * @param {*} options 
     * @param {*} hideCtx 
     * @param {*} ele 
     */
    function customFont(options, hideCtx, ele) {
      var _this$getTextInfo = this.getTextInfo(options),
          width = _this$getTextInfo.width,
          height = _this$getTextInfo.height;

      var _idToRgba3 = idToRgba(ele.getId()),
          _idToRgba4 = _slicedToArray(_idToRgba3, 4),
          r = _idToRgba4[0],
          g = _idToRgba4[1],
          b = _idToRgba4[2],
          a = _idToRgba4[3];

      options.width = width;
      options.height = height;
      /**
       * textBaseline: bottom -  左上角为 x,y
       * textBaseline: top - 左上角为 x, y + height
       */

      var offset = options.font.textBaseline === 'top' ? height : 0; // 绘制画布

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.textBaseline = options.font.textBaseline || 'bottom';
      this.ctx.font = options.font.font;
      this.ctx.fillStyle = options.font.color; // this.ctx.fillStyle = `rgba(${0}, ${0}, ${0}, ${.1})`;
      // this.ctx.rect(options.x, options.y + offset, options.width, options.height);
      // this.ctx.fill();

      if (options.font.strokeText) {
        this.ctx.strokeText(options.font.value, options.x, options.y + height);
      } else {
        this.ctx.fillText(options.font.value, options.x, options.y + height);
      }

      this.ctx.restore(); // 绘制影子画布

      hideCtx.save();
      hideCtx.beginPath();
      hideCtx.fillStyle = "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(a, ")");
      hideCtx.rect(options.x, options.y + offset, options.width, options.height);
      hideCtx.fill();
      hideCtx.restore();
    }
  }]);

  return EventCanvas;
}(Event);

exports.Circle = Circle;
exports.EventCanvas = EventCanvas;
exports.Rect = Rect;
