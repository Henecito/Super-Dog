const mapImage = document.querySelector('.map-image');
const map = document.querySelector('.map');
const character = document.querySelector('.character');

const mapWidth = mapImage.clientWidth;
const imageWidth = mapImage.offsetWidth;
const characterWidth = character.offsetWidth;
const characterHeight = character.offsetHeight;

let scrollPosition = 0;
let characterLeft = 0;
let characterBottom = 0;
let scrollSpeed = 8;
let jumpSpeed = 7;
let fallSpeed = 5;
const jumpHeight = 100;
let isMoving = false;
let isJumping = false;
let scrollInterval;

mapImage.style.backgroundRepeat = 'repeat-x';

function updateBackgroundPosition() {
  mapImage.style.backgroundPositionX = -scrollPosition + 'px';
}

function moveCharacter() {
  character.style.left = characterLeft + 'px';
  character.style.bottom = characterBottom + 'px';
}

const maxCharacterLeft = mapWidth * 0.45;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    if (characterLeft < maxCharacterLeft) {
      characterLeft += scrollSpeed;
    }
    scrollPosition += scrollSpeed;
    isMoving = true;
  } else if (e.key === 'ArrowLeft') {
    characterLeft -= scrollSpeed;
    scrollPosition -= scrollSpeed;
    isMoving = true;
  } else if (e.key === 'ArrowUp' && !isJumping) {
    jump();
  }

  characterLeft = Math.max(0, Math.min(mapWidth - characterWidth, characterLeft));

  if (scrollPosition < 0) {
    scrollPosition = imageWidth;
  } else if (scrollPosition > imageWidth) {
    scrollPosition = 0;
  }

  moveCharacter();
  updateBackgroundPosition();
});

function jump() {
  isJumping = true;
  let jumpDistance = 0;

  function animateJump() {
    if (jumpDistance < jumpHeight) {
      characterBottom += jumpSpeed;
      jumpDistance += jumpSpeed;
      moveCharacter();
      requestAnimationFrame(animateJump);
    } else {
      fall();
    }
  }

  animateJump();
}

function fall() {
  function animateFall() {
    if (characterBottom > 0) {
      characterBottom -= fallSpeed;
      moveCharacter();
      requestAnimationFrame(animateFall);
    } else {
      isJumping = false;
      characterBottom = 0;
      moveCharacter();
    }
  }

  animateFall();
}

function resetCharacterPosition() {
  characterLeft = 0;
  characterBottom = 0;
  character.style.left = characterLeft + 'px';
  character.style.bottom = characterBottom + 'px';
}

let speedIncreaseInterval;
const speedIncreaseRate = 2;
const speedIncreaseAmount = 0.5;

function increaseSpeed() {
  scrollSpeed += speedIncreaseAmount;
  jumpSpeed += speedIncreaseAmount;
  fallSpeed += speedIncreaseAmount;
}

function startSpeedIncreaseTimer() {
  speedIncreaseInterval = setInterval(() => {
    increaseSpeed();
  }, speedIncreaseRate * 1000);
}

startSpeedIncreaseTimer();

function startAutoScroll() {
  scrollInterval = setInterval(() => {
    if (isMoving) {
      scrollPosition += scrollSpeed;
      if (scrollPosition > imageWidth) {
        scrollPosition = 0;
      }
      updateBackgroundPosition();
    }
  }, 30);
}

function stopAutoScroll() {
  clearInterval(scrollInterval);
}

resetCharacterPosition();
startAutoScroll();
