window.onload = () => {
  const txt = document.getElementsByClassName('copyText');
  const btn = document.getElementsByClassName('copy');

  btn.onclick = () => {
    if (!navigator.clipboard) { console.error("このブラウザは\"navigator.clipboard\"に対応していません\nEdge, Chrome, Firefox等対応ブラウザを使用して下さい"); return false; }
    if (!txt.value) {
      navigator.clipboard.writeText(txt.value).then(
        () => { console.log("クリップボードにコピーしました") },
        () => { console.log("コピーに失敗しました") }
      );
    }
  }
}
