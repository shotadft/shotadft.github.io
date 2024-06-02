$(document).ready(function () {
  $('.copyButton').click(function () {
    const txt = document.getElementsByClassName('copyText');
    let bTxt = $('.copyButton').txt();
    for (let i = 0, len = txt.length | 0; i < len; i = (i + 1) | 0) {
      console.log(`${txt[i].value}`);
      navigator.clipboard.writeText(`${txt[i].value}`).then(
        () => { console.log("クリップボードにコピーしました"); $('.copyButton').txt('Copied!'); setTimeout(function () { $('.copyButton').txt(bTxt); }, 2000); },
        () => { console.error("コピーに失敗しました"); }
      );
    }
  });
});
