/* the code responsible for typewriting (shoutout to who made it) */

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
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

    if (this.isDeleting) {
        delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

// Function to normalize ASCII art by removing common leading indentation and empty lines
function normalizeAscii(art) {
    const lines = art.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return '';
    const minIndent = Math.min(...lines.map(line => line.match(/^\s*/)[0].length));
    const trimmedLines = lines.map(line => line.slice(minIndent));
    return trimmedLines.join('\n');
}

// ASCII arts (normalized)
const asciiArts = [
    `
                           ███████████████                      
            ██████████████████████████████████████████████████    
               █▓█                                        ███    
                  █ █                                   ██       
                    ████                             ███         
                 ███▓  ███ ███████                 █▓█           
                ████      ████                    ██             
                ████     ██                   █ █████            
                ███     █                   ███  ████            
                ███   █░                  ██     ████            
                 ████░                  ███      ███            
                ▓█                   ██████    ████            
              ▓██                  ████████   ███               
            █ █                                ███               
          ██▓                                     ██             
        ░█                                           ███          
       ███████████████████████████████████████████████████       
       rockin'              ███████████████              on       
    `,
    `
                                                                                              
                                                                               
                      ∞≈≠                                           
                  ≈∞ππ∞≈√∞πππ                                        
                  ÷ππ∞∞≠∞=÷-+                                         
               ∞=≠÷÷+++++++∞∞πππ                                      
              π≈∞≈∞∞π≠≠+++≈∞π                                        
             greatest+=√=-×                                           
            wave++++              π                            
           ππ++++++∞π√π≠+         πππ+                            
          ++++≠πππ∞×--≠ππππππππ≠-++++                            
         ππππ∞×++÷=÷+√√×--××++÷≠÷+-√                            
        +++++π∞-=+π+++++++++++++≠-+                            
        -+-+++++π-++ππ+++++÷=ππ-÷≠∞                            
        +++++++π≠+≠++√π√√π≈≠÷÷≠≠π                             

         πππ∞∞πππ ππππππ∞π       ππ ππ    ππ                       
            ππ    ππ    ππ       ππ ππ    ππ                       
            ππ    ππ    ππ       ππ ππ    ππ                       
            ππ    ππππππππ ππππππππ ππππππππ                       
    `,
    `
                                                
                                             
                                              
                    ██▒▒██                    
                  ██▒     ▒                   
                 ██▒      ░▒                  
                ███    ▒   ▒█                 
                ██▒   ▒▒▒   ▒█                
               ██▒   ▒▒░▒   ▒▒█               
              ██▒   ░▒░░░▒   ▒▒               
             ██▒▒   ▒░░░░░▒   ▒█              
            ██▓▒   ▒░▒▒▒▒░▒▒   ▒█             
            ██▒   ▒▒▒▒   ▒▒▒▒   ▒█            
           ██▒   ▒▒         ▒▒   ██           
          ███                    ▒█           
         ███▒     ▒▒       ▒      ▒█          
        ███▒   ▒   ▒      ▒   ▒▒   ▒█         
        ██▒   ▒▒▒   ▒     ▒░   ▒▒▒   ▒█        
       ██▒   ▒▒░▒▒   ▒   ▒   ▒░░▒▒   ▒█       
      ██▒   ▒▒░░░▒▒   ▒ ▒   ▒▒░░░▒    ▓       
     ███    ▒░░░░░▒   ░    ▒▒░░░░░▒   ▒█      
    ███▒   ▒░▒▒▒▒▒░▒   ░   ▒░▒▒▒▒▒▒▒   ▒█     
    ██▒   ▒▒▒▒   ▒▒▒▒     ▒▒▒    ▒▒▒▒   ▒█    
   ██▒   ▒▒         ▒▒   ▒          ▒▒   ▒█   
  ██▒       ░▒███▒          ▒▒███▒        ▒   
   ██▒    ▒█████████▒    ░▒█████████▒    ▒█   
    ███████        ████████       ████████    
                    ISAF                           
        independent state allied forces   
                                              
    `
].map(normalizeAscii);

document.addEventListener('DOMContentLoaded', () => {
    // Typewriter text
    const typewriter = document.querySelector('.typewrite');
    const wrap = typewriter.querySelector('.wrap');
    const dataType = JSON.parse(typewriter.getAttribute('data-type'));

    const targets = [];

    targets.forEach(({
        index,
        word
    }) => {
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
        targets.forEach(({
            word
        }) => {
            if (updatedText.includes(word)) {
                updatedText = updatedText.replace(word, `<span class="highlight">${word}</span>`);
            }
        });
        if (updatedText !== wrap.innerHTML) {
            wrap.innerHTML = updatedText;
        }
    });

    observer.observe(wrap, {
        childList: true,
        characterData: true,
        subtree: true
    });

    // Audio & ASCII
    const startButton = document.getElementById('start-button');
    const content = document.getElementById('content');
    const audio = document.getElementById('audio');
    const playPauseSlider = document.getElementById('play-pause-slider');
    const asciiContainer = document.getElementById('ascii-container');
    const asciiArtElement = document.getElementById('ascii-art');

    // ASCII art rotation
    let currentArtIndex = 0;
    asciiArtElement.textContent = asciiArts[currentArtIndex];

    function rotateAsciiArt() {
        currentArtIndex = (currentArtIndex + 1) % asciiArts.length;
        asciiArtElement.textContent = asciiArts[currentArtIndex];
    }

    setInterval(rotateAsciiArt, 30000);

    // Draggable and scalable ASCII container
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;
    let currentScale = 1;

    asciiContainer.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Left click only
        isDragging = true;
        const rect = asciiContainer.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;
        startX = e.clientX;
        startY = e.clientY;
        asciiContainer.style.cursor = 'grabbing';
        // switch to absolute
        asciiContainer.style.left = `${initialLeft}px`;
        asciiContainer.style.top = `${initialTop}px`;
        asciiContainer.style.transform = `scale(${currentScale})`;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        asciiContainer.style.left = `${initialLeft + deltaX}px`;
        asciiContainer.style.top = `${initialTop + deltaY}px`;
    });

    document.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        asciiContainer.style.cursor = 'move';
    });

    asciiContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        currentScale += e.deltaY * -0.001;
        currentScale = Math.min(Math.max(0.5, currentScale), 2);
        asciiContainer.style.transform = `scale(${currentScale})`;
    });

    // Start button 
    startButton.addEventListener('click', () => {
        content.classList.remove('blurred');
        startButton.style.display = 'none';
        audio.play().catch(error => {
            console.error('Audio playback failed:', error);
        });
        playPauseSlider.value = '1';
    });

    // Audio slider 
    playPauseSlider.addEventListener('input', () => {
        if (playPauseSlider.value == '1') {
            audio.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
        } else {
            audio.pause();
        }
    });
});
