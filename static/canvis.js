




(function ( $ ) {
    if (!$.ns) {
        $.ns = {};
    };

    $.ns.cprogress = function ( el, options) {
        var base = this;
     // Access to jQuery and DOM 
     base.$el = $(el);
     base.el = el;
     base.$el.data( "ns.cprogress" , base );

     base.options = $.extend({}, $.ns.cprogress.defaultOptions, options);


     base.methods = {
         init: function () {


           //Images
           base.img1 = new Image();
           base.img1.src = base.options.img1;
           base.img2 = new Image();
           base.img2.src = base.options.img2;

           base.width = base.img1.width;
           base.height = base.img1.height;

           //main cprogress div
           base.$progress = $('<div />').addClass('jCProgress');
           mt = parseInt(base.$progress.css('marginTop').replace("ems",""));
           ml = parseInt(base.$progress.css('marginLeft').replace("ems",""));
           base.$progress.css('marginLeft',(base.$el.width()-base.width)/2+ml).css('marginTop',(base.$el.height()-base.height)/2+mt).css('opacity','0.0');

           //percent div
           base.$percent = $('<div />').addClass('percent');
           //hide?
           
           //canvas area
           base.$ctx = $('<canvas />');
           base.$ctx.attr('width',base.width);
           base.$ctx.attr('height',base.height);

           //append to target
           base.$el.prepend(base.$progress);
           base.$progress.append(base.$percent);
           base.$progress.append(base.$ctx);

           //effect
           base.$progress.animate({
               opacity: 1.0
           }, 500, function() {
           });

           //Canvas
           base.ctx = base.$ctx[0].getContext('2d');
           //Pie color/alpha
           base.ctx.fillStyle = "rgba(0,0,0,0.0)";

           //others
           base.options.percent=base.options.percent%100;
           base.i=(base.options.percent*(Math.PI*2))/100;
           base.j=0;
           base.stop = 0;
   
           //call draw method
           base.options.onInit();
           base.methods.draw();
           
       },
       reloadImages : function(){

           //Images
           base.img1 = new Image();
           base.img1.src = base.options.img1;
           base.img2 = new Image();
           base.img2.src = base.options.img2;

           base.width = base.img1.width;
           base.height = base.img1.height;

           base.$progress.css('marginLeft',(base.$el.width()-base.width)/2+ml).css('marginTop',(base.$el.height()-base.height)/2+mt);

           base.$ctx.attr('width',base.width);
           base.$ctx.attr('height',base.height);

           base.ctx = base.$ctx[0].getContext('2d');
           base.ctx.fillStyle = "rgba(0,0,0,0.0)";


       },
       coreDraw : function(){

           
           base.ctx.clearRect(0,0,base.width,base.height);
           base.ctx.save();
           base.ctx.drawImage(base.img1,0,0);
           base.ctx.beginPath();
           base.ctx.lineWidth = 5;
           base.ctx.arc(base.width/2,base.height/2,base.height/2,base.i-Math.PI/2,base.j-Math.PI/2,true);
           base.ctx.lineTo(base.width/2,base.height/2);
           base.ctx.closePath();
           base.ctx.fill();
           base.ctx.clip();
           base.ctx.drawImage(base.img2,0,0);
           base.ctx.restore();
           
       }
       ,
       draw : function () {
           if(base){

               if(base.width==0 || base.height==0){
                   base.methods.reloadImages();
               }

               if(base.options.showPercent==false){
                   base.$percent.hide();
               }
               else{
                   base.$percent.show();
               }

               if(base.stop!=1 && (base.options.percent-1)<=base.options.limit){



                   if(base.options.loop==true){
                       base.options.limit=121;
                   }
                   if(base.options.percent>=100 && base.options.percent<=base.options.limit){
                       base.i=0;
                       base.options.limit=base.options.limit-100;
                   }

                   base.methods.coreDraw();

                   base.i=base.i+base.options.PIStep;
                   base.options.percent = base.i*100/(Math.PI*2);

                   if(base.options.percent<=base.options.limit){
                       setTimeout(base.methods.draw,base.options.speed);
                       base.$percent.html(base.options.percent.toFixed(0));

                       base.options.onProgress(base.options.percent.toFixed(0));
                   }else{
                       base.$percent.html(base.options.limit);
                       base.methods.coreDraw();
                       base.options.onProgress(base.options.limit);
                       base.options.onComplete(base.options.limit);
                   }

                   base.options.percent++;
               }
           }

       },
       destroy: function(){
           base.$progress.animate({
               opacity: 0.0
           }, 500, function() {
               base.$progress.remove();
               base.stop = 1;
               base = null;
           });
       }
   };

   base.public_methods = {
       start : function(){
           base.stop = 0;
           base.methods.draw();

       },
       stop : function(){
           base.stop = 1;
       },
       reset : function(){
           base.options.percent =0;
           base.i=0;
           base.methods.draw();
       },
       destroy : function(){
           base.methods.destroy();
       },
       options: function(options){
           base.options = $.extend({}, base.options, options);
           if(options.img1 || options.img2 || options.img3){
               base.methods.reloadImages();
               base.methods.coreDraw();
           }
           base.methods.draw();
           return base.options;
       }
   };

   base.methods.init();


};

$.ns.cprogress.defaultOptions = {
   percent :0,
     //Variables
     img1: 'v1.png',
     img2: 'v2.png',
     speed: 50,
     limit : 48,
     loop : false,
     showPercent : true,
     PIStep : 0.05,
     //Funs
     onInit : function(){},
     onProgress : function(percent){},
     onComplete : function(){}
   };

   $.fn.cprogress = function( options) {
       var cprogress = (new $.ns.cprogress(this, options));
       return cprogress.public_methods;
   };

})( jQuery );


