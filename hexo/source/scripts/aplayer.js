!(function() {
  var oldLoadAp = window.onload;
  window.onload = function () {
    oldLoadAp && oldLoadAp();

    new APlayer({
      container: document.getElementById('aplayer'),
      fixed: true,
      autoplay: false,
      loop: 'all',
      order: 'random',
      theme: '#b7daff',
      preload: 'none',
      audio: [
        {
          name: '少女綺想曲　～ Dream Battle',
          artist: '上海アリス幻樂団',
          url: '/music/上海アリス幻樂団 - 少女綺想曲　～ Dream Battle.mp3',
          cover: '/images/东方永夜抄.jpg'
        }
      ]
    });
  }
})();

