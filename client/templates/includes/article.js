Template.article.helpers({
  shareData: function() {
    return { title: this.title, url: 'http://morandonocanada.com/posts/' + this.blog.id + '/' + this.id }
  }
});
