const openButton = document.getElementById("openBook");
const intro = document.getElementById("intro");
const bookSection = document.getElementById("bookSection");
const book = document.getElementById("book");
const leftContent = document.getElementById("leftContent");
const rightContent = document.getElementById("rightContent");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const pageDots = document.getElementById("pageDots");
const progressLabel = document.getElementById("progressLabel");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");

const pages = [
  {
    left: `<div class="page-content"><span class="page-kicker">01 / THE BEGINNING</span><h3 class="page-title">It started with a hello.</h3><p class="page-copy">Kadang hal yang paling indah datang tanpa banyak rencana. Sebuah obrolan sederhana, tawa kecil, lalu hari-hari yang jadi sedikit lebih menyenangkan.</p><p class="quote">“I’m glad our paths crossed.”</p><span class="date-label">THE DAY OUR STORY BEGAN</span></div>`,
    right: `<div class="page-content"><span class="tape"></span><span class="page-kicker">02 / A LITTLE MOMENT</span><div class="photo-frame"><img src="/static/images/contoh-1.jpg" alt="Foto kenangan pertama" onerror="this.src='https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=700&q=80'"><div class="photo-caption">a day to remember ♡</div></div><p class="page-copy">Simpan foto kalian di sini. Bahkan momen biasa bisa terasa istimewa saat diingat bersama orang yang tepat.</p><span class="date-label">ADD YOUR OWN PHOTO</span></div>`
  },
  {
    left: `<div class="page-content"><span class="page-kicker">03 / LITTLE THINGS</span><h3 class="page-title">Things I adore.</h3><p class="page-copy">Cara kamu tertawa. Cerita-cerita kecilmu. Caramu membuat suasana terasa lebih ringan. Hal-hal sederhana yang mungkin tidak kamu sadari, tapi selalu berhasil membuat hariku lebih baik.</p><p class="quote">“It’s the little things.”</p><span class="date-label">THE DETAILS I KEEP</span></div>`,
    right: `<div class="page-content"><span class="tape"></span><span class="page-kicker">04 / OUR POLAROID</span><div class="photo-frame" style="transform:rotate(2deg)"><img src="/static/images/contoh-2.jpg" alt="Foto kenangan kedua" onerror="this.src='https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80'"><div class="photo-caption">wish we could pause time</div></div><p class="page-copy">Satu foto, seribu cerita yang cuma kita yang tahu.</p><span class="date-label">A MEMORY, PRESERVED</span></div>`
  },
  {
    left: `<div class="page-content"><span class="page-kicker">05 / A NOTE FOR YOU</span><h3 class="page-title">If you ever forget...</h3><p class="page-copy">Kalau suatu hari kamu merasa lelah, semoga kamu ingat bahwa kamu layak disayangi dengan lembut. Kamu tidak harus selalu kuat, tidak harus selalu baik-baik saja. Semoga hari-harimu dipenuhi hal-hal yang membuatmu merasa aman dan dihargai.</p><p class="quote">“You deserve gentle things.”</p><span class="date-label">A LITTLE REMINDER</span></div>`,
    right: `<div class="page-content"><span class="page-kicker">06 / OPEN WHEN YOU NEED IT</span><div class="letter"><p>Dear you,</p><p>Aku nggak tahu semua hal yang akan kita temui ke depannya. Tapi aku tahu, aku senang bisa mengenalmu dan mengumpulkan momen-momen kecil ini bersamamu.</p><p>Terima kasih sudah menjadi dirimu sendiri. Semoga saat membaca ini, kamu tersenyum sedikit.</p><p class="signature">with affection, ♡</p></div><span class="date-label">A LETTER, JUST FOR YOU</span></div>`
  }
];

let currentSpread = -1; // -1 = sampul; 0..2 = pasangan halaman isi
let isAnimating = false;

function makePage(content, side) {
  const page = document.createElement("div");
  page.className = `flip-page ${side === "left" ? "flip-left" : "flip-right"}`;
  page.innerHTML = `<div class="flip-front"><div class="paper-grain"></div>${content}</div><div class="flip-back"><div class="paper-grain"></div><div class="page-content"><span class="page-kicker">A MOMENT, KEPT</span><p class="quote">“Some things are too lovely to let them fade.”</p><span class="date-label">♡ FOREVER IN THIS LITTLE BOOK</span></div></div>`;
  return page;
}

