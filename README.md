## event-canvas 是一款 canvas 事件系统工具库，解决了 canvas 中绘制元素的事件监听问题。
### 特点：
**采用原生 js 编写，各类前端框架均可使用**
**用法简单灵活**

**简单用法**
```js
/**
 * canvas: 画布（必传）
 * sort: 重叠时事件触发顺序：1-由上到下，0-由下到上
 * data: 绘制元素数据 options[]
 *  - options 事件触发时，回调参数
 *  - options.x   起始x坐标（drag属性存在时，x值为必传项）
 *  - options.y   起始y坐标（drag属性存在时，y值为必传项）
 *  - options.click 监听事件回调函数（现支持：click，mousedown，mousemove，mouseup，mouseenter，mouseleave）
 *  - options.stop  是否阻止事件继续向后传递（为 true 时，阻止所有事件，为事件名时，阻止相对应事件）
 *  - options.drag  元素拖动的回调函数（拥有此属性时，该元素可拖动）
 *  - options.fillColor  填充色
 * */
import { EventCanvas } from 'event-canvas';

const eventCanvas = new EventCanvas({
  canvas: document.getElementById('canvas'),
  sort: 1,
  data: [
    {
      name: '绿圆',
      x: 100,
      y: 100,
      radius: 50,
      fillColor: 'green',
      type: 'circle',
      stop: 'click', 
      click: (event, options) => {},
      drag: (event, options) => {},
    }
  ]
})
```

**canvas 事件监听**
```js
/**
 * event  事件对象
 * nodes  事件相关元素
 * */
eventCanvas.on('click', (event, nodes) => {
  console.log(event, nodes)
})
```
**终止拖拽**
```js
// 通过实例的 isMove 属性终止拖拽
eventCanvas.isMove = false;
```
**动态添加元素**
```js
/**
 * event  事件对象
 * nodes  事件相关元素
 * 目前只提供了基础的圆（Circle）和矩形（Rect）
 * */
import { Circle } from 'event-canvas';
const button = document.getElementById('button');
button.onclick = function(){
  const circle = new Circle({
    name: '黄圆',
    x: 300,
    y: 500,
    radius: 50,
    fillColor: 'yellow',
    drag: (event, options) => {
      console.log(options)
    },
    click: (event, options) => {
      console.log(options)
    }
  })
  eventCanvas.addElement(circle)
}
```

目前系统本身只提供了基础的圆（Circle）和矩形（Rect），由于每个人的需求都不尽相同，所以提供了自定义绘制。      
**自定义绘制**
```js
/**
 * x  起始绘制x轴坐标（有 draw 属性时，必传）
 * y  起始绘制y轴坐标（有 draw 属性时，必传）
 * fill 是否填充路径区域
 * draw 自定义绘制函数
 *  - draw 函数会进行二次封装，所以此函数内不必使用 ctx.save、ctx.restore()
 * */
const custom = document.getElementById('customButton');
custom.onclick = () =>{
  const options = {
    name: 'custom',
    x: 300,
    y: 350,
    fill: false,
    click: (event, options) => {
      console.log(options, '==custom-click==')
    },
    drag(event, options){
      console.log('custom-drag-options--', options)
    },
    draw: (ctx) => {
      ctx.beginPath()
      ctx.moveTo(options.x, options.y);
      ctx.lineTo(options.x, options.y + 150);
      ctx.lineTo(options.x + 150, options.y + 150);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 10;
      ctx.stroke()
    }
  }
  eventCanvas.custom(options)
}
```
**自定义绘制文本**        
由于 <code>getImageData</code> 无法获取文本颜色，所以自定义绘制文本单独处理。
```js
/**
 * font 文本属性
 *  - font：文本样式
 *  - color：文本颜色
 *  - value：文本内容
 *  - strokeText：是否使用 strokeText（默认 false）
 *  - textBaseline：文本绘制基线（只支持 top/bottom，默认 bottom）
 * 
 ************************************************************
 *  当存在 font 属性时，只会绘制文本信息，自定义 draw 函数不再生效  *
 ************************************************************
 * */
customText.onclick = function(){
  const options = {
    name: 'custom',
    x: 100,
    y: 100,
    font: {
      font: '100px "Microsoft YaHei"',
      color: 'red',
      value: '自定义文本绘制',
      strokeText: true,
      textBaseline: 'top'
    },
    drag(event, options){
      console.log('custom-drag-options--', options)
    },
    click(event, options){
      console.log('自定义文本绘制 click', options)
    }
  }
  eventCanvas.custom(options)
}
```        

**注意**
组件多次渲染会导致事件重复挂载，可使用相关方法阻止      
**react 示例**
```js
  import { useRef } from 'react';
  // *** TODO ***
  if(ref.current) return;
  ref.current = true;
  const eventCanvas = new EventCanvas()
```