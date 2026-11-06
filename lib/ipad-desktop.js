/**
 * iPad in modalità "sito desktop" (iPadOS/Chrome/Safari): il browser si presenta come Mac e ignora il meta viewport. La pagina viene
 * disegnata con una larghezza di layout fissa più grande dello schermo (~1024 pt su un iPad mini da 744 pt, scala 1:1): il menu completo
 * esce a destra e si scorre in orizzontale. Il layout "tablet" (hamburger, due colonne) non può attivarsi: le media query valutano la
 * larghezza del layout (1024), non quella dello schermo, e nessuna classe su <html> le cambia.
 *
 * Adattamento: stessa pagina desktop, rimpicciolita con CSS `zoom` alla larghezza visibile (regole in styles/globals.css, `html.ipad-desktop`).
 * `zoom` da solo non basta: la pagina si ridistribuirebbe su più spazio e riempirebbe di nuovo la larghezza di layout. Per questo si fissa anche
 * la larghezza di <html> alla larghezza di layout (--ipad-layout, es. 1024px): resa finale = 1024 × (744/1024) = 744 pt.
 *
 * Lo script gira in <head>, bloccante, prima del primo paint (nessun salto di pagina). Si attiva SOLO se TUTTE queste condizioni valgono:
 *   1. navigator.platform === "MacIntel" e maxTouchPoints > 1  → iPad che si presenta come Mac. Mac veri (maxTouchPoints 0), telefoni
 *      e iPad in modalità mobile (platform "iPad"/"iPhone") non cambiano.
 *   2. la larghezza di layout (innerWidth) è maggiore di quella visibile (visualViewport.width) con scala ≈ 1  → la pagina è davvero
 *      più larga dello schermo. Se Safari ha già rimpicciolito la pagina (scala < 1, visualViewport.width = innerWidth) non si tocca nulla.
 * Se l'utente ingrandisce con le dita (scala > 1) lo stato resta quello di prima. Si ricalcola a ogni resize/orientationchange
 * (verticale ↔ orizzontale): in orizzontale la pagina sta nello schermo e la classe si toglie da sola.
 * Scritto in ES5, senza dipendenze, dentro try/catch: se qualcosa non c'è, il sito resta com'è.
 */
const ipadDesktopScript = `(function(){try{
var d=document.documentElement,t=null,C='ipad-desktop';
function calc(){
  var vv=window.visualViewport;
  if(!(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1&&vv))return;
  if(vv.scale>1.01)return;
  var layout=window.innerWidth,vis=vv.width;
  if(layout>vis+1&&vis>0){
    d.classList.add(C);
    d.style.setProperty('--ipad-zoom',(vis/layout).toFixed(4));
    d.style.setProperty('--ipad-layout',layout+'px');
  }else if(d.classList.contains(C)){
    d.classList.remove(C);
    d.style.removeProperty('--ipad-zoom');
    d.style.removeProperty('--ipad-layout');
  }
}
function soon(){clearTimeout(t);t=setTimeout(calc,120);}
calc();
window.addEventListener('resize',soon);
window.addEventListener('orientationchange',function(){soon();setTimeout(calc,500);});
if(window.visualViewport)window.visualViewport.addEventListener('resize',soon);
}catch(e){}})();`;

module.exports = { ipadDesktopScript };
