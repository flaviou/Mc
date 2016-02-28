Template.postItem.helpers({
  popup_msg: function () {
    if (Meteor.user()) {
      return "";
    } else {
      return "Login para votar";
    }
  },
  post_lead: function() {
    return jQuery(this.content).text().split(' ').slice(0,29).join(' ') + '...';
  }
});

Template.postItem.events({
	"click .js-upvote":function(event){
		var post = Posts.findOne({id: this.id});
		Meteor.call('upvotePost', post);
		return false;// prevent the button from reloading the page
	}
});
