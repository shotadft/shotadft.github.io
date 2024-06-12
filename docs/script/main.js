$(function(){mySetupHighlightJS();setUpAccordion();var b=$("#page_top");b.hide(),$(window).scroll(function(){80<$(this).scrollTop()?b.fadeIn():b.fadeOut()}),b.click(function(){return $("body,html").animate({scrollTop:0},10),!1})});function isSmartPhone(){return!!navigator.userAgent.match(/iPhone|Android.+Mobile/)}const setUpAccordion=()=>{const c=document.querySelectorAll(".js-details"),e="is-opened";c.forEach(b=>{const a=b.querySelector(".js-summary"),f=b.querySelector(".js-content");a.addEventListener("click",a=>{a.preventDefault(),b.classList.contains(e)?(b.classList.toggle(e),closingAnim(f,b).restart()):(b.classList.toggle(e),b.setAttribute("open","true"),openingAnim(f).restart())})})},closingAnim=(c,a)=>gsap.to(c,{height:0,opacity:0,duration:.4,ease:"power3.out",overwrite:!0,onComplete:()=>{a.removeAttribute("open")}}),openingAnim=b=>gsap.fromTo(b,{height:0,opacity:0},{height:"auto",opacity:1,duration:.4,ease:"power3.out",overwrite:!0});!function(){let e=document.querySelector(".cookie-consent"),t=document.querySelector(".cookie-agree");var o=localStorage.getItem("popupFlag");if(null!=o){o=JSON.parse(o);if("true"==o.value)setTimeout(a,2e3);else{const l=new Date;l.getTime()>o.expire&&(i("popupFlag","true",365),setTimeout(a,2e3))}}else i("popupFlag","true",365),setTimeout(a,2e3);function i(e,t,o){const i=new Date;o={value:t,expire:o=i.getTime()+24*o*3600*1e3};localStorage.setItem(e,JSON.stringify(o))}function a(){e.classList.add("is-show")}t.addEventListener("click",()=>{e.classList.add("cc-hide"),i("popupFlag","false",365)})}();/* fetch("https://ipinfo.io?callback").then(a=>a.json()).then(a=>console.log('接続元のグローバルIPアドレス: ' + a.ip)); */

function mySetupHighlightJS() {
  // Highlight.js プラグインの定義
  hljs.addPlugin({
    "after:highlightElement": ({ el, result, text }) => {
      const pre = el.parentElement;
      // 行番号を表示
      addLineNumbers(el, result, pre);
      // コピーボタンを表示
      copyCode(text, pre);
      // 言語名を表示
      showLanguage(el, result, pre);
    },
  });

  function showLanguage(el, result, pre) {
    if(result.language && !pre.classList.contains('show-no-lang')) {
      el.dataset.language = result.language;
    }
  }

  function copyCode(text, pre) {
    if (pre && !pre.classList.contains("no-copy")) {
      const copyButton = document.createElement("button");
      copyButton.setAttribute("class", "hljs-copy-btn");
      copyButton.textContent = "Copy";
      pre.after(copyButton);
      pre.querySelector("code").classList.add("copy-btn-added");
      copyButton.addEventListener("click", () => {
        copyToClipboard(copyButton, text);
      });
    }
    function copyToClipboard(btn, text) {
      if (!navigator.clipboard) {
        alert("Sorry, can not copy");
      }
      navigator.clipboard.writeText(text).then(
        () => {
          btn.textContent = "Copied";
          resetCopyBtnText(btn, 1500);
        },
        (error) => {
          btn.textContent = "Failed";
          resetCopyBtnText(btn, 1500);
          console.log(error.message);
        }
      );
    }
    function resetCopyBtnText(btn, delay) {
      setTimeout(() => {
        btn.textContent = "Copy";
      }, delay);
    }
  }

  function addLineNumbers(el, result, pre) {
    if (pre && !pre.classList.contains("no-line-num")) {
      el.innerHTML = result.value.replace(
        /^/gm,
        '<span class="line-num"></span>'
      );
    }
  }

  const wrapperClass = "hljs-wrap";
  const highlightCodeByDefault = true;
  const noHighlightClass = "no-highlight";
  const highlightClass = "highlight";
  const blockCodeElems = document.getElementsByClassName("wp-block-code");

  if(blockCodeElems.length > 0) {
    if(highlightCodeByDefault) {
      for (const elem of blockCodeElems) {
        if(!elem.classList.contains(noHighlightClass)) {
          initHighlightJs(elem);
        }
      }
    }else{
      for (const elem of blockCodeElems) {
        if(elem.classList.contains(highlightClass)) {
          initHighlightJs(elem);
        }
      }
    }
  }

  function initHighlightJs(elem) {
    const wrapper = document.createElement("div");
    wrapper.className = wrapperClass;
    elem.insertAdjacentElement("beforebegin", wrapper);
    wrapper.appendChild(elem);
    hljs.highlightElement(wrapper.querySelector("code"));
  }
}