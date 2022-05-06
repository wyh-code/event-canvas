export const creatId = () => [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255), 255].join('-');

export const idToRgba = (id) => id.split('-');

export const rgbaToId = (rgba) => rgba.toString().split(',').join('-');

export const EventNames = {
  click: 'click',
  mousedown: 'mousedown',
  mousemove: 'mousemove',
  mouseup: 'mouseup',
  mouseenter: 'mouseenter',
  mouseleave: 'mouseleave'
};