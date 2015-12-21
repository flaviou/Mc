Meteor.methods({
	upvotePost: function (doc) {
		var loggedInUser = Meteor.user();
//		Voter has to identified
		if (loggedInUser) {
//			And cannot vote more than once
			if (!Posts.findOne({$and: [{_id: doc._id}, {votedBy: loggedInUser._id}]})) {
				Posts.update({_id: doc._id}, {$inc: {upvotes: 1}});
				Posts.update({_id: doc._id}, {$addToSet: {votedBy: loggedInUser._id}});
			}
		}
	}
});
