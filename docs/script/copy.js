document.addEventListener("DOMContentLoaded", () => {
  const txt = document.getElementsByClassName('copyText'),
    btn = document.getElementById('copyButton');

  btn.onclick = () => {
    for (let i = 0, len = txt.length | 0; i < len; i = (i + 1) | 0) {
      if (!txt.value) {
        navigator.clipboard.writeText(txt.value).then(
          () => { console.log("クリップボードにコピーしました"); },
          () => { console.error("コピーに失敗しました"); }
        );
      }
    }
  }
});
