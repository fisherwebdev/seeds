define(function () {


  var transformProp = Modernizr.prefixed('transform');

  function Carousel3D ( el ) {
    this.element = el;

    this.rotation = 0;
    this.panelCount = 3;
    this.theta = 120;

  }

  Carousel3D.prototype.modify = function() {

    var panel, angle, i;

    this.panelSize = this.element.offsetWidth;

    // do some trig to figure out how big the carousel
    // is in 3D space
    this.radius = Math.round( ( this.panelSize / 2) / Math.tan( Math.PI / this.panelCount ) );

    for ( i = 0; i < this.panelCount; i++ ) {
      panel = this.element.children[i];
      angle = this.theta * i;

      // rotate panel, then push it out in 3D space
      panel.style[ transformProp ] = 'rotateY(' + angle + 'deg) translateZ(' + this.radius + 'px)';
    }

    // adjust rotation so panels are always flat
    this.rotation = Math.round( this.rotation / this.theta ) * this.theta;

    this.transform();
  };

  Carousel3D.prototype.transform = function() {
    // push the carousel back in 3D space,
    // and rotate it

    console.log(this.rotation);

    this.element.style[ transformProp ] = 'translateZ(-' + this.radius + 'px) rotateY(' + this.rotation + 'deg)';
  };

  Carousel3D.prototype.rotate = function (index) {
    this.rotation = this.theta * index * -1;
    this.transform();
  };









  var init = function() {

    var carousel = new Carousel3D( document.getElementById('seeds-stage') ),
      navButtons = document.querySelectorAll('header li');
    //,

//      onNavButtonClick = function( event ){
//        var increment = parseInt( event.target.getAttribute('data-increment'), 10 );
//        carousel.rotation += carousel.theta * increment * -1;
//        carousel.transform();
//      };

    // populate on startup
    carousel.modify();

//    for (var i=0; i < 2; i++) {
//      navButtons[i].addEventListener( 'click', onNavButtonClick, false);
//    }

//    setTimeout( function(){
//      document.body.addClassName('ready');
//    }, 0);

  };



  return Carousel3D;
});