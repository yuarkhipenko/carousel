import SwipeCorousel from "./carousel-swipe.js";

const slider = new SwipeCorousel({
  containerID:'#mycarousel', 
  slideID:'.item', 
  interval: 2000,
  isPlaying: false
});

slider.init();
