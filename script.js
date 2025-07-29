document.getElementById('trigger').addEventListener('click', function() {
    document.body.classList.toggle('active');
});
/* funções da máquina de escrever! */
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

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

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

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // injeção de CsS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};

document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewriter');
    const wrap = typewriter.querySelector('.wrap');
    const dataType = JSON.parse(typewriter.getAttribute('data-type'));

    // definir as linhas, e palavras
    const targets = [
        { index: 1, word: '族' }, 
        { index: 2, word: 'work in progress' },
        { index: 3, word: 'relax & code' },
        { index: 4, word: '4 fun' },
        { index: 5, word: 'zer0six'}
    ];

    // processamento prévio 
    targets.forEach(({ index, word }) => {
        if (dataType[index]) {
            dataType[index] = dataType[index].replace(word, `<span class="highlight">${word}</span>`);
        }
    });

    // Update
    typewriter.setAttribute('data-type', JSON.stringify(dataType));

    // observe mudanças no .wrap para adquirir highlight dinamicas
    const observer = new MutationObserver(() => {
        let currentText = wrap.innerHTML;
        targets.forEach(({ word }) => {
            if (currentText.includes(word)) {
                currentText = currentText.replace(word, `<span class="highlight">${word}</span>`);
            }
        });
        wrap.innerHTML = currentText;
    });

    observer.observe(wrap, { childList: true, characterData: true, subtree: true });
});
