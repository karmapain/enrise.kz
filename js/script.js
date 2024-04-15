		// Just a collection of modern UI effects. 
// I like to keep these kind of things "handy" (in codepen) to show clients/employers what I'm talking about when I say things like "gradient animation"

// If I ever get around to it, I'll clean this all up (lots of extra
// unecessary markup + CSS). For now,
// I'm just using Codepen as my personal "effect holder" :)

// Inspiration: https://portal.griflan.com/
// Inspiration: https://github.com/cruip/cruip-tutorials/tree/main/spotlight-effect

// Cards spotlight
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