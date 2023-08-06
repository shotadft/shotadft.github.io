setInterval(() => {
if(window.matchMedia('(prefers-color-scheme: dark)').matches == true)
{
  reload();
}
else
{
  ;
}
}, 1000);
