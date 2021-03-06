const video = document.querySelector('video.player');
const wrapper = document.querySelector('.video-player');
const controls = document.querySelector('.controls');

const playback = document.querySelector('.playback'),
      play     = document.querySelector('.playback__play'),
      pause    = document.querySelector('.playback__pause'),

      progress = document.querySelector('.controls-progress'),
      line     = document.querySelector('.controls-progress__line'),
      point    = document.querySelector('.controls-progress__point'),
      timeSpan = document.querySelector('.time'),
      volumeRange   = document.querySelector('.volume');

let timerid;

function changePlayback() {
    if(video.paused) {
        pause.classList.add('d-block');
        play.classList.remove('d-block');
        video.play();
    } else {
        play.classList.add('d-block');
        pause.classList.remove('d-block');
        video.pause();
    }
}
      
function changeTimebar() {
    let currentTimePart = video.currentTime / video.duration;
    let progressOffset = Math.floor(progress.offsetWidth * currentTimePart);

    if(line.offsetWidth <= progress.offsetWidth) {
        line.style.width = progressOffset + 'px';
        point.style.transform = `translate(${progressOffset}px)`;
    }
    progress.setAttribute('aria-valuenow', Math.floor((line.offsetWidth / progress.offsetWidth) * 100));
}

function rewindBar(offset) {
    if(offset >= 0 && offset <= progress.offsetWidth) {
        let timePart = Math.floor((offset / progress.offsetWidth) * video.duration);
        video.currentTime = timePart;
    }
}

function rewindVolume(currentVolume) {
    video.volume = currentVolume;
}

function controlsAnimation() {
    if(timerid == null || undefined) {
        timerid = setTimeout(() => {
            controls.classList.add('controls-animation');
        }, 4000);
    } else {
        clearTimeout(timerid);
        controls.classList.remove('controls-animation');
        timerid = setTimeout(() => {
            controls.classList.add('controls-animation');
        }, 4000);
    }//
}

// Event Listeners
playback.addEventListener('click', changePlayback);

video.addEventListener('timeupdate', changeTimebar);

wrapper.addEventListener('mousemove', controlsAnimation);

progress.addEventListener('drag', (event) => {
    rewindBar(event.offsetX);
});

progress.addEventListener('click', (event) => {
    rewindBar(event.offsetX);
});

volumeRange.addEventListener('input', (e) => { rewindVolume(e.target.value) }); 