class Carousel {
  constructor(p) {
    const settings = { ...{ containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true }, ...p }
    this.container = document.querySelector(settings.containerID);
    this.slides = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlayng = settings.isPlaying;
  }

  _initProps() {
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGTH_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-circle-pause"></i>';
    this.FA_PLAY = '<i class="fas fa-circle-play"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';
    this.currentSlide = 0;
  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<div class="control control-pause" id="btn-pause">${this.isPlayng ? this.FA_PAUSE : this.FA_PLAY}</div>`;
    const PREV = `<div class="control control-prev" id="btn-prev">${this.FA_PREV}</div>`;
    const NEXT = `<div class="control control-next" id="btn-next">${this.FA_NEXT}</div>`;

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;
    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#btn-pause');
    this.prevBtn = this.container.querySelector('#btn-prev');
    this.nextBtn = this.container.querySelector('#btn-next');
  }

  _initIndicators() {
    const indicators = document.createElement('div');
    for (let i = 0; i < this.SLIDES_COUNT; i++) {
      const indicator = document.createElement('div');
      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);
    }

    indicators.setAttribute('class', 'indicators');
    this.container.append(indicators)
    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.slides.length) % this.SLIDES_COUNT;
    this.indicators[this.currentSlide].classList.toggle('active');
    this.slides[this.currentSlide].classList.toggle('active');
  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1)
  }

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  }

  _indicate(e) {
    const target = e.target;
    if (target && target.classList.contains('indicator')) {
      this.pause();
      this._gotoNth(+target.dataset.slideTo);
    }
  }

  _pressKey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGTH_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();
  }

  _tick(flag = true) {
    if (!flag) return;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  }

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlayng = false;
    clearInterval(this.timerID);
  }
  
  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlayng = true;
    this._tick()
  }

  pausePlay() {
    this.isPlayng ? this.pause() : this.play();
  }

  prev() {
    this._gotoPrev();
    this.pause();
  }

  next() {
    this._gotoNext();
    this.pause();
  }

  init() {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick(this.isPlayng);
  }
}

export default Carousel 