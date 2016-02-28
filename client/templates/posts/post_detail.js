Template.postDetail.helpers({
  mContent: function(){
// console.log('mContent');
    var mImage = document.createElement('div');
    mImage.innerHTML = this.content;
//console.log(mImage);
    var imgs = mImage.getElementsByTagName('img');
//console.log(imgs.length);
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].setAttribute('class','img-responsive col-xs-12');
      imgs[i].removeAttribute('width');
      imgs[i].removeAttribute('height');
//console.log(imgs[i]);
    }
    var frames = mImage.getElementsByTagName('iframe');
    for (var i = 0; i < frames.length; i++) {
      frames[i].setAttribute('class','img-responsive col-xs-12');
      frames[i].removeAttribute('width');
      frames[i].removeAttribute('height');
//console.log(frames[i]);
    }

//console.log(mImage);
    return mImage.innerHTML;
  }
});
