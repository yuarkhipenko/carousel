class Carousel {
  constructor() {

    const settings = { ...{ containerID: '#carousel',slideID: '.item', interval: 2000, isPlaying: true }};

    this.container = document.querySelector(settings.containerID);
    this.slideItems = this.container.querySelectorAll(settings.slideID);
    this.interval = settings.interval;
    this.isPlayng = settings.isPlaying;
    
  }
  
  _initProps() {
    this.currentSlide = 0;

    this.SLIDS_COUNT = this.slideItems.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
    this.FA_PAUSE = '<i class="fas fa-pause-circle"></i>';
    this.FA_PLAY = '<i class="fas fa-play-circle"></i>';
    this.FA_PREV = '<i class="fas fa-angle-left"></i>';
    this.FA_NEXT = '<i class="fas fa-angle-right"></i>';

  }

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = `<div class="control control-pause" id="btn-pause">${this.isPlayng ? this.FA_PAUSE : this.FA_PLAY }</div>`;
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

    for (let i = 0; i < this.SLIDS_COUNT; i++) {
      const indicator = document.createElement('div');

      indicator.setAttribute('class', i !== 0 ? 'indicator' : 'indicator active');
      indicator.dataset.slideTo = `${i}`;
      indicators.append(indicator);

    }



    indicators.setAttribute('class', 'indicators');

    this.container.append(indicators);


    this.indicatorsContainer = this.container.querySelector('.indicators');
    this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  }

  _initListener() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));

    document.addEventListener('keydown', this._presskey.bind(this));

  }

  _gotoNth(n) {
    this.slideItems[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDS_COUNT) % this.SLIDS_COUNT;
    this.indicators[this.currentSlide].classList.toggle('active');
    this.slideItems[this.currentSlide].classList.toggle('active');

  }

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
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

  _presskey(e) {
    if (e.code === this.CODE_LEFT_ARROW) this.prev();
    if (e.code === this.CODE_RIGHT_ARROW) this.next();
    if (e.code === this.CODE_SPACE) this.pausePlay();

  }

  _tick(flag = true) {
    if(!flag) return
    this.timerID = setInterval(() => this._gotoNext(this), this.interval); 
  }

 


  pause() {
    this.pauseBtn.innerHTML = this.FA_PLAY;
    this.isPlayng = false;
    clearInterval(this.timerID);
  }

  play() {
    this.pauseBtn.innerHTML = this.FA_PAUSE;
    this.isPlayng = true;
    this._tick();
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
    this._initListener();
    this._tick(this.isPlayng);
  }

}

export default Carousel;


