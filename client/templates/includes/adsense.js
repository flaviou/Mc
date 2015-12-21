Template.adsense.rendered = function() {
  $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js", function() {
    var ads, adsbygoogle;
    ads = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-2244578109608994" data-ad-slot="1759344528" data-ad-format="auto"></ins>';
    $('.ad').html(ads);
    return (adsbygoogle = window.adsbygoogle || []).push({});
  });
};

Template.adsense.events({
  "change": function() {
    Session.set("refresh_template", this.Date());
  }
});

Template.adsense.helpers({
  refresh_template: function() {
    return Session.get("refresh_template");
  }
});
/*
Template.adsense.refresh_template = function() {
  return Session.get("refresh_template");
};
*/
