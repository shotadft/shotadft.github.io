$(function(){mySetUpHljsPlugins(myCustomHighlightJsSettings);mySetupHighlightJs(myCustomHighlightJsSettings);myAddAccordionPanel(myCustomHighlightJsSettings.accordionClassName);mySetupToggleDetailsAnimation();setUpAccordion();var b=$("#page_top");b.hide(),$(window).scroll(function(){80<$(this).scrollTop()?b.fadeIn():b.fadeOut()}),b.click(function(){return $("body,html").animate({scrollTop:0},10),!1})});function isSmartPhone(){return!!navigator.userAgent.match(/iPhone|Android.+Mobile/)}const setUpAccordion=()=>{const c=document.querySelectorAll(".js-details"),e="is-opened";c.forEach(b=>{const a=b.querySelector(".js-summary"),f=b.querySelector(".js-content");a.addEventListener("click",a=>{a.preventDefault(),b.classList.contains(e)?(b.classList.toggle(e),closingAnim(f,b).restart()):(b.classList.toggle(e),b.setAttribute("open","true"),openingAnim(f).restart())})})},closingAnim=(c,a)=>gsap.to(c,{height:0,opacity:0,duration:.4,ease:"power3.out",overwrite:!0,onComplete:()=>{a.removeAttribute("open")}}),openingAnim=b=>gsap.fromTo(b,{height:0,opacity:0},{height:"auto",opacity:1,duration:.4,ease:"power3.out",overwrite:!0});!function(){let e=document.querySelector(".cookie-consent"),t=document.querySelector(".cookie-agree");var o=localStorage.getItem("popupFlag");if(null!=o){o=JSON.parse(o);if("true"==o.value)setTimeout(a,2e3);else{const l=new Date;l.getTime()>o.expire&&(i("popupFlag","true",365),setTimeout(a,2e3))}}else i("popupFlag","true",365),setTimeout(a,2e3);function i(e,t,o){const i=new Date;o={value:t,expire:o=i.getTime()+24*o*3600*1e3};localStorage.setItem(e,JSON.stringify(o))}function a(){e.classList.add("is-show")}t.addEventListener("click",()=>{e.classList.add("cc-hide"),i("popupFlag","false",365)})}();/* fetch("https://ipinfo.io?callback").then(a=>a.json()).then(a=>console.log('接続元のグローバルIPアドレス: ' + a.ip)); */

/* 行数を指定して表示する機能を削除したバージョン（最もシンプルなバージョン） updated on: 2024/03/31  */
const myCustomHighlightJsSettings = {
  wrapperClassName: 'hljs-wrap',
  useInlineHighlight: true,
  inlineHighlightClassName: 'highlight',
  accordionClassName: 'toggle-accordion'
}