function setCover() {
  leftContent.innerHTML = `<span class="page-number">— 01 —</span><p class="handwritten">for the days<br>i want to remember</p><div class="pressed-flower">✿</div><p class="small-note">a collection of little things<br>that mean a lot.</p>`;
  rightContent.innerHTML = `<div class="cover-stamp">A KEEPSAKE<br>FOR YOU</div><div class="cover-flower">✿</div><p class="cover-small">THE STORY OF</p><h2>you <span>&</span> me</h2><div class="cover-rule"></div><p class="cover-subtitle">little memories, lovely days<br>& words left unsaid</p><p class="cover-date">MADE WITH A FULL HEART · 2026</p>`;
}

function renderSpread(index) {
  // The base pages are a two-page spread; flip overlay creates the physical page-turn effect.
  document.querySelectorAll(".flip-page").forEach(el => el.remove());
  if (index < 0) {
    setCover();
    return;
  }
  const spread = pages[index];
  leftContent.innerHTML = spread.left;
  rightContent.innerHTML = spread.right;
}

function updateControls() {
  prevButton.disabled = currentSpread <= -1;
  nextButton.disabled = currentSpread >= pages.length - 1;
  progressLabel.textContent = currentSpread < 0 ? "COVER / 06" : `SPREAD ${String(currentSpread + 1).padStart(2, "0")} / 03`;
  pageDots.innerHTML = "";
  for (let i = -1; i < pages.length; i++) {
    const dot = document.createElement("button");
    dot.className = `page-dot ${i === currentSpread ? "active" : ""}`;
    dot.type = "button";
    dot.setAttribute("aria-label", i === -1 ? "Sampul" : `Spread ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    pageDots.appendChild(dot);
  }
}

function goTo(nextIndex) {
  if (isAnimating || nextIndex < -1 || nextIndex >= pages.length || nextIndex === currentSpread) return;
  isAnimating = true;
  const oldIndex = currentSpread;
  // Animate a paper leaf across the center, then update the spread.
  const leaf = document.createElement("div");
  leaf.className = "flip-page";
  leaf.style.zIndex = "9";
  leaf.innerHTML = `<div class="flip-front"><div class="paper-grain"></div><div class="page-content"><span class="page-kicker">A MEMORY, TURNED</span><p class="quote">✿</p></div></div><div class="flip-back"><div class="paper-grain"></div><div class="page-content"><p class="quote">♡</p></div></div>`;
  book.appendChild(leaf);
  const forward = nextIndex > oldIndex;
  if (!forward) leaf.style.transform = "rotateY(-180deg)";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    leaf.style.transform = forward ? "rotateY(-180deg)" : "rotateY(0deg)";
  }));
  window.setTimeout(() => {
    currentSpread = nextIndex;
    renderSpread(currentSpread);
    leaf.remove();
    updateControls();
    isAnimating = false;
  }, 500);
}

openButton.addEventListener("click", () => {
  bookSection.classList.add("visible");
  bookSection.scrollIntoView({ behavior: "smooth", block: "center" });
  openButton.innerHTML = "<span>Our story is open</span><span class='button-arrow'>♡</span>";
  openButton.disabled = true;
  // Attempting playback is allowed after this user gesture; it is okay if no audio file exists.
  music.play().then(() => {
    musicToggle.classList.add("playing");
    musicToggle.setAttribute("aria-label", "Jeda musik");
  }).catch(() => {});
});
prevButton.addEventListener("click", () => goTo(currentSpread - 1));
nextButton.addEventListener("click", () => goTo(currentSpread + 1));
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicToggle.setAttribute("aria-label", "Jeda musik");
    } catch {
      alert("Tambahkan file musik MP3 ke folder static/audio/ dengan nama lagu.mp3 terlebih dahulu.");
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicToggle.setAttribute("aria-label", "Putar musik");
  }
});
document.addEventListener("keydown", (event) => {
  if (!bookSection.classList.contains("visible")) return;
  if (event.key === "ArrowRight") goTo(currentSpread + 1);
  if (event.key === "ArrowLeft") goTo(currentSpread - 1);
});
updateControls();
