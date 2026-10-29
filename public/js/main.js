// digitação em loop
const words = ["PHP / Laravel", "Python / FastAPI", "Vue 3", "IA aplicada"];
const el = document.getElementById("typed");
let w = 0, i = 0, del = false;
(function type() {
  const word = words[w];
  el.textContent = word.slice(0, i += del ? -1 : 1);
  let t = del ? 50 : 110;
  if (!del && i === word.length) { del = true; t = 1400; }
  else if (del && i === 0) { del = false; w = (w + 1) % words.length; t = 300; }
  setTimeout(type, t);
})();

// barra de progresso
const bar = document.getElementById("bar");
addEventListener("scroll", () => {
  bar.style.width = (scrollY / (document.documentElement.scrollHeight - innerHeight) * 100) + "%";
}, { passive: true });

// reveal + contadores
const count = n => {
  const end = +n.dataset.n, s = n.dataset.suffix; let v = 0;
  const id = setInterval(() => { n.textContent = ++v + s; if (v >= end) clearInterval(id); }, 160);
};
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in");
  e.target.querySelectorAll("[data-n]").forEach(count);
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));

// brilho que segue o mouse nos cards
document.querySelectorAll(".card").forEach(c => c.addEventListener("mousemove", e => {
  const r = c.getBoundingClientRect();
  c.style.setProperty("--x", e.clientX - r.left + "px");
  c.style.setProperty("--y", e.clientY - r.top + "px");
}));
