import Event from "./Event.js";
import Rect from "./Rect.js";
import Base from "./Base.js";
import Circle from "./Circle.js";
import { rgbaToId, idToRgba, EventNames } from './utils.js';

export default class EventCanvas extends Event {
  /**
   * canvas 画布
   * data 元素数据
   * sort 重叠时事件触发顺序：1-由上到下，0-由下到上
   * @param {*} options 
   */
  constructor(options){
    super(options);
    if(!options.canvas) {
      console.error('canvas 为必穿参数');
      return
    };

    this.data = options.data || [];
    this.sort = options.sort === 0 ? 0 : 1;
    this.canvas = options.canvas;

    // 画布上下文
    this.ctx = this.canvas.getContext('2d');

    // 清晰度适配
    this.dpr()

    // 存放所有绘制的元素id
    this.eleId = {};

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
  addEventListener(){
    Object.keys(EventNames).forEach(eventName => {
      this.canvas.addEventListener(eventName, this.eventHandler(eventName))
    })
  }

  /**
   * 事件处理函数
   * @param {*} eventName 事件名称
   */
  eventHandler(eventName){
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
        clientY
      }
      // 如果元素不在上次收集的里边，触发 mouseenter 事件
      nodes.forEach(node => {
        if(!this.eventNodes.has(node)){
          node.options.mouseenter && node.options.mouseenter(event, Object.assign({}, options, node.options))

          // 如果有拖动元素，且新增元素下标大于拖动下标，说明新增元素在拖动元素上方，则终止拖动事件
          if(this.move && node.index > this.move.index){
            this.move = null;
            this.isMove = false;
          }
        }
      })
      // 如果上次已有的元素不在本次收集的元素内，触发 mouseleave 事件
      let newSet = new Set(nodes);
      this.eventNodes.forEach(node => {
        if(!newSet.has(node)){
          node.options.mouseleave && node.options.mouseleave(event, Object.assign({}, options, node.options))
        }
      })
      // 更新记录值
      this.eventNodes = newSet;

      // 判断鼠标点击的最上方元素是否可以拖动
      this.move = nodes[nodes.length - 1] ?.options.drag ? nodes[nodes.length - 1] : null;
      
      // 设置事件触发顺序
      if(this.sort){
        nodes.reverse()
      }

      // 触发元素事件
      let stop;
      for(let node of nodes){
        if(node.options[eventName]){
          node.options[eventName](event, Object.assign({}, options, node.options))
        }

        if(node.options.stop === true || node.options.stop === eventName){
          stop = true;
          break;
        }
      }

      // canvas 层面事件派发
      this.dispatchEvent({ x, y, stop, eventName, event, nodes })
    }
  }

  dispatchEvent({ x, y, stop, eventName, event, nodes }){
    if(eventName === EventNames.mousedown){
      this.downx = x;
      this.downy = y;
      this.isMove = true
      if(this.move){
        this.move.options.startX = this.move.options.x;
        this.move.options.startY = this.move.options.y;
      }
    }

    if(eventName === EventNames.mouseup){
      this.upx = x;
      this.upy = y;
      this.isMove = false;
      this.move = null
    }

    if(eventName === EventNames.mousemove){
      const ele = this.move;
      if(ele && this.isMove){
        const offsetX = this.downx -  ele.options.startX;
        const offsetY = this.downy - ele.options.startY;

        ele.options.x = x - offsetX;
        ele.options.y = y - offsetY;
        ele.hideCtx.clearRect(0,0,this.canvas.width, this.canvas.height)
        this.draw();
        ele.options.drag && ele.options.drag(event, ele.options)
      }
    }

    // 触发 canvas 事件
    if(!stop){
      this.emit(eventName, { event, nodes:nodes.map(node => node.options) })
    }
  }

  getNodes({ x, y }){
    return this.nodes.filter(ele => {
      const data = ele.hideCtx.getImageData(x * this.dpr, y * this.dpr, 1, 1).data;

      // 如果影子画布获取到的颜色与元素id相等，则鼠标在该元素上方
      return rgbaToId(data) === ele.id
    })
  }

  /**
   * 初始化元素节点
   */
  initNodes(){
    this.nodes = this.data.map((item, index) => {
      const hideCtx = this.createHideCtx(this.canvas);
      if(item.type === 'circle'){
        return new Circle({
          eleId: this.eleId, 
          ctx: this.ctx,
          hideCtx, 
          options: item,
          index
        })
      }

      if(item.type === 'rect'){
        return new Rect({
          eleId: this.eleId, 
          ctx: this.ctx,
          hideCtx, 
          options: item,
          index
        })
      }
    })

    this.size = this.nodes.length;
  }

  /**
   * 创建影子画布
   * @returns 
   */
  createHideCtx(){
    const width = canvas.width;
    const height = canvas.height;
    const hideCanvas = new OffscreenCanvas(width, height);
    const hideCtx = hideCanvas.getContext('2d');
    hideCtx.scale(this.dpr, this.dpr); // 根据dpr 缩放画布
    return hideCtx;
  }

  clear(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw(){
    this.clear()
    this.nodes.map(ele => ele.draw())
  }

  dpr(){
    const dpr = window.devicePixelRatio;
    if(!canvas.style.width || !canvas.style.height){
      console.error('请设置 canvas 宽高：<canvas style="width:width; height:height"></canvas>')
      return;
    }
    canvas.width = parseInt(canvas.style.width) * dpr
    canvas.height = parseInt(canvas.style.height) * dpr
    this.ctx.scale(dpr, dpr); // 根据dpr 缩放画布
    this.dpr = dpr;
  }

  /**
   * 动态添加元素
   */
  addElement(ele){
    const options = { ...ele }
    delete options.id;
    delete options.canvas;
    delete options.eleId;

    this.data.push(options)

    // 补全实例属性
    const hideCtx = this.createHideCtx(this.canvas);
    ele.index = this.nodes.length;
    ele.hideCtx = hideCtx;
    ele.ctx = this.ctx,
    ele.options = options;
    // console.log(ele, '==ele===')
    this.nodes.push(ele);

    this.draw()
  }

  /**
   * 自定义绘制
   * @param {*} options 
   */
  custom = (options={}) => {
    this.data.push(options)

    const hideCtx = this.createHideCtx(this.canvas);
    let ele = new Base({
      eleId: this.eleId, 
      ctx: this.ctx,
      hideCtx, 
      options,
      index: this.nodes.length,
      draw: () => {
        // 重写 draw 添加影子画布绘制
        this.ctx.save();
        options.draw(this.ctx);
        this.ctx.restore();
  
        // 绘制离屏
        const [r, g , b , a] = idToRgba(ele.getId())
        hideCtx.save();
        options.draw(hideCtx);
        
        hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        hideCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        hideCtx.stroke()
        if(options.fill){
          hideCtx.fill()
        }
        hideCtx.restore();
      }
    })
    this.nodes.push(ele);

    this.draw()
  }
}