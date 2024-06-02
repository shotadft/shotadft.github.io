$(document).ready(function() {
  $('.copyButton').click(function() {
    const txt = document.getElementsByClassName('copyText');
    for (let i = 0, len = txt.length | 0; i < len; i = (i + 1) | 0) {
      console.log(`${txt[i].value}`);
      navigator.clipboard.writeText(`${txt[i].value}`).then(
        () => { console.log("クリップボードにコピーしました"); },
        () => { console.error("コピーに失敗しました"); }
      );
    }
  });
});
