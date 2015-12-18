Template.adsense2.rendered = function() {
  $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
    var ads, adsbygoogle;
    ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2244578109608994" data-ad-slot="1759344528" data-ad-format="auto"></ins>';
    $('.ad2').html(ads);
    return (adsbygoogle = window.adsbygoogle || []).push({});
  });
};
