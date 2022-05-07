import { creatId } from './utils.js';

export default class Base {
  // 绘制上下文实例
  context = null
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
    while(Base.context.eleId[id]){
      this.id = creatId();
    }
    Base.context[id] = this;
    return id;
  }

  getId(){
    return this.id;
  }
}
