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

// ASCII
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
       πππ                        πππ                                  
        π÷π         ππ≠≠≠≠≠π      π÷π   πππ        ππ        ππ≠≠≠≠≠√π   
        πππππππ    πππππππ≈≈π     ∞∞    ππ     ππππ∞∞πππ    πππππππ≈÷π   
      πππ                 ∞∞π    π÷π           π∞∞≈∞∞∞÷            ∞÷π  
     π∞π                 π∞π     π÷π    πππ   π∞∞ ∞∞ ∞=            ≈∞π 
     π÷π                 ≈∞π     π∞π   πππ     ππ√πππππ           ≈≈π   
                    ππππ≠×∞       ≠√πππππ        ∞π          πππππππ    
                    
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
        ███▒   ▒   ▒▒     ▒   ▒▒   ▒█         
        ██▒   ▒▒▒   ▒▓   ▒░   ▒▒▒   ▒█        
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
];

document.addEventListener('DOMContentLoaded', () => {
    // Typewriter text
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

    // Audio & ASCII
    const startButton = document.getElementById('start-button');
    const content = document.getElementById('content');
    const audio = document.getElementById('audio');
    const playPauseSlider = document.getElementById('play-pause-slider');
    const asciiArtElement = document.getElementById('ascii-art');

    // ASCII art rotation
    let currentArtIndex = 0;
    asciiArtElement.textContent = asciiArts[currentArtIndex];

    function rotateAsciiArt() {
        currentArtIndex = (currentArtIndex + 1) % asciiArts.length;
        asciiArtElement.textContent = asciiArts[currentArtIndex];
    }

    setInterval(rotateAsciiArt, 15000);

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






