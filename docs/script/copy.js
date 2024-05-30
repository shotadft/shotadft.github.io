document.addEventListener("DOMContentLoaded", () => {
  const txt = document.getElementsByClassName('copyText')[0],
    btn = document.getElementById('copyButton');

  btn.addEventListener('click', a);
  function a(){
    console.log(txt.value);
    if (!txt.value) {
      navigator.clipboard.writeText(txt.value).then(
        () => { console.log("クリップボードにコピーしました"); },
        () => { console.error("コピーに失敗しました"); }
      );
    }
  }
});
