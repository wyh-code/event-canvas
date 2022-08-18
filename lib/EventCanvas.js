import Event from './Event.js';
import Rect from './Rect.js';
import Base from './Base.js';
import Circle from './Circle.js';
import { rgbaToId, idToRgba, EventNames } from './utils.js';

export default class EventCanvas extends Event {
  /**
   * canvas 画布
   * data 元素数据
   * sort 重叠时事件触发顺序：1-由上到下，0-由下到上
   * @param {*} options
   */
  constructor(options) {
    super(options);
    if (!options.canvas) {
      console.error('canvas 为必传参数');
      return;
    }
    // 传递绘制实例
    Base.context = this;

    this.data = options.data || [];
    this.sort = options.sort === 0 ? 0 : 1;
    this.canvas = options.canvas;

    // 画布上下文
    this.ctx = this.canvas.getContext('2d');

    // 清晰度适配
    this.devicePixelRatio();

    // 存放所有绘制的元素id
    this.eleIds = {};

    // 存放可拖动元素
    this.move = null;
    this.isMove = false;

    // 收集处于事件中的元素
    this.eventNodes = new Set();

    // 初始化数据
    this.initNodes();

    // 绘制元素
    this.draw();

    // 事件注册
    this.addEventListener();
  }

  /**
   * 事件注册
   */
  addEventListener() {
    Object.keys(EventNames).forEach((eventName) => {
      this.canvas.addEventListener(eventName, this.eventHandler(eventName));
    });
  }

  /**
   * 事件处理函数
   * @param {*} eventName 事件名称
   */
  eventHandler(eventName) {
    return (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      const clientX = event.clientX;
      const clientY = event.clientY;

      // console.log(clientX, clientY, x, y)
      // 获取元素
      const nodes = this.getNodes({ x, y });
      // console.log(nodes, '==nodes==')
      // 组装事件回调参数
      const options = {
        eventName,
        ex: x,
        ey: y,
        clientX,
        clientY,
      };
      // 如果元素不在上次收集的里边，触发 mouseenter 事件
      nodes.forEach((node) => {
        if (!this.eventNodes.has(node)) {
          node.options.mouseenter &&
            node.options.mouseenter(
              event,
              Object.assign({}, options, node.options),
            );

          // 如果有拖动元素，且新增元素下标大于拖动下标，说明新增元素在拖动元素上方，则终止拖动事件
          if (this.move && node.index > this.move.index) {
            this.move = null;
            this.isMove = false;
          }
        }
      });
      // 如果上次已有的元素不在本次收集的元素内，触发 mouseleave 事件
      let newSet = new Set(nodes);
      this.eventNodes.forEach((node) => {
        if (!newSet.has(node)) {
          node.options.mouseleave &&
            node.options.mouseleave(
              event,
              Object.assign({}, options, node.options),
            );
        }
      });
      /**
       * 鼠标拖拽可移动元素后，移动过快会产生以下情况：
       *  - 脱离移动元素后，落在了另一个可移动元素上，此时 isMove: true, this.move: 新的移动元素。干扰绘制，出现错乱
       * 
       * 如果有移动元素，且该元素在 eventNodes 中，不在 newSet 中，则认为脱离移动元素，终止移动
       */
      if(this.eventNodes.has(this.move) && !newSet.has(this.move)){
        this.isMove = false;
      }

      // 更新记录值
      this.eventNodes = newSet;

      // 判断鼠标点击的最上方元素是否可以拖动
      this.move = nodes[nodes.length - 1]?.options.drag
        ? nodes[nodes.length - 1]
        : null;

      // 设置事件触发顺序
      if (this.sort) {
        nodes.reverse();
      }

      // 触发元素事件
      let stop;
      for (let node of nodes) {
        if (node.options[eventName]) {
          node.options[eventName](
            event,
            Object.assign({}, options, node.options),
          );
        }

        if (node.options.stop === true || node.options.stop === eventName) {
          stop = true;
          break;
        }
      }

      // canvas 层面事件派发
      this.dispatchEvent({ x, y, stop, eventName, event, nodes });
    };
  }

