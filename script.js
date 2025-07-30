// eh o scriptas
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

    this.el.innerHTML = this.txt; // Update do .wrap

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

// inicializar a porra toda
document.addEventListener('DOMContentLoaded', () => {
    const typewriter = document.querySelector('.typewrite');
    const wrap = typewriter.querySelector('.wrap');
    const dataType = JSON.parse(typewriter.getAttribute('data-type'));

    // definir linhas e palavras para mudança de cor
    const targets = [
       
    ];

    // pré processamento
    targets.forEach(({ index, word }) => {
        if (dataType[index]) {
            dataType[index] = dataType[index].replace(word, `<span class="highlight">${word}</span>`);
        }
    });
    typewriter.setAttribute('data-type', JSON.stringify(dataType));

    // inicializar maquina de escrever
    if (dataType) {
        new TxtType(wrap, dataType, typewriter.getAttribute('data-period'));
    }

    // highlight dinamico para o wrap
    const observer = new MutationObserver(() => {
        let currentText = wrap.innerText; // utilize innerText para não ter conflitos com HTML
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
});

// gatilho opcional
document.getElementById('trigger')?.addEventListener('click', () => {
    document.body.classList.toggle('active');
});
