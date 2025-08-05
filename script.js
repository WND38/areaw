var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = this.txt;

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewrite');
    const wrap = typewriter.querySelector('.wrap');
    const dataType = JSON.parse(typewriter.getAttribute('data-type'));

    const targets = [];

    targets.forEach(({ index, word }) => {
        if (dataType[index]) {
            dataType[index] = dataType[index].replace(word, `<span class="highlight">${word}</span>`);
        }
    });
    typewriter.setAttribute('data-type', JSON.stringify(dataType));

    if (dataType) {
        new TxtType(wrap, dataType, typewriter.getAttribute('data-period'));
    }

    const observer = new MutationObserver(() => {
        let currentText = wrap.innerText;
        let updatedText = currentText;
        targets.forEach(({ word }) => {
            if (updatedText.includes(word)) {
                updatedText = updatedText.replace(word, `<span class="highlight">${word}</span>`);
            }
        });
        if (updatedText !== wrap.innerHTML) {
            wrap.innerHTML = updatedText;
        }
    });

    observer.observe(wrap, { childList: true, characterData: true, subtree: true });

    // Start button functionality
    const startButton = document.getElementById('start-button');
    const content = document.getElementById('content');
    startButton.addEventListener('click', () => {
        content.classList.remove('blurred');
        startButton.style.display = 'none';
    });

    // Audio player functionality
    const audio = document.getElementById('background-audio');
    const playPauseButton = document.getElementById('play-pause-button');

    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });
});