function mySetUpHljsPlugins(settings) {
  const { wrapperClassName, useInlineHighlight } = settings;
  const preWrapOnInit = false;
  const noCopyBtnOnInit = false;
  const noLineNumOnInit = document.body.classList.contains('no-line-num') ? true  : false;
  const useToolbar = document.body.classList.contains('no-toolbar') ? false  : true;
  const lineAutoWrapLabel = 'wrap';
  const lineNumLabel = 'number';
  const copyBtnLabel = 'Copy';
  const copyBtnCompleteLabel = 'Copied';
  const copyBtnFailedLabel = 'Failed';
  const copyFailedMessage = 'Sorry, can not copy with this browser.';

  hljs.addPlugin({
    'after:highlightElement': ({ el, result, text }) => {
      const wrapper = el.closest('.' + wrapperClassName);
      const pre = el.parentElement;
      if(wrapper && pre) {
        showLanguage(el, result, wrapper);
        copyCode(text, pre);
        addLineNumbers(el, result, wrapper, pre);
        highlightNumbers(el, pre);
        //setMaxHeight(el, wrapper, pre);
        setUpWrapper(el, wrapper, pre);
      }
    }
  });

  function showLanguage(el, result, wrapper) {
    if (el.classList.contains('show-no-lang')) {
      if (wrapper) wrapper.classList.add('no-lang');
      return;
    }
    if (el.hasAttribute('data-set-lang')) {
      addLanguageSpan(el.getAttribute('data-set-lang'));
      return;
    }
    if (result.language) {
      if (useToolbar) {
        addLanguageSpan(result.language);
      } else {
        el.dataset.language = result.language;
      }
    }
    function addLanguageSpan(language) {
      const languageSpan = document.createElement('span');
      languageSpan.setAttribute('class', 'lng-span');
      languageSpan.textContent = language;
      const wrapper = el.closest('.' + wrapperClassName);
      if (wrapper && !wrapper.classList.contains('no-toolbar')) {
        wrapper.appendChild(languageSpan);
      } else if (wrapper && wrapper.classList.contains('no-toolbar')) {
        el.dataset.language = language;
      }
    }
  }

  function copyCode(text, pre) {
    const preClass = pre.classList;
    if (preClass.contains('no-copy-btn')) return;
    if (noCopyBtnOnInit && !preClass.contains('show-copy-btn')) return;
    if (useInlineHighlight && pre.nodeName !== 'PRE') return;
    const copyButton = document.createElement('button');
    copyButton.setAttribute('class', 'hljs-copy-btn');
    copyButton.textContent = copyBtnLabel;
    pre.after(copyButton);
    copyButton.addEventListener('click', () => {
      copyToClipboard(copyButton, text)
    });
    function copyToClipboard(btn, text) {
      if (!navigator.clipboard) {
        alert(copyFailedMessage);
      }
      if(preClass.contains('no-scroll') && pre.hasAttribute('data-max-lines')) {
        let startLine =  1;
        let endLine = parseInt(pre.getAttribute('data-max-lines'));
        if(pre.hasAttribute('data-scroll-to')) {
          const scrollTo = parseInt(pre.getAttribute('data-scroll-to'));
          if(scrollTo) {
            startLine = scrollTo;
            endLine += scrollTo -1;
          }
        }
        if (pre.hasAttribute('data-line-num-start')) {
          const startNumber = parseInt(pre.getAttribute('data-line-num-start'));
          if(startNumber) {
            startLine -= startNumber -1;
            endLine -= startNumber -1;
          }
        }
        const textArray = text.split(/\r?\n/);
        let visibleText = '';
        if(startLine >=1 && endLine < textArray.length){
          for(let i=startLine-1; i<=endLine-1; i++) {
            if(i !== endLine-1) {
              visibleText += textArray[i] + "\n";
            }else{
              visibleText += textArray[i];
            }
          }
        }
        text = visibleText;
      }
      if (preClass.contains('copy-no-prompt')) {
        text = text.replace(/^\$\s|^%\s/gm, '');
      }
      if (preClass.contains('copy-no-sl-comments') || preClass.contains('copy-no-comments')) {
        text = text.replace(/^([^\S\r\n]*\/\/).*$\r?\n?/gm, "").replace(/(.*)\s\/\/.*/g, "$1");
      }
      if (preClass.contains('copy-no-ml-comments') || preClass.contains('copy-no-comments')) {
        text = text.replace(/^(.*)\/\*[\s\S]*?\*\/($\r?\n?)?/gm, replaceComments)
      }
      if (preClass.contains('copy-no-html-comments')) {
        text = text.replace(/^(.*)<!\-\-[\s\S]*?\-\->($\r?\n?)?/gm, replaceComments)
      }
      function replaceComments(match, p1, p2) {
        if (!p2) p2 = '';
        if (!p1.trim()) {
          if(p2) {
            return '';
          }
          return p1;
        } else {
          return p1 + p2;
        }
      }
      navigator.clipboard.writeText(text).then(
        () => {
          btn.textContent = copyBtnCompleteLabel;
          resetCopyBtnText(btn, 1500);
        },
        (error) => {
          btn.textContent = copyBtnFailedLabel;
          resetCopyBtnText(btn, 1500);
          console.log(error.message);
        }
      );
    };
    function resetCopyBtnText(btn, delay) {
      setTimeout(() => {
        btn.textContent = copyBtnLabel
      }, delay)
    }
  }

  function addLineNumbers(el, result, wrapper, pre) {
    el.innerHTML = result.value.replace( /^/gm, '<span class="line-num"></span>');
    let startNumOffset = 0;
    if (pre.hasAttribute('data-line-num-start')) {
      const startNumber = parseInt(pre.getAttribute('data-line-num-start'));
      if (startNumber || startNumber === 0) {
        pre.style.setProperty('counter-reset', 'lineNumber ' + (startNumber - 1));
        startNumOffset = startNumber - 1;
      }
    }
  }

  function highlightNumbers(el, pre) {
    if (pre.hasAttribute('data-line-highlight')) {
      const targetLines = pre.getAttribute('data-line-highlight');
      const highlightCode = pre.classList.contains('no-highlight-code') ? false : true;
      const highlightNumber = pre.classList.contains('no-highlight-number') ? false : true;
      const targets = targetLines.split(',').map((val) => val.trim());
      if (targets.length > 0) {
        const lineNumSpans = el.getElementsByClassName('line-num');
        const lineLength = lineNumSpans.length;
        targets.forEach((target) => {
          let startNumOffset = 0;
          if (pre.hasAttribute('data-line-num-start')) {
            const startNumber = parseInt(pre.getAttribute('data-line-num-start'));
            if (startNumber || startNumber === 0) {
              startNumOffset = startNumber - 1;
            }
          }
          const range = target.split('-');
          if (range.length === 2) {
            if (range[0] !== '') {
              const start = startNumOffset === 0 ? parseInt(range[0]) : parseInt(range[0]) - startNumOffset;
              const end = startNumOffset === 0 ? parseInt(range[1]) : parseInt(range[1]) - startNumOffset;
              if (start && end) {
                if (end >= start) {
                  for (let i = start; i <= end; i++) {
                    addClassToSpan(i);
                  }
                } else {
                  for (let i = end; i <= start; i++) {
                    addClassToSpan(i);
                  }
                }
              }
            } else {
              const negativeNum = (startNumOffset === 0 ? parseInt(range[1]) : parseInt(range[1])) * -1;
              addClassToSpan(negativeNum - startNumOffset);
            }
          } else if (range.length === 1) {
            addClassToSpan(startNumOffset === 0 ? parseInt(target) : parseInt(target) - startNumOffset);
          }
          function addClassToSpan(number) {
            if (number > 0 && number <= lineLength) {
              if (highlightCode) {
                const highlightSpan = document.createElement('span');
                highlightSpan.className = 'line-highlight';
                lineNumSpans.item(number - 1).after(highlightSpan);
              }
              if (highlightNumber) {
                lineNumSpans.item(number - 1).classList.add('line-num-highlight');
              }
            }
          }
        })
      }
    }
  }

  let index = 0;
  function setUpWrapper(el, wrapper, pre) {
    const preClass = pre.classList;
    const wrapperClass = wrapper.classList;
    if(preWrapOnInit) preClass.add('pre-wrap');
    if (pre.hasAttribute('data-label')) {
      const label = pre.getAttribute('data-label');
      let element;
      if (pre.hasAttribute('data-label-url')) {
        element = document.createElement('a');
        element.href = pre.getAttribute('data-label-url');
        element.classList.add('hljs-label-url');
        if (preClass.contains('target-blank')) {
          element.target = "_blank";
          element.rel = "noopener";
        }
      } else {
        element = document.createElement('span');
        element.classList.add('hljs-label');
      }
      element.textContent = label;
      wrapper.appendChild(element);
      wrapperClass.add('has-label');
    }
    if (preClass.contains('no-line-num')) {
      el.classList.add('hide-line-num');
    }

    if (useToolbar) {
      if (!wrapperClass.contains('no-toolbar')) {
        const toolbar = document.createElement('div');
        toolbar.setAttribute('class', 'highlight-toolbar');
        const noLineNumChecked = noLineNumOnInit ? '' : ' checked';
        let lineWrapChecked = preWrapOnInit ? ' checked' : '';
        if(preClass.contains('pre')) {
          lineWrapChecked = '';
        }else if(preClass.contains('pre-wrap')){
          lineWrapChecked = ' checked';
        }
        toolbar.innerHTML = `<input type="checkbox" id="line-auto-wrap${index}" name="line-auto-wrap"${lineWrapChecked}>
<label for="line-auto-wrap${index}">${lineAutoWrapLabel}</label>`;
        const noLineNum = preClass.contains('no-line-num');
        if (!noLineNum) {
          toolbar.insertAdjacentHTML('afterbegin', `<input type="checkbox" id="line-num-check${index}" name="line-num-check"${noLineNumChecked}>
<label for="line-num-check${index}">${lineNumLabel}</label>`);
        }
        wrapper.insertBefore(toolbar, wrapper.firstElementChild);
        const lineNumCheck = toolbar.querySelector('[name="line-num-check"]');
        if (lineNumCheck) {
          lineNumCheck.addEventListener('change', (e) => {
            if (e.currentTarget.checked) {
              el.classList.remove('hide-line-num');
            } else {
              el.classList.add('hide-line-num');
            }
          });
          if (noLineNumOnInit) {
            el.classList.add('hide-line-num');
          }
        }
        const lineAutoWrapCheck = toolbar.querySelector('[name="line-auto-wrap"]');
        lineAutoWrapCheck.addEventListener('change', (e) => {
          if (e.currentTarget.checked) {
            pre.style.setProperty('white-space', 'pre-wrap');
          } else {
            pre.style.setProperty('white-space', 'pre');
          }
        });
        const langSpan = wrapper.querySelector('.lng-span');
        if (langSpan) {
          toolbar.insertBefore(langSpan, toolbar.firstElementChild)
        }
        const copyBtn = wrapper.querySelector('.hljs-copy-btn');
        if (copyBtn) {
          toolbar.appendChild(copyBtn)
        }
      }
    }
    index ++;
  }
}

