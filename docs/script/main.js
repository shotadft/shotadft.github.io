$(function(){setUpAccordion();var b=$("#page_top");b.hide(),$(window).scroll(function(){80<$(this).scrollTop()?b.fadeIn():b.fadeOut()}),b.click(function(){return $("body,html").animate({scrollTop:0},10),!1})});function isSmartPhone(){return!!navigator.userAgent.match(/iPhone|Android.+Mobile/)}const setUpAccordion=()=>{const c=document.querySelectorAll(".js-details"),e="is-opened";c.forEach(b=>{const a=b.querySelector(".js-summary"),f=b.querySelector(".js-content");a.addEventListener("click",a=>{a.preventDefault(),b.classList.contains(e)?(b.classList.toggle(e),closingAnim(f,b).restart()):(b.classList.toggle(e),b.setAttribute("open","true"),openingAnim(f).restart())})})},closingAnim=(c,a)=>gsap.to(c,{height:0,opacity:0,duration:.4,ease:"power3.out",overwrite:!0,onComplete:()=>{a.removeAttribute("open")}}),openingAnim=b=>gsap.fromTo(b,{height:0,opacity:0},{height:"auto",opacity:1,duration:.4,ease:"power3.out",overwrite:!0});/* fetch("https://ipinfo.io?callback").then(a=>a.json()).then(a=>console.log('接続元のグローバルIPアドレス: ' + a.ip)); */

(function() {
  let cc = document.querySelector('.cookie-consent');
  let ca = document.querySelector('.cookie-agree');
  const flag = localStorage.getItem('popupFlag');
  if (flag != null) {
    const data = JSON.parse(flag);
    if (data['value'] == 'true') {
      window.onscroll = () => {
        if (window.pageYOffset) {
          popup();
        }
      }
    } else {
      const current = new Date();
      if (current.getTime() > data['expire']) {
        setWithExpiry('popupFlag', 'true', 365);
        window.onscroll = () => {
          if (window.pageYOffset) {
            popup();
          }
        }
      }      
    }
  } else {
    setWithExpiry('popupFlag', 'true', 365);
    window.onscroll = () => {
      if (window.pageYOffset) {
        popup();
      }
    }
  }
  ca.addEventListener('click', () => {
    cc.classList.add('cc-hide');
    setWithExpiry('popupFlag', 'false', 365);
  });
  
  function setWithExpiry(key, value, expire) {
    const current = new Date();
    expire = current.getTime() + expire * 24 * 3600 * 1000;
    const item = {
      value: value,
      expire: expire
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  function popup() {
    if (!cc.classList.add())
        cc.classList.add('is-show');
  }
}());
