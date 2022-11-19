import SwipeCorousel from './carousel-swipe.js'

const slider = new SwipeCorousel({
  containerID: 'carousel',
  slideID: '.slide',
  interval: 2000,
  isPlaying: false
});

slider.init();

 