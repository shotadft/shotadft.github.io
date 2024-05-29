document.addEventListener("DOMContentLoaded", () => {
  const txt = document.getElementById('copyText');
  const btn = document.getElementById('copy');

  btn.onclick = () => {
    if (!navigator.clipboard) { console.error("このブラウザは\"navigator.clipboard\"に対応していません\nEdge, Chrome, Firefox等対応ブラウザを使用して下さい"); return false; }
    if (typeof txt.value !== 'undefined') {
      navigator.clipboard.writeText(txt.value).then(
        () => { console.log("クリップボードにコピーしました") },
        () => { console.log("コピーに失敗しました") }
      );
    }
  }
});
