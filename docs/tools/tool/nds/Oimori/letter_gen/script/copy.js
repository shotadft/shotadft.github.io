$(async function(){
    const b = document.getElementsByClassName('copy');
    if (typeof b.value !== 'undefined') {
		 await navigator.clipboard.writeText(b.value);
    }
});
