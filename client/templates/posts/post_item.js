Template.postItem.helpers({
/*
  popup_msg: function () {
    if (Meteor.user()) {
      return "";
    } else {
      return "Login para votar";
    }
  },
*/
  post_lead: function() {
    return this.content.replace(/<(?:.|\n)*?>/gm, '').replace(/&nbsp;/g,'').split(' ').slice(0,30).join(' ').concat('...');
//    return jQuery(this.content).text().split(' ').slice(0,30).join(' ').concat('...');
  }
});

Template.postItem.events({
  "click .js-upvote":function(event){
    if (Meteor.user()) {
      var post = Posts.findOne({id: this.id});
      Meteor.call('upvotePost', post);
      return false;// prevent the button from reloading the page
    } else {
      window.location.href ="./login";
    }
  }
});
