$(function(){
    const btn = document.getElementsByClassName('copy');
    const txt = document.getElementById('text').value;

    btn.onclick = () => {
      navigator.clipboard.writeText(txt);
    }
});
