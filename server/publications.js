Meteor.publish('posts', function(options, searchTexts) {
  searchTexts = searchTexts || '';
  check(options, {
    sort: Object,
    limit: Number
  });
  if (searchTexts == '') {
    return Posts.find({},options);
  } else {
    var doc = {};
    var postIds = searchPosts(searchTexts);
    if (postIds) {
        doc._id = {
            $in: postIds
        };
    };
    return Posts.find(doc, options);
  };
}); 

Meteor.publish('singlePost', function(id) {
  check(id, String);
  return Posts.find({id: id});
});

Meteor.publish('sections', function(id) {
  check(id, String);
  return Sections.find({_id: id});
});

Meteor.publish('comments', function(){
  return Comments.find();
});

Meteor.publish('users', function(){
  return Meteor.users.find({},{fields: {'profile':1}});
});