function mySetupHighlightJs(settings, targetWrapper = false) {
  const { wrapperClassName, useInlineHighlight, inlineHighlightClassName } = settings;
  const wrappers = document.getElementsByClassName(wrapperClassName);
  if (useInlineHighlight) {
    const inlineHighlightElems = document.getElementsByClassName(inlineHighlightClassName);
    for (const elem of inlineHighlightElems) {
      if (elem.parentElement.nodeName !== 'PRE') {
        hljs.highlightElement(elem);
      }
    }
  }
  if (wrappers.length > 0 && !targetWrapper) {
    for (const wrapper of wrappers) {
      hljs.highlightElement(wrapper.querySelector('pre code'));
    }
  }else if (targetWrapper) {
    const code = targetWrapper.querySelector('code');
    if(code) {
      hljs.highlightElement(code);
    }
  }
}

function myAddAccordionPanel(targetClassName, elem = null) {
  const detailsClass = 'toggle-code-animation';
  const detailsContentClass = 'details-content';
  const detailsContentWrapperClass = 'details-content-wrapper';
  if(!elem) {
    const targetElems = document.getElementsByClassName(targetClassName);
    for (const elem of targetElems) {
      addPanel(elem);
    }
  }else{
    addPanel(elem);
  }
  function addPanel(elem) {
    let summaryOpenText = "Open";
    let summaryCloseText = "Close";
    if (elem) {
      if(elem.hasAttribute('data-open-text')) {
        summaryOpenText = elem.getAttribute('data-open-text');
      }
      if(elem.hasAttribute('data-close-text')) {
        summaryCloseText = elem.getAttribute('data-close-text');
      }
      const detailsElem = document.createElement('details');
      detailsElem.classList.add(detailsClass);
      detailsElem.innerHTML = `<summary data-close-text="${summaryCloseText}">${summaryOpenText}</summary>
  <div class="${detailsContentWrapperClass}">
    <div class="${detailsContentClass}"></div>
  </div>`;
      elem.insertAdjacentElement('beforebegin', detailsElem);
      detailsElem.querySelector('.' + detailsContentClass).appendChild(elem);
    }
  }
}

