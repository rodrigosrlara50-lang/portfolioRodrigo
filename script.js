
const prog=document.querySelector('.progress');
const cursor=document.querySelector('.cursor');
const intro=document.querySelector('.intro-scroll');
const sticky=document.querySelector('.intro-sticky');
const word=document.querySelector('.portfolio-word');
const portrait=document.querySelector('.portrait');
const mini=document.querySelector('.intro-mini');
const nameEl=document.querySelector('.intro-name');
const header=document.querySelector('.site-header');
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function onScroll(){
  const max=document.documentElement.scrollHeight-innerHeight;
  prog.style.width=(scrollY/max*100)+'%';
  const r=intro.getBoundingClientRect();
  const travel=intro.offsetHeight-innerHeight;
  const p=clamp((-r.top)/travel,0,1);
  const eased=1-Math.pow(1-p,3);
  const y=-8*eased;
  const s=1-(.24*eased);
  word.style.transform=`translate3d(0,${y}vh,0) scale(${s})`;
  portrait.style.opacity=clamp((p-.12)/.42,0,1);
  portrait.style.transform=`translateX(-50%) translateY(${35-35*eased}px) scale(${.94+.06*eased})`;
  mini.style.opacity=nameEl.style.opacity=clamp((p-.42)/.25,0,1);
  sticky.classList.toggle('final',p>.72);
  header.classList.toggle('show',p>.9);
}
addEventListener('scroll',onScroll,{passive:true});onScroll();
addEventListener('pointermove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});document.querySelectorAll('.reveal').forEach(e=>io.observe(e));
document.querySelectorAll('[data-slider]').forEach(sl=>{let i=0;const tr=sl.querySelector('.slides'),imgs=[...tr.children],count=sl.querySelector('.count');const draw=()=>{tr.style.transform=`translateX(-${i*100}%)`;count.textContent=String(i+1).padStart(2,'0')+' / '+String(imgs.length).padStart(2,'0')};sl.querySelector('.next').onclick=()=>{i=(i+1)%imgs.length;draw()};sl.querySelector('.prev').onclick=()=>{i=(i-1+imgs.length)%imgs.length;draw()};let x=0;tr.addEventListener('pointerdown',e=>x=e.clientX);tr.addEventListener('pointerup',e=>{if(Math.abs(e.clientX-x)>45){i=(i+(e.clientX<x?1:-1)+imgs.length)%imgs.length;draw()}});draw()});
const lb=document.querySelector('.lightbox'),lbi=lb.querySelector('img');document.querySelectorAll('.tile').forEach(b=>b.onclick=()=>{lbi.src=b.dataset.img;lb.classList.add('open');lb.setAttribute('aria-hidden','false')});const close=()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true')};lb.querySelector('.close').onclick=close;lb.onclick=e=>{if(e.target===lb)close()};addEventListener('keydown',e=>{if(e.key==='Escape')close()});

// Mobile/production refinements
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion){document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
document.querySelectorAll('video').forEach(v=>{
  v.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==v&&!other.paused) other.pause();}));
});
