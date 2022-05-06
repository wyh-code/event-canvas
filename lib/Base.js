import { creatId } from './utils.js';

export default class Base {
  /**
   * eleId: 已有元素的id,
   * ctx: 画布绘制上下文,
   * hideCtx: 影子画布上下文 
   * options: 元素节点信息,
   * index: 元素绘制顺序下标
   * @param {*} props 
   */
  constructor(props){
    Object.assign(this, props)
    // 创建id
    this.id = this.creatId();
  }

  creatId(){
    let id = creatId();
    while(this.eleId[id]){
      this.id = creatId();
    }
    this.eleId[id] = this;
    return id;
  }

  getId(){
    return this.id;
  }
}