/* CSS

.jCProgress {
     position: absolute;
     z-index: 9999999;
      margin-top:-15px; offset from the center 
    }

    .jCProgress > div.percent {
         font: 18px/27px 'BebasRegular', Arial, sans-serif;
         color:#ebebeb;
         text-shadow: 1px 1px 1px #1f1f1f;
    
         position:absolute;
         margin-top:40px;
         margin-left:22px;
         text-align: center;
         width:60px;
    }

FUNCTIONS

// Create
options = {
     img1: 'v1.png',
     img2: 'v2.png',
     speed: 50,
     limit: 70,

};

myplugin = $('#p1').cprogress(options);

// Create on Event
$('#create').click(function(){
     if(!myplugin){
	  myplugin = $('#p1').cprogress(options);
     }
});

// Destroy
$('#destroy').click(function(){
     if(myplugin){
	  myplugin=myplugin.destroy();
     }
});

// Start
$('#play').click(function(){
     if(myplugin){
	  myplugin.start();
     }
});

// Stop
$('#pause').click(function(){
     if(myplugin){
	  myplugin.stop();
     }
});

// Reset
$('#reset').click(function(){
     if(myplugin){
	  myplugin.reset();
     }
});

// Change options (you can change all options, including images)
$('#speed10').click(function(){
     if(myplugin){
	  myplugin.options({speed: 10});
     }
});


USAGE

var myplugin;
$('#target').click(function(){
     if(!myplugin){
	  myplugin = $('#p1').cprogress({
	       percent: 10, // starting position
	       img1: 'v1.png', // background
	       img2: 'v2.png', // foreground
	       speed: 200, // speed (timeout)
	       PIStep : 0.05, // every step foreground area is bigger about this val
	       limit: 20, // end value
	       loop : false, //if true, no matter if limit is set, progressbar will be running
	       showPercent : true, //show hide percent
	       onInit: function(){console.log('onInit');},
	       onProgress: function(p){console.log('onProgress',p);}, //p=current percent
	       onComplete: function(p){console.log('onComplete',p);}
	  });
     }
});




@@@@@@@@@@

The markup is very light with only a wrapper and two divs which represent the progress. You’ll notice that I’m using data-attributes instead of using classes for the animation selectors. I do this because I feel that animations are more representative of a process than styling.

<div class="wrapper" data-anim="base wrapper">
  <div class="circle" data-anim="base left"></div>
  <div class="circle" data-anim="base right"></div>
</div>
First our basic styles.

.wrapper {
  width: 100px;  Set the size of the progress bar 
  height: 100px;
  position: absolute;  Enable clipping 
  clip: rect(0px, 100px, 100px, 50px); Hide half of the progress bar 
}
et the sizes of the elements that make up the progress bar 
.circle {
  width: 80px;
  height: 80px;
  border: 10px solid green;
  border-radius: 50px;
  position: absolute;
  clip: rect(0px, 50px, 100px, 0px);
}
Then onto the animation rules.

Using the data attributes for the animation selectors. 
Base settings for all animated elements 
div[data-anim~=base] {
  -webkit-animation-iteration-count: 1;   Only run once 
  -webkit-animation-fill-mode: forwards;  Hold the last keyframe */
  -webkit-animation-timing-function:linear; /* Linear animation */
}

.wrapper[data-anim~=wrapper] {
  -webkit-animation-duration: 0.01s; /* Complete keyframes asap */
  -webkit-animation-delay: 3s; /* Wait half of the animation */
  -webkit-animation-name: close-wrapper; /* Keyframes name */
}

.circle[data-anim~=left] {
  -webkit-animation-duration: 6s; /* Full animation time */
  -webkit-animation-name: left-spin;
}

.circle[data-anim~=right] {
  -webkit-animation-duration: 3s; /* Half animation time */
  -webkit-animation-name: right-spin;
}
And finally, the keyframes.

/* Rotate the right side of the progress bar from 0 to 180 degrees */
@-webkit-keyframes right-spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(180deg);
  }
}
/* Rotate the left side of the progress bar from 0 to 360 degrees */
@-webkit-keyframes left-spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}
/* Set the wrapper clip to auto, effectively removing the clip */
@-webkit-keyframes close-wrapper {
  to {
    clip: rect(auto, auto, auto, auto);
  }
}


    
*/    
