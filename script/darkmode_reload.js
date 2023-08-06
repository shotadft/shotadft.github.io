let isDarkmode = false;

const darkmodeDOM = document;

// オブザーバーを作る
const observer = new IntersectionObserver(() => {
  isDarkmode = (location.reload();)
})

// darkmodeDOMの監視開始
observer.observe(darkmodeDOM);
