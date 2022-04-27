const video = document.querySelector('video.player');
const wrapper = document. querySelector('.video-player');

const playback = document.querySelector('.playback'),
      play     = document.querySelector('.playback__play'),
      pause    = document.querySelector('.playback__pause'),

      progress = document.querySelector('.controls-progress'),
      line     = document.querySelector('.controls-progress__line'),
      point    = document.querySelector('.controls-progress__point'),
      timeSpan = document.querySelector('.time'),
      volumeRange   = document.querySelector('.volume');

let timerId;

function playbackMode() {
    if(play.classList.contains('d-block')) {
        video.play();
        play.classList.remove('d-block');
        pause.classList.add('d-block');
    } else {
        video.pause();
        pause.classList.remove('d-block');
        play.classList.add('d-block');
    }
}

function rewindTime(offsetX) {
    if(offsetX < 0) { return; }

    const duration = Math.floor(video.duration);
    let part = progress.offsetWidth / duration;
    let time = Math.floor(offsetX / part);
    video.currentTime = time;
}

function rewindBar(x) {
    if(x > 0 && x <= progress.offsetWidth) {
        point.style.transform = `translateX(${x}px)`;
        line.style.width = x + 'px';
    }
}
let videoTime = () => {
    let time = video.currentTime;
    Math.floor(time);

    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    let minutesVal = minutes;
    let secondsVal = seconds;

    if(minutes < 10) {
        minutesVal = '0' + minutes;
    }
    if(seconds < 10) {
        secondsVal = '0' + seconds;
    }

    return minutesVal + ':' + secondsVal;
}
/* -------- Event Listeners ---------- */
playback.addEventListener('click', () => playbackMode());
video.addEventListener('play', () => {
    timerId = setInterval(() => {
        const part = Math.floor((progress.offsetWidth / video.duration) + line.offsetWidth);

        if(line.offsetWidth <= progress.offsetWidth) {
            //point.style.transform = `translateX(${part}px)`;
            rewindBar(part);
        } else {
            clearInterval(timerId);
        }
    },1000);

});
video.addEventListener('pause', () => {
    clearInterval(timerId);
});
video.addEventListener('timeupdate', (e) => {
    timeSpan.innerHTML = videoTime();
});

progress.addEventListener('drag', (event) => {
    event.preventDefault();
    rewindBar(event.offsetX);
    rewindTime(event.offsetX);
});
progress.addEventListener('click', (event) => {
    rewindBar(event.offsetX);
    rewindTime(event.offsetX);
});

volumeRange.addEventListener('input', (e) => {
    video.volume = e.target.value;
});