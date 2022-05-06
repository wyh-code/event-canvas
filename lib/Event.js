export default class Event{
  constructor(){
    this.listeners = {}
  }

  on(eventName, fn){
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn)
  }

  once(eventName, fn){
    const once = () => {
      fn();
      this.off(eventName, once);
    }
    once.l = fn;
    this.on(eventName, once);
  }

  off(eventName, fn){
    if(!fn){
      this.listeners[eventName] = [];
    }else{
      this.listeners[eventName] = this.listeners[eventName].filter(_fn => (fn !== _fn && fn !== _fn.l))
    }
  }

  emit(eventName, args){
    // console.log(args, '==args==')
    this.listeners[eventName]?.forEach(fn => fn(args.event, args.nodes))
  }
}
