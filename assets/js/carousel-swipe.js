import Carousel from "./carousel.js";
class SwipeCorousel extends Carousel {
constructor(...args) {
  super(...args);
  this.slidesContainer = this.slideItems[0].parentElement;
}

_initListener() {
  super._initListener();
  this.container.addEventListener('touchstart', this._swipeStart.bind(this));
  this.slidesContainer.addEventListener('mousedoun', this._swipeStart.bind(this));
  this.container.addEventListener('touchend', this._swipeEnd.bind(this));
  this.slidesContainer.addEventListener('mouseup', this._swipeEnd.bind(this));
  };
  

_swipeStart(e) {

  if (e instanceof MouseEvent) {
    this.startPosX = e.pageX
    return;
  }

  if (e instanceof TouchEvent) {
    this.startPosX = e.changedTouches[0].pageX;
  }

};

_swipeEnd(e) {

  if (e instanceof MouseEvent) {
    this.endPosX = e.pageX;

  } else if (e instanceof TouchEvent) {
    this.endPosX = e.changedTouches[0].pageX;
  }

  if (this.endPosX - this.startPosX > -100) this.prev();
  if (this.endPosX - this.startPosX < 100) this.next();
};


}
 
export default SwipeCorousel;