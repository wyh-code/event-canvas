import Base from "./Base.js";
import { idToRgba } from './utils.js';

export default class Circle extends Base {
  constructor(props){
    super(props)
  }

  draw(){
    const { x, y, radius, fillColor, strokeColor,  strokeWidth=1 } = this.options;
    const { ctx, hideCtx } = this;

    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = fillColor
    ctx.strokeColr = strokeColor || fillColor,
    ctx.linWidth = strokeWidth
    ctx.arc(x,y,radius, 0 , Math.PI * 2)
    ctx.fill()
    ctx.restore()

    // 离屏绘制
    const [r, g , b , a] = idToRgba(this.getId())
    hideCtx.save();
    hideCtx.beginPath();
    hideCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
    hideCtx.lineWidth = strokeWidth;
    hideCtx.arc(x, y, radius, 0, Math.PI * 2);
    hideCtx.fill();
    hideCtx.restore();
  }
}