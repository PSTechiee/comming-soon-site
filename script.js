// Array of letters for the text animation
const letter = "ABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCDABCD".split("");

// Event listener for the text animation
document.querySelector("h1").onmouseover = (event) => {
  let iteration = 0;
  const interval = setInterval(() => {
    event.target.innerHTML = event.target.innerHTML
      .split("")
      .map((letters, index) => {
        if (index < Math.floor(Math.random() * iteration)) {
          return event.target.dataset.value[index];
        }
        return letter[Math.floor(Math.random() * letter.length)];
      })
      .join("");
    if (event.target.innerHTML == event.target.dataset.value) {
      clearInterval(interval);
    }
    iteration += 1;
  }, 30);
};

// Selecting the line element
const line = document.querySelector('.line');

const audio = new Audio('https://audio.jukehost.co.uk/ocqG85Dz01i8dvu7mbWkdH0cXkuWaD7x'); // Replace with your direct audio file path
audio.loop = true;
audio.preload = 'auto'; // Preload the audio to have it ready to play
audio.autoplay = false;

// Function to start playing the audio
function tryPlayAudio() {
  audio.play().catch(error => {
    console.error("Error attempting to play audio:", error);
  });
}

// Event listener for user interaction to start the audio
document.addEventListener('click', () => {
  tryPlayAudio();
  document.removeEventListener('click', arguments.callee); // Remove the event listener after first click
});

// Display a message asking the user to click to play the audio
const playMessage = document.createElement('div');
playMessage.style.position = 'fixed';
playMessage.style.top = '10px';
playMessage.style.left = '50%';
playMessage.style.transform = 'translateX(-50%)';
playMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
playMessage.style.color = 'white';
playMessage.style.padding = '10px';
playMessage.style.borderRadius = '5px';
playMessage.style.zIndex = '1000';
playMessage.innerText = 'Click anywhere to play the audio';
document.body.appendChild(playMessage);

// Remove the message once the audio starts playing
audio.addEventListener('play', () => {
  document.body.removeChild(playMessage);
});

// Event listener for mouse movement to adjust volume
document.addEventListener('mousemove', (e) => {
  const y = e.clientY;
  const maxY = window.innerHeight;
  const volume = 1 - (y / maxY);
  audio.volume = volume;
  line.style.top = `${y}px`;
});

// Mute icon functionality
const muteIcon = document.querySelector('.mute-icon');
muteIcon.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    muteIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>'; // Unmute icon
  } else {
    audio.muted = true;
    muteIcon.innerHTML = '<i class="fa-solid fa-volume-off"></i>'; // Mute icon
  }
});

// Function to create falling stars
function stars() {
  let e = document.createElement("div");
  e.setAttribute("class", "star");
  document.body.appendChild(e);
  e.style.left = Math.random() * +innerWidth + "px";

  let size = Math.random() * 12;
  let duration = Math.random() * 3;

  e.style.fontSize = 12 + "px";
  e.style.animationDuration = 2 + duration + "s";
  setTimeout(function () {
    document.body.removeChild(e);
  }, 5000);
}

// Interval to create falling stars
setInterval(function () {
  stars();
}, 60);

// Function to handle cursor animation
(function() {
  const link = document.querySelectorAll('nav > .hover-this');
  const cursor = document.querySelector('.cursor');
  const animateit = function(e) {
    const span = this.querySelector('span');
    const { offsetX: x, offsetY: y } = e,
          { offsetWidth: width, offsetHeight: height } = this,
          move = 25,
          xMove = x / width * (move * 2) - move,
          yMove = y / height * (move * 2) - move;
    span.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') span.style.transform = '';
  };
  const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  };
  link.forEach(b => b.addEventListener('mousemove', animateit));
  link.forEach(b => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);
})();

// Mouse animation code starts here
let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
  starTimestamp: start,
  starPosition: originPosition,
  mousePosition: originPosition
}

const config = {
  starAnimationDuration: 1500,
  minimumTimeBetweenStars: 250,
  minimumDistanceBetweenStars: 75,
  glowDuration: 75,
  maximumGlowPointSpacing: 10,
  colors: ["249 146 253", "252 254 255"],
  sizes: ["1.4rem", "1rem", "0.6rem"],
  animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
      selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
      px = value => withUnit(value, "px"),
      ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
  const diffX = b.x - a.x,
        diffY = b.y - a.y;

  return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
      removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
  const star = document.createElement("span"),
        color = selectRandom(config.colors);

  star.className = "star fa-solid fa-sparkle";

  star.style.left = px(position.x);
  star.style.top = px(position.y);
  star.style.fontSize = selectRandom(config.sizes);
  star.style.color = `rgb(${color})`;
  star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
  star.style.animationName = config.animations[count++ % 3];
  star.style.starAnimationDuration = ms(config.starAnimationDuration);

  appendElement(star);

  removeElement(star, config.starAnimationDuration);
}

const createGlowPoint = position => {
  const glow = document.createElement("div");

  glow.className = "glow-point";

  glow.style.left = px(position.x);
  glow.style.top = px(position.y);

  appendElement(glow)

  removeElement(glow, config.glowDuration);
}

const determinePointQuantity = distance => Math.max(
  Math.floor(distance / config.maximumGlowPointSpacing),
  1
);

const createGlow = (last, current) => {
  const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);

  const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;

  Array.from(Array(quantity)).forEach((_, index) => {
    const x = last.x + dx * index,
          y = last.y + dy * index;

    createGlowPoint({ x, y });
  });
}

const updateLastStar = position => {
  last.starTimestamp = new Date().getTime();

  last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
  if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
    last.mousePosition = position;
  }
};

const handleOnMove = e => {
  const mousePosition = { x: e.clientX, y: e.clientY }

  adjustLastMousePosition(mousePosition);

  const now = new Date().getTime(),
        hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars,
        hasBeenLongEnough = calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenStars;

  if(hasMovedFarEnough || hasBeenLongEnough) {
    createStar(mousePosition);

    updateLastStar(mousePosition);
  }

  createGlow(last.mousePosition, mousePosition);

  updateLastMousePosition(mousePosition);
}

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);
console.log("Website source code: https://codepen.io/useroninternet/pen/zYVRvpZ");
