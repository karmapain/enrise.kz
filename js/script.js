class Spotlight {
	constructor(containerElement) {
		this.container = containerElement;
		this.cards = Array.from(this.container.children);
		this.mouse = {
			x: 0,
			y: 0,
		};
		this.containerSize = {
			w: 0,
			h: 0,
		};
		this.initContainer = this.initContainer.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.init();
	}

	initContainer() {
		this.containerSize.w = this.container.offsetWidth;
		this.containerSize.h = this.container.offsetHeight;
	}

	onMouseMove(event) {
		const { clientX, clientY } = event;
		const rect = this.container.getBoundingClientRect();
		const { w, h } = this.containerSize;
		const x = clientX - rect.left;
		const y = clientY - rect.top;
		const inside = x < w && x > 0 && y < h && y > 0;
		if (inside) {
			this.mouse.x = x;
			this.mouse.y = y;
			this.cards.forEach((card) => {
				const cardX = -(card.getBoundingClientRect().left - rect.left) + this.mouse.x;
				const cardY = -(card.getBoundingClientRect().top - rect.top) + this.mouse.y;
				card.style.setProperty('--mouse-x', `${cardX}px`);
				card.style.setProperty('--mouse-y', `${cardY}px`);
			});
		}
	}

	init() {
		this.initContainer();
		window.addEventListener('resize', this.initContainer);
		window.addEventListener('mousemove', this.onMouseMove);
	}
}

// Init Spotlight
const spotlights = document.querySelectorAll('[data-spotlight]');
spotlights.forEach((spotlight) => {
	new Spotlight(spotlight);
});

// GSAP ("parallax section reveal
document.addEventListener('DOMContentLoaded', function () {
	gsap.registerPlugin(ScrollTrigger);

	gsap.from(".dx-fixed-background__media-wrapper", {
		scale: 0.55,
		scrollTrigger: {
			trigger: ".dx-fixed-background__media-wrapper",
			start: "top bottom", 
			end: "center 75%", 
			scrub: true
		}
	});
	gsap.from(".dx-fixed-background__media", {
		borderRadius: "300px",
		scrollTrigger: {
			trigger: ".dx-fixed-background__media-wrapper",
			start: "top bottom", // Same start as above
			end: "center 75%", // Same end point as above
			scrub: true
		}
	});
});

/* carusel */


const arrowBtns = document.querySelectorAll('.arrow-btn')
const cardBtns = document.querySelectorAll('.card')
let currentCard = 2;
let dir = 1;
moveCards()

arrowBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 3px 4px #00000050'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'expo',
    'box-shadow':'0 6px 8px #00000030'
  })
  
  btn.onclick = (e)=> {
    dir = (i==0)? 1:-1
    if (i==0) {
      currentCard--
      currentCard = Math.max(0, currentCard)
    }
    else {
      currentCard++
      currentCard = Math.min(4, currentCard)
    }
    moveCards(0.75)
  }
})

cardBtns.forEach((btn,i)=>{
  btn.onpointerenter = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 6px 11px #00000030'
  })
  
  btn.onpointerleave = (e)=> gsap.to(btn, {
    ease:'power3',
    overwrite:'auto',
    'box-shadow':()=>(i==currentCard)?'0 6px 11px #00000030':'0 0px 0px #00000030'
  })

  btn.onclick = (e)=> {
    dir = (i<currentCard)? 1:-1
    currentCard = i
    moveCards(0.75)
  }
})

function moveCards(dur=0){
  gsap.timeline({defaults:{ duration:dur, ease:'power3', stagger:{each:-0.03*dir} }})
    .to('.card', {
      x:-270*currentCard,
      y:(i)=>(i==currentCard)?0:15,
      height:(i)=>(i==currentCard)?270:240,
      ease:'elastic.out(0.4)'
    }, 0)
    .to('.card', {
      cursor:(i)=>(i==currentCard)?'default':'pointer',
      'box-shadow':(i)=>(i==currentCard)?'0 6px 11px #00000030':'0 0px 0px #00000030',
      border:(i)=>(i==currentCard)?'2px solid #26a':'0px solid #fff',
      background:(i)=>(i==currentCard)?'radial-gradient(100% 100% at top, #fff 0%, #fff 99%)':'radial-gradient(100% 100% at top, #fff 20%, #eee 175%)',
      ease:'expo'
    }, 0)
    .to('.icon svg', {
      attr:{
        stroke:(i)=>(i==currentCard)?'transparent':'#36a',  
        fill:(i)=>(i==currentCard)?'#36a':'transparent'
      }
    }, 0)
    .to('.arrow-btn-prev', {
      autoAlpha:(currentCard==0)?0:1
    }, 0)
    .to('.arrow-btn-next', {
      autoAlpha:(currentCard==4)?0:1
    }, 0)
    .to('.card h4', {
      y:(i)=>(i==currentCard)?0:8,    
      opacity:(i)=>(i==currentCard)?1:0,
    }, 0)
}




!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);


document.addEventListener('DOMContentLoaded', function() {

   /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
   var modalButtons = document.querySelectorAll('.js-open-modal'),
       overlay      = document.querySelector('.js-overlay-modal'),
       closeButtons = document.querySelectorAll('.js-modal-close');


   /* Перебираем массив кнопок */
   modalButtons.forEach(function(item){

      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener('click', function(e) {

         /* Предотвращаем стандартное действие элемента. Так как кнопку разные
            люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
            Нужно подстраховаться. */
         e.preventDefault();

         /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
            и будем искать модальное окно с таким же атрибутом. */
         var modalId = this.getAttribute('data-modal'),
             modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');


         /* После того как нашли нужное модальное окно, добавим классы
            подложке и окну чтобы показать их. */
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); // end click

   }); // end foreach


   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   }); // end foreach


    document.body.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        if (key == 27) {

            document.querySelector('.modal.active').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        };
    }, false);


    overlay.addEventListener('click', function() {
        document.querySelector('.modal.active').classList.remove('active');
        this.classList.remove('active');
    });




}); // end ready