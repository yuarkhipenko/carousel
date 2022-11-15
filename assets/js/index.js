function Carousel() {

  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = document.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.pauseBtn = document.querySelector('#btn-pause');
  this.prevBtn = document.querySelector('#btn-prev');
  this.nextBtn = document.querySelector('#btn-next');

};

Carousel.prototype = {

  _initProps() {
    this.SLIDS_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';

    this.currentSlide = 0;
    this.isPlayng = true;
    this.timerID = null;
    this.startPosX = null;
    this.endPosX = null;
    this.interval = 5000;
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDS_COUNT) % this.SLIDS_COUNT;
    this.indicators[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');

  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },


  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);

  },

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this.pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  },

  _presskey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();

  },

  _swipeStart(e) {

    if (e instanceof MouseEvent) {
      this.startPosX = e.pageX
      return;
    }

    if (e instanceof TouchEvent) {
      this.startPosX = e.changedTouches[0].pageX;
    }

  },

  _swipeEnd(e) {

    if (e instanceof MouseEvent) {
      this.endPosX = e.pageX;

    } else if (e instanceof TouchEvent) {
      this.endPosX = e.changedTouches[0].pageX;
    }

    if (this.endPosX > -100) this.prev();
    if (this.endPosX < 100) this.next();
  },

  _initListener() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    this.container.addEventListener('touchstart', this._swipeStart.bind(this));
    this.container.addEventListener('mousedoun', this._swipeStart.bind(this));
    this.container.addEventListener('touchend', this._swipeEnd.bind(this));
    this.container.addEventListener('mouseup', this._swipeEnd.bind(this));
    document.addEventListener('keydown', this._presskey.bind(this));

  },
  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlayng = false;
    clearInterval(this.timerID);
  },

  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlayng = true;
    this.timerID = setInterval(() => this._gotoNext(this), this.interval);
  },

  pausePlay() {
    this.isPlayng ? this.pause() : this.play();
  },

  prev() {
    this._gotoPrev();
    this.pause();
  },

  next() {
    this._gotoNext();
    this.pause();
  },
  init() {
    this._initProps();
    this._initListener();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },

};

Carousel.prototype.constructor = Carousel;
const slider = new Carousel();

slider.init();

 