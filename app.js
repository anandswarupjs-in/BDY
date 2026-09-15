// ================================================================
//  EDITABLE CONTENT — change these values to personalize the site
// ================================================================

const birthdayPerson = "LOML";
const birthdayDate = "25 SEPTEMBER";
const birthdayDateShort = "25 • 09";

const birthdayCardMessage = `
HAPPY BIRTHDAY LOML

Dont stop being yourself
The childishness in you makes who you are ❤️‍🩹
`;

const letterMessage = `
HAPPY BIRTHDAY MY BBG

I love how weird u are
I love how silly u are
I love how u smile after all the dumb things we do
I love how u care for me after fights
I love how u say everything to me
I love ur eyes , hair .. everything
I LOVE YOUU 🎀💕
`;

const PASS = '2352026';

// ================================================================
//  END EDITABLE CONTENT
// ================================================================

let isTransitioning = false;
let music = null;
let musicMuted = false;
let currentMusicVolume = 0.18;
let hugHeartsInterval = null;

/* ---------- Content injection ---------- */
function injectContent() {
  document.getElementById('dateReveal').textContent = birthdayDate;

  var cardLines = birthdayCardMessage.trim().split('\n').filter(function (l) { return l.trim(); });
  if (cardLines.length > 0) {
    document.getElementById('cardTitle').textContent = cardLines[0];
    if (cardLines.length > 1) {
      document.getElementById('cardMessage').innerHTML =
        cardLines.slice(1).map(function (l) { return '<p>' + l + '</p>'; }).join('');
    }
  }

  document.getElementById('finalTitle').innerHTML =
    'Happy Birthday,<br>' + birthdayPerson + ' ♡';
  document.getElementById('finalDate').textContent = birthdayDateShort;
}

/* ---------- Scene navigation ---------- */
function go(n) {
  if (isTransitioning) return;
  isTransitioning = true;

  stopHugHearts();

  var current = document.querySelector('.screen.active');
  if (current) current.classList.remove('active');

  document.getElementById('progress').style.width = (n / 15 * 100) + '%';

  fadeMusic(0.06, 500);

  var transitionTime = (n === 10 || n === 13 || n === 14 || n === 15) ? 1200 : 800;

  setTimeout(function () {
    var next = document.getElementById('s' + n);
    next.classList.add('active');

    var reveals = next.querySelectorAll('.reveal');
    reveals.forEach(function (el) { el.classList.remove('show'); });
    setTimeout(function () {
      reveals.forEach(function (el, i) {
        setTimeout(function () { el.classList.add('show'); }, i * 250);
      });
    }, 200);

    setTimeout(function () {
      if (n === 13) fadeMusic(0.05, 1500);
      else if (n === 10 || n === 15) fadeMusic(0.22, 1000);
      else fadeMusic(currentMusicVolume, 800);
    }, 600);

    if (n === 2) confetti('confetti2');
    if (n === 10) confetti('confetti10');
    if (n === 13) playLetter();
    if (n === 14) playHug();
    if (n === 15) confetti('confetti15');

    isTransitioning = false;
  }, transitionTime);
}

/* ---------- Unlock ---------- */
function unlock() {
  var p = document.getElementById('password');
  if (p.value === PASS) {
    createHeartBurst();
    startMusic();
    setTimeout(function () { go(1); }, 600);
  } else {
    document.getElementById('error').textContent = "That code isn't right… try again ♡";
    p.value = '';
    p.focus();
  }
}

/* ---------- Mood ---------- */
function mood(x) {
  var t = document.getElementById('moodText');
  var reactions = {
    good: "Yay! Then let's make it <b>even better!</b> ✨",
    tired: "Then the cat prescribes a tiny dose of <b>birthday happiness.</b> 🐾",
    bad: "Then stay here for a moment. <b>Something sweet is coming.</b> ♡"
  };
  t.innerHTML = reactions[x];
  t.style.opacity = '1';
  showBtn('moodNext');
}

/* ---------- Gift ---------- */
function openGift() {
  var g = document.getElementById('gift');
  if (g.classList.contains('open')) return;
  g.classList.add('open');
  document.getElementById('giftHint').textContent = 'surprise unlocked ✨';
  setTimeout(function () { go(12); }, 1000);
}

/* ---------- Answer ---------- */
function answer(yes) {
  var t = document.getElementById('answerText');
  t.textContent = yes
    ? 'The cat is very happy. 🥹♡'
    : 'The cat accepts the answer… but will still send birthday wishes. 🐾♡';
  t.style.opacity = '1';
  showBtn('answerNext');
}

/* ---------- Letter ---------- */
function buildLetter() {
  var lines = letterMessage.trim().split('\n').filter(function (l) { return l.trim(); });
  var container = document.getElementById('letterLines');
  container.innerHTML = '';
  lines.forEach(function (line, i) {
    var el = document.createElement('div');
    el.className = 'letter-line';
    if (i === 0) el.classList.add('letter-heading');
    if (i === lines.length - 1) el.classList.add('letter-final');
    el.textContent = line;
    container.appendChild(el);
  });
}

function playLetter() {
  buildLetter();
  var lines = document.querySelectorAll('#letterLines .letter-line');
  var delay = 600;
  lines.forEach(function (el, i) {
    setTimeout(function () {
      el.classList.add('show');
      if (i === lines.length - 1) {
        setTimeout(createLetterHearts, 300);
      }
    }, delay);
    delay += i === 0 ? 1400 : 1600;
  });
  setTimeout(function () {
    showBtn('letterNext');
  }, delay + 500);
}

function createLetterHearts() {
  var container = document.querySelector('.letter');
  if (!container) return;
  for (var i = 0; i < 6; i++) {
    var heart = document.createElement('span');
    heart.className = 'letter-heart';
    heart.textContent = '💕';
    heart.style.left = (20 + Math.random() * 60) + '%';
    heart.style.bottom = (10 + Math.random() * 20) + '%';
    heart.style.animationDelay = (Math.random() * 0.5) + 's';
    heart.style.fontSize = (14 + Math.random() * 8) + 'px';
    container.appendChild(heart);
  }
  setTimeout(function () {
    container.querySelectorAll('.letter-heart').forEach(function (h) { h.remove(); });
  }, 3000);
}

/* ---------- Hug animation ---------- */
function playHug() {
  ['hugLine1', 'hugLine2', 'hugLine3'].forEach(function (id) {
    var el = document.getElementById(id);
    el.textContent = '';
    el.classList.remove('show');
  });
  var btn = document.getElementById('hugNext');
  btn.style.display = 'none';
  btn.style.opacity = '0';

  createHugHearts();

  setTimeout(function () {
    var l1 = document.getElementById('hugLine1');
    l1.textContent = 'Come here...';
    l1.classList.add('show');
  }, 2000);

  setTimeout(function () {
    var l2 = document.getElementById('hugLine2');
    l2.textContent = "Here's your virtual hug ♡";
    l2.classList.add('show');
  }, 4000);

  setTimeout(function () {
    var l3 = document.getElementById('hugLine3');
    l3.textContent = 'Happy Birthday, ' + birthdayPerson + '.';
    l3.classList.add('show');
    fadeMusic(0.20, 1500);
  }, 6000);

  setTimeout(function () {
    showBtn('hugNext');
  }, 8000);
}

function createHugHearts() {
  if (hugHeartsInterval) clearInterval(hugHeartsInterval);
  var container = document.getElementById('hugHearts');
  hugHeartsInterval = setInterval(function () {
    var heart = document.createElement('span');
    heart.className = 'hug-heart';
    heart.textContent = ['❤️', '💕', '✨'][Math.floor(Math.random() * 3)];
    heart.style.left = (20 + Math.random() * 60) + '%';
    heart.style.animationDuration = (2 + Math.random() * 2) + 's';
    heart.style.fontSize = (12 + Math.random() * 12) + 'px';
    container.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 4000);
  }, 350);
}

function stopHugHearts() {
  if (hugHeartsInterval) {
    clearInterval(hugHeartsInterval);
    hugHeartsInterval = null;
  }
}

