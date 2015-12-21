Template.postItem.helpers({
	popup_msg: function () {
		if (Meteor.user()) {
			return "";
		} else {
			return "Login para votar";
		}
	}
});

Template.postItem.events({
	"click .js-upvote":function(event){
		var post = Posts.findOne({id: this.id});
		Meteor.call('upvotePost', post);
		return false;// prevent the button from reloading the page
	}
});
