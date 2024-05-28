$(async function(){
    const b = document.getElementsByClassName('copy');
	  await navigator.clipboard.writeText(b.value);
});
