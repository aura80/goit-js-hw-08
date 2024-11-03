import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeElement = document.querySelector('#vimeo-player');
const player = new Player(iframeElement);

console.log(player);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// retrieve time from the local storage
const timeFromLS = localStorage.getItem(LOCAL_STORAGE_KEY);

// resumes playing from where it left off last time
if (timeFromLS) {
  // time from the last stop becomes the current time + error handling
  player.setCurrentTime(timeFromLS).catch(error => {
    alert('Current time not set!');
    console.error('Current time not set: ', error);
  });
}

// update the current time to local storage at most once per second
// event.seconds captures the exact time the video is
player.on(
  'timeupdate',
  throttle(
    event => localStorage.setItem(LOCAL_STORAGE_KEY, event.seconds),
    1000
  ),
  console.log('Current time: ', localStorage.getItem(LOCAL_STORAGE_KEY))
);

// checks
player.on('play', () => {
  console.log('Video playing!');
});

player.on('pause', () => {
  console.log('Video paused!');
  console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
});

player.on('ended', () => {
  console.log('Video ended!');
  console.log(localStorage.getItem(LOCAL_STORAGE_KEY));
});
