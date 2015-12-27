Meteor.startup(function(){
	if (Meteor.users.find().count() == 1) {
		user = Meteor.users.findOne();
		Roles.addUsersToRoles(user._id, ['admin']);
	}
});