/* ---------- Confetti ---------- */
function confetti(id) {
  var box = document.getElementById(id);
  if (!box) return;
  box.innerHTML = '';
  for (var i = 0; i < 85; i++) {
    var q = document.createElement('i');
    q.style.left = Math.random() * 100 + '%';
    q.style.animationDelay = Math.random() * 0.8 + 's';
    q.style.background = ['#d95773', '#f4a5b5', '#f5cc75', '#fff', '#b6d9c6'][Math.floor(Math.random() * 5)];
    q.style.transform = 'rotate(' + Math.random() * 180 + 'deg)';
    box.appendChild(q);
  }
}

/* ---------- Heart burst (unlock) ---------- */
function createHeartBurst() {
  var container = document.getElementById('particles');
  for (var i = 0; i < 25; i++) {
    var heart = document.createElement('div');
    heart.className = 'heart-burst';
    heart.textContent = ['❤️', '💕', '✨', '🎀'][Math.floor(Math.random() * 4)];
    heart.style.left = (40 + Math.random() * 20) + '%';
    heart.style.top = (40 + Math.random() * 20) + '%';
    var angle = Math.random() * Math.PI * 2;
    var dist = 80 + Math.random() * 120;
    heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    heart.style.animationDelay = (Math.random() * 0.3) + 's';
    container.appendChild(heart);
  }
  setTimeout(function () { container.innerHTML = ''; }, 2500);
}

/* ---------- Music ---------- */
function startMusic() {
  music = new Audio('assets/music.mp3');
  music.loop = true;
  music.volume = 0;
  music.play().then(function () {
    document.getElementById('musicBtn').style.display = 'flex';
    fadeMusic(0.18, 2000);
  }).catch(function () {
    music = null;
    document.getElementById('musicBtn').style.display = 'none';
  });
}

function fadeMusic(target, duration) {
  if (!music || musicMuted) return;
  currentMusicVolume = target;
  var start = music.volume;
  var diff = target - start;
  var steps = 30;
  var stepTime = duration / steps;
  var i = 0;
  var interval = setInterval(function () {
    i++;
    music.volume = Math.max(0, Math.min(1, start + diff * (i / steps)));
    if (i >= steps) clearInterval(interval);
  }, stepTime);
}

function toggleMute() {
  if (!music) return;
  musicMuted = !musicMuted;
  if (musicMuted) {
    music.volume = 0;
    document.getElementById('musicBtn').textContent = '🔇';
  } else {
    fadeMusic(currentMusicVolume, 1000);
    document.getElementById('musicBtn').textContent = '🔊';
  }
}

/* ---------- Helper ---------- */
function showBtn(id) {
  var btn = document.getElementById(id);
  btn.style.display = 'inline-block';
  requestAnimationFrame(function () { btn.style.opacity = '1'; });
}

/* ---------- Restart ---------- */
function restart() {
  stopHugHearts();

  document.getElementById('moodText').innerHTML = '';
  document.getElementById('moodText').style.opacity = '0';
  document.getElementById('moodNext').style.display = 'none';
  document.getElementById('moodNext').style.opacity = '0';

  document.getElementById('gift').classList.remove('open');
  document.getElementById('giftHint').textContent = 'tap the gift';

  document.getElementById('answerText').textContent = '';
  document.getElementById('answerText').style.opacity = '0';
  document.getElementById('answerNext').style.display = 'none';
  document.getElementById('answerNext').style.opacity = '0';

  document.getElementById('letterNext').style.display = 'none';
  document.getElementById('letterNext').style.opacity = '0';

  ['hugLine1', 'hugLine2', 'hugLine3'].forEach(function (id) {
    var el = document.getElementById(id);
    el.textContent = '';
    el.classList.remove('show');
  });
  document.getElementById('hugNext').style.display = 'none';
  document.getElementById('hugNext').style.opacity = '0';

  document.getElementById('password').value = '';
  document.getElementById('error').textContent = '';

  go(0);
}

/* ---------- Init ---------- */
injectContent();
document.getElementById('password').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') unlock();
});
