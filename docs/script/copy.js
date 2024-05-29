window.onload = () => {
  const txt = document.getElementsByClassName('copyText').value;
  const btn = document.getElementsByClassName('copy');

  btn.onclick = () => {
    if (!navigator.clipboard) { console.error("このブラウザは\"navigator.clipboard\"に対応していません\nEdge, Chrome, Firefox等対応ブラウザを使用して下さい");return false; }
    navigator.clipboard.writeText(txt.value).then(
      () => { console.log("クリップボードにコピーしました") },
      () => { console.log("コピーに失敗しました") }
    );
  }
}