function mySetupToggleDetailsAnimation(elem) {
  const accodionOpenBtnDefaultLabel = 'Open';
  const accodionCloseBtnDefaultLabel = 'Close';
  const details = document.getElementsByClassName('toggle-code-animation');
  if(elem) {
    setupAccordion(elem);
  }else{
    for(const elem of details) {
      setupAccordion(elem);
    }
  }
  function setupAccordion(elem) {
    const summary = elem.querySelector('summary');
    const content = elem.querySelector('.details-content');
    const summaryText = summary.textContent.trim() ? summary.textContent : accodionOpenBtnDefaultLabel;
    if (!summary.textContent.trim()) summary.textContent = summaryText;
    const summaryCloseText = summary.dataset.closeText ? summary.dataset.closeText : accodionCloseBtnDefaultLabel;
    let isAnimating = false;
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      if (isAnimating === true) {
        return;
      }
      if (elem.open) {
        summary.textContent = summaryText;
        isAnimating = true;
        const closeDetails = content.animate(
          {
            opacity: [1, 0],
            height: [content.offsetHeight + 'px', 0],
          },
          {
            duration: 300,
            easing: 'ease-in',
          }
        );
        const rotateIcon = summary.animate(
          { rotate: ["90deg", "0deg"] },
          {
            duration: 300,
            pseudoElement: "::before",
            easing: 'ease-in',
            fill: 'forwards',
          }
        );
        closeDetails.onfinish = () => {
          elem.removeAttribute('open');
          isAnimating = false;
        }
      } else {
        elem.setAttribute('open', 'true');
        summary.textContent = summaryCloseText;
        isAnimating = true;
        const openDetails = content.animate(
          {
            opacity: [0, 1],
            height: [0, content.offsetHeight + 'px'],
          },
          {
            duration: 300,
            easing: 'ease-in',
          }
        );
        const rotateIcon = summary.animate(
          { rotate: ["0deg", "90deg"] },
          {
            duration: 300,
            pseudoElement: "::before",
            easing: 'ease-in',
            fill: 'forwards',
          }
        );
        openDetails.onfinish = () => {
          isAnimating = false;
        }
      }
    });
  }
};