$(async function(){
    const btn = document.getElementsByClassName('copy');
    const txt = document.getElementById('text').textContent;

    btn.onclick = () => {
      await navigator.clipboard.writeText(txt);
    }
});
