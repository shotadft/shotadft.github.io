$(function(){
    const b = document.getElementsByClassName('copy');
    if (typeof b.value !== 'undefined') {
		navigator.clipboard.writeText(b.value);
    }
});