  dispatchEvent({ x, y, stop, eventName, event, nodes }) {
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
      const ele = this.move;
      if (ele && this.isMove) {
        const offsetX = this.downx - ele.options.startX;
        const offsetY = this.downy - ele.options.startY;

        if (
          (ele.options.x === undefined || ele.options.y === undefined) &&
          ele.options.drag
        ) {
          console.error(`${JSON.stringify(ele.options)}
          drag 函数需要传递起始位置属性信息（x，y）`);
          return;
        }

        ele.options.x = x - offsetX;
        ele.options.y = y - offsetY;
        ele.hideCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // ele.hideCtx.clearRect(0, 0, 2000, 1200)
        console.log(ele.hideCtx.canvas, 0, 0, this.canvas.width, this.canvas.height)
        this.draw();
        ele.options.drag && ele.options.drag(event, ele.options);
      }
    }

    // 触发 canvas 事件
    if (!stop) {
      this.emit(eventName, { event, nodes: nodes.map((node) => node.options) });
    }
  }

  getNodes({ x, y }) {
    return this.nodes.filter((ele) => {
      const data = ele.hideCtx.getImageData(
        x * this.dpr,
        y * this.dpr,
        1,
        1,
      ).data;
      // 如果影子画布获取到的颜色与元素id相等，则鼠标在该元素上方
      return rgbaToId(data) === ele.id;
    });
  }

  /**
   * 初始化元素节点
   */
  initNodes() {
    this.nodes = this.data.map((item, index) => {
      const hideCtx = this.createHideCtx();
      if (item.type === 'circle') {
        return new Circle({
          ctx: this.ctx,
          hideCtx,
          options: item,
          index,
        });
      }

      if (item.type === 'rect') {
        return new Rect({
          ctx: this.ctx,
          hideCtx,
          options: item,
          index,
        });
      }
    });

    this.size = this.nodes.length;
  }

  /**
   * 创建影子画布
   * @returns
   */
  createHideCtx() {
    const canvas = this.canvas;
    const width = canvas.width;
    const height = canvas.height;

    /**
     * 兼容 OffscreenCanvas
     */
    let hideCanvas = null;
    if (OffscreenCanvas) {
      hideCanvas = new OffscreenCanvas(width, height);
    } else {
      hideCanvas = document.createElement('canvas');
      hideCanvas.width = width;
      hideCanvas.height = height;
    }

    const hideCtx = hideCanvas.getContext('2d');
    hideCtx.scale(this.dpr, this.dpr); // 根据dpr 缩放画布
    return hideCtx;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    this.clear();
    this.nodes.map((ele) => ele.draw());
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

  devicePixelRatio() {
    const canvas = this.canvas;
    const dpr = window.devicePixelRatio;
    const { width, height } = this.getStyle()
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    this.ctx.scale(dpr, dpr); // 根据dpr 缩放画布
    this.dpr = dpr;
  }

  /**
   * 根据父节点确定canvas宽高
   * @returns 
   */
  getStyle(){
    const parentNode = this.canvas.parentNode;
    const styles = getComputedStyle(parentNode);
    const width =  parseFloat(styles.width);
    const height =  parseFloat(styles.height);
    const borderLeftWidth =  parseFloat(styles.borderLeftWidth);
    const borderRightWidth =  parseFloat(styles.borderRightWidth);
    const borderTopWidth =  parseFloat(styles.borderTopWidth);
    const borderBottomWidth =  parseFloat(styles.borderBottomWidth);
    const paddingLeft =  parseFloat(styles.paddingLeft);
    const paddingRight =  parseFloat(styles.paddingRight);
    const paddingTop =  parseFloat(styles.paddingTop);
    const paddingBottom =  parseFloat(styles.paddingBottom);

    return {
      width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight,
      height: height - borderTopWidth - borderBottomWidth - paddingTop - paddingBottom,
    }
  }

  /**
   * 动态添加元素
   */
  addElement(ele) {
    const options = { ...ele };
    delete options.id;
    delete options.canvas;
    delete options.eleIds;

    this.data.push(options);

    // 补全实例属性
    const hideCtx = this.createHideCtx();
    ele.index = this.nodes.length;
    ele.hideCtx = hideCtx;
    (ele.ctx = this.ctx), (ele.options = options);
    // console.log(ele, '==ele===')
    this.nodes.push(ele);

    this.draw();
  }

  /**
   * 自定义绘制
   * @param {*} options
   */
  custom = (options = {}) => {
    if ((options.x === undefined || options.y === undefined) && options.drag) {
      console.error(`${JSON.stringify(options)}
      drag 函数需要传递起始位置属性信息（x，y）`);
    }
    this.data.push(options);
    const hideCtx = this.createHideCtx();
    let ele = new Base({
      ctx: this.ctx,
      hideCtx,
      options,
      index: this.nodes.length,
      // draw: options.font ? this.customFont(options, hideCtx, ele) : this.customDraw(options, hideCtx, ele)
      draw: options.font ? 
      () => this.customFont(options, hideCtx, ele)
      : () => this.customDraw(options, hideCtx, ele),
    });
    this.nodes.push(ele);
    this.draw();
  };

  /**
   * getImageData 无法获取到文本颜色，绘制矩形单独处理
   * @param {*} options 
   * @param {*} hideCtx 
   * @param {*} ele 
   */
  customFont(options, hideCtx, ele) {
    const { width, height } = this.getTextInfo(options);
    const [r, g, b, a] = idToRgba(ele.getId());
    options.width = width;
    options.height = height;

    /**
     * textBaseline: bottom -  左上角为 x,y
     * textBaseline: top - 左上角为 x, y + height
     */
    const offset = options.font.textBaseline === 'top' ? height : 0;
    // 绘制画布
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.textBaseline = options.font.textBaseline || 'bottom';
    this.ctx.font = options.font.font;
    this.ctx.fillStyle = options.font.color;

    // this.ctx.fillStyle = `rgba(${0}, ${0}, ${0}, ${.1})`;
    // this.ctx.rect(options.x, options.y + offset, options.width, options.height);
    // this.ctx.fill();

    if(options.font.strokeText){
      this.ctx.strokeText(options.font.value, options.x, options.y+height);
    }else{
      this.ctx.fillText(options.font.value, options.x, options.y+height);
    }
    this.ctx.restore();

    // 绘制影子画布
    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.rect(options.x, options.y + offset, options.width, options.height);
    hideCtx.fill();
    hideCtx.restore();
  }

  getTextInfo = (options) => {
    const span = document.createElement('span');
    span.innerText = options.font.value;
    span.style.font = options.font.font || '26px "Microsoft YaHei"';
    span.style.position = 'fixed';
    span.style.lineHeight = 1;
    span.style.top = options.y + 'px';
    span.style.left = options.x + 'px';
    span.style.whiteSpace = 'nowrap';
    span.style.zIndex = 2;

    document.body.appendChild(span);
    let width = span.clientWidth;
    let height = span.clientHeight;
    span.remove()
   
    return {
      width,
      height
    }
  }

  customDraw = (options, hideCtx, ele) => {
    // 重写 draw 添加影子画布绘制
    this.ctx.save();
    options.draw(this.ctx);
    this.ctx.restore();

    // 绘制离屏
    const [r, g, b, a] = idToRgba(ele.getId());
    hideCtx.save();
    options.draw(hideCtx);
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.stroke();
    if (options.fill) {
      hideCtx.fill();
    }
    hideCtx.restore();
  };
}
