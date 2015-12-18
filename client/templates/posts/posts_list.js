Template.postsList.helpers({
  posts: function() {
    return Posts.find({},{sort:{published:-1}});
  }
});
