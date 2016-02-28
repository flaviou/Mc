Handlebars.registerHelper("formatDate", function(timestamp) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    d = new Date(timestamp);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
});

Handlebars.registerHelper("domain", function(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
});

Handlebars.registerHelper("postsLimit", function() {
    return Session.get("postsLimit")
});

Handlebars.registerHelper("hasImages", function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.getElementsByTagName("img").length) > 0;
});

Handlebars.registerHelper("getFirstImage", function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var image = "";
    var images = div.getElementsByTagName("img");
    if (images.length > 0) {
      images[0].setAttribute('class','img-responsive col-xs-12');
      image = images[0].outerHTML;
    }
    return image;
});

Handlebars.registerHelper("getImages", function(html) {
    var div = document.createElement('div');
    div.innerHTML = html;
    var elements = [];
    var images = div.getElementsByTagName("img");
    for (var i=0; i< images.length; i++) {
      elements.push(images[i].outerHTML);
    }
    return elements;
});

Handlebars.registerHelper("getPostLabels", function(labels) {
    var tags = "";
    if ((labels) && (labels.length > 0)) {
      tags = "Tags: " + labels.join(", ");
    }
    return tags;
});
