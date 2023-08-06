setInterval(() => {
if(window.matchMedia('(prefers-color-scheme: dark)').matches == true)
{
  location.reload();
}
else
{
  ;
}
}, 500);
