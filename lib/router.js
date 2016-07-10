Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
	return Meteor.subscribe('users');
  }
});

Router.route('/sitemap.xml', function() { 
  var res = this.response;
  var posts = Posts.find();
  res.write('<?xml version="1.0" encoding="UTF-8"?>\n');
  res.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'); 
  res.write('http://morandonocanada.com/\n');
  res.write('<url><loc>http://morandonocanada.com/imigrar</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/estudar</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/viajar</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Calgary</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Edmonton</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Halifax</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Montreal</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Ottawa</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Regina</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Saskatoon</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Toronto</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Vancouver</loc></url>\n');
  res.write('<url><loc>http://morandonocanada.com/cidade/Winnipeg</loc></url>\n');
  posts.forEach(function(doc) {
    res.write('<url><loc>http://morandonocanada.com/posts/' + doc.blog.id + '/' + doc.id + '</loc></url>\n');
  });
  res.end('</urlset>');
},{where:'server'});

Router.route('/Entry/Details/:id', function () {
  this.redirect('/posts/twitter/' + this.params.id);
});

Router.route('/posts/:blogid/:id', {
  name: 'postPage',
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost',this.params.id)
    ];
  },
  data: function() { return Posts.findOne({id: this.params.id}); },
  onAfterAction: function() {
    var post;
          // The SEO object is only available on the client.
      // Return if you define your routes on the server, too.
      if (!Meteor.isClient) {
        return;
      }
      post = Posts.findOne({id: this.params.id});
      SEO.set({
        title: post.title,
        meta: {
          'description': post.title,
          'keywords': post.labels.join(),
          'author': post.author.displayName
        }
      });
  }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 12, 
  postsLimit: function() { 
    var limit = parseInt(this.params.postsLimit) || this.increment;
    Session.set("postsLimit", limit);
    return limit; 
  },
  findOptions: function() {
    return {sort: {published: -1}, limit: this.postsLimit()};
  },
  posts: function() {
    return Posts.find({}, this.findOptions(), '');
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    };
  },
  yieldTemplates: {
    'adsense': {to: 'ad'},
    'adsense2': {to: 'ad2'}
  },
  action: function() {
    this.render('adsense', {to: 'ad'});
    this.render('adsense2', {to: 'ad2'});
    this.render();
  }
});

PostsListControllerTudo = PostsListController.extend({
//  name: "tudoPosts",
  subscriptions: function() {
console.log('PostListControllerTudo subscription');
    this.postsSub = Meteor.subscribe('posts', this.findOptions(),'');
  },
  nextPath: function() {
console.log('PostListControllerTudo nextPath');
    return Router.routes.tudoPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerImigrar = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'immigration trabalho processo imigrar imigracao imigração visa visto');
  },
  nextPath: function() {
    return Router.routes.imigrarPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerEstudar = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'escola school classe education educação aula csf estágio estagiário estudar estudo estudante study student aprender aprendendo learn');
  },
  nextPath: function() {
    return Router.routes.estudarPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerViajar = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'viajar viagem viagens viajante travel turismo turista tourism tour passeio visitar visa visto');
  },
  nextPath: function() {
    return Router.routes.viajarPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerCalgary = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Calgary');
  },
  nextPath: function() {
    return Router.routes.calgaryPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerEdmonton = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Edmonton');
  },
  nextPath: function() {
    return Router.routes.edmontonPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerHalifax = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Halifax');
  },
  nextPath: function() {
    return Router.routes.halifaxPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerMontreal = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Montreal Quebec');
  },
  nextPath: function() {
    return Router.routes.montrealPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerOttawa = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Ottawa');
  },
  nextPath: function() {
    return Router.routes.ottawaPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerRegina = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Regina');
  },
  nextPath: function() {
    return Router.routes.reginaPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerSaskatoon = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Saskatoon');
  },
  nextPath: function() {
    return Router.routes.saskatoonPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerToronto = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Toronto');
  },
  nextPath: function() {
    return Router.routes.torontoPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerVancouver = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Vancouver');
  },
  nextPath: function() {
    return Router.routes.vancouverPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerWinnipeg = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions(), 'Winnipeg');
  },
  nextPath: function() {
    return Router.routes.winnipegPosts.path({postsLimit: this.postsLimit() + this.increment})
  }
});

PostsListControllerTag = PostsListController.extend({
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('postsByTag', this.findOptions(), this.params.tag);
  },
  nextPath: function() {
    return Router.routes.postsByTag.path({postsLimit: this.postsLimit() + this.increment})
  }
});

Router.route('/', {
  name: 'home',
  controller: PostsListControllerTudo
});

Router.route('/tudo/:postsLimit?', { 
  name: 'tudoPosts',
  controller: PostsListControllerTudo
});

Router.route('/imigrar/:postsLimit?', {
  name: 'imigrarPosts',
  controller: PostsListControllerImigrar
});

Router.route('/estudar/:postsLimit?', {
  name: 'estudarPosts',
  controller: PostsListControllerEstudar
});

Router.route('/viajar/:postsLimit?', {
  name: 'viajarPosts',
  controller: PostsListControllerViajar
});

Router.route('/cidade/Calgary:postsLimit?', {
  name: 'calgaryPosts',
  controller: PostsListControllerCalgary
});

Router.route('/cidade/Edmonton:postsLimit?', {
  name: 'edmontonPosts',
  controller: PostsListControllerEdmonton
});

Router.route('/cidade/Halifax:postsLimit?', {
  name: 'halifaxPosts',
  controller: PostsListControllerHalifax
});

Router.route('/cidade/Montreal:postsLimit?', {
  name: 'montrealPosts',
  controller: PostsListControllerMontreal
});

Router.route('/cidade/Ottawa:postsLimit?', {
  name: 'ottawaPosts',
  controller: PostsListControllerOttawa
});

Router.route('/cidade/Regina:postsLimit?', {
  name: 'reginaPosts',
  controller: PostsListControllerRegina
});

Router.route('/cidade/Saskatoon:postsLimit?', {
  name: 'saskatoonPosts',
  controller: PostsListControllerSaskatoon
});

Router.route('/cidade/Toronto:postsLimit?', {
  name: 'torontoPosts',
  controller: PostsListControllerToronto
});

Router.route('/cidade/Vancouver:postsLimit?', {
  name: 'vancouverPosts',
  controller: PostsListControllerVancouver
});

Router.route('/cidade/Winnipeg:postsLimit?', {
  name: 'winnipegPosts',
  controller: PostsListControllerWinnipeg
});

Router.route('/tag/:tag/:postsLimit?', {
  name: 'postsByTag',
  controller: PostsListControllerTag
});

Router.route('/users', {
	name: 'usersList',
	template: 'usersList',
	data: function() {
		if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
			Meteor.users.find();
		} else {
			if (Meteor.isClient) {
				Router.go('/');
				throwError('Access Denied');
			}
		}
	}
});

Router.route('/user/:id', {
  name: 'userEdit',
  template: 'userEdit',
  data: function() { return Meteor.users.findOne({_id: this.params.id}); },
});

Router.route('/profileEdit', function() {
	this.render('profileEdit');
});
Router.route('/google35cbe082381056f0.html', function() {
  var req = this.request;
  var res = this.response;
  res.end('google-site-verification: google35cbe082381056f0.html');
}, {where: 'server'});

Router.route('/login', {
  name: 'login',
  template: 'login'
});


Router.onBeforeAction('dataNotFound', {only: 'postPage'});

if (Meteor.isClient) {
  ShareIt.init({
    siteOrder: ['facebook', 'twitter', 'pinterest', 'googleplus'],
    iconOnly: false,
    applyColors: false
  });
}
