Meteor.users.allow({
	remove: function(userId, doc) {
		// only for Administrators
		return (Roles.userIsInRole(userId, 'admin'));
	},
	update: function(userId, doc) {
		// only for Administrators
		return (Roles.userIsInRole(userId, 'admin') || (doc._id == userId));
	}
});
