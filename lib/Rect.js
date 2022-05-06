import Base from "./Base.js";
import { idToRgba } from './utils.js';

export default class Rect extends Base {
  constructor(props){
    super(props)
  }
  draw(){
    const { x, y, width, height, fillColor, strokeColor, strokeWidth=1 } = this.options;
    const { ctx, hideCtx } = this;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = strokeColor || fillColor;
    ctx.lineWidth = strokeWidth;
    ctx.fillStyle = fillColor;
    ctx.rect(x, y, width, height);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 绘制隐藏屏幕
    const [ r, g, b, a ] = idToRgba(this.getId());

    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.rect(x, y, width, height);
    hideCtx.fill();
    hideCtx.stroke();
    hideCtx.restore();
  }
}