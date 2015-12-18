Meteor.startup(function() {
 if(Meteor.isClient){
      return SEO.config({
        title: 'Morando no Canadá',
        meta: {
          'description': 'Coletânea de blogs de brasileiros morando no Canadá'
        },
      });
    }
});
