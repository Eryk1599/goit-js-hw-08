import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

try {
  player.setCurrentTime(
    JSON.parse(localStorage.getItem('videoplayer-current-time'))
  );
} catch (error) {
  switch (error.name) {
    case 'RangeError':
      'the time was less than 0 or greater than the video’s duration';
      break;

    default:
      'some other error occurred';
      break;
  }
}

const setTime = currentTime => {
  localStorage.setItem('videoplayer-current-time', currentTime.seconds);
};

player.on('timeupdate', throttle(setTime, 1000));
