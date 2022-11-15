

function SwipeCorousel() {
  Carousel.apply(this, arguments);
};

SwipeCorousel.prototype = Object.create(Carousel.prototype);
SwipeCorousel.prototype.constructor = SwipeCorousel;

SwipeCorousel.prototype._swipeStart = function(e) {

  if (e instanceof MouseEvent) {
    this.startPosX = e.pageX
    return;
  }

  if (e instanceof TouchEvent) {
    this.startPosX = e.changedTouches[0].pageX;
  }

};

SwipeCorousel.prototype._swipeEnd = function(e) {

  if (e instanceof MouseEvent) {
    this.endPosX = e.pageX;

  } else if (e instanceof TouchEvent) {
    this.endPosX = e.changedTouches[0].pageX;
  }

  if (this.endPosX > -100) this.prev();
  if (this.endPosX < 100) this.next();
};



SwipeCorousel.prototype._initListener = function() {
Carousel.prototype._initListener.apply(this);
this.container.addEventListener('touchstart', this._swipeStart.bind(this));
this.container.addEventListener('mousedoun', this._swipeStart.bind(this));
this.container.addEventListener('touchend', this._swipeEnd.bind(this));
this.container.addEventListener('mouseup', this._swipeEnd.bind(this));
};
