angular.module('munch.directives', [])

// .directive('openOptions', ['$ionicGesture', function($ionicGesture) {
//   return {
//     restrict: 'A',
//     link: function (scope, element, attrs) {
//       $ionicGesture.on('tap', function(e){
//       	var ITEM_CLASS = 'item';
//         var ITEM_CONTENT_CLASS = 'item-content';
// 		var ITEM_SLIDING_CLASS = 'item-sliding';
// 		var ITEM_OPTIONS_CLASS = 'item-options';

//         var content, buttons, offsetX, buttonsWidth;

//         if (e.target.classList.contains(ITEM_CONTENT_CLASS)) {
//           content = e.target;
//         } else if (e.target.classList.contains(ITEM_CLASS)) {
//           content = e.target.querySelector('.' + ITEM_CONTENT_CLASS);
//         } else {
//           content = ionic.DomUtil.getParentWithClass(e.target, ITEM_CONTENT_CLASS);
//         }

//         // If we don't have a content area as one of our children (or ourselves), skip
//         if (!content) {
//           return;
//         }

//         // Make sure we aren't animating as we slide
//         content.classList.remove(ITEM_SLIDING_CLASS);
//         console.log(content);
//         //var input = content.childNode.querySelector('input');

//         //console.log(input);

//         offsetX = parseFloat(content.style[ionic.CSS.TRANSFORM].replace('translate3d(', '').split(',')[0]) || 0;

//         //console.log("offset: " + offsetX);

//         // Grab the buttons
//         buttons = content.parentNode.querySelector('.' + ITEM_OPTIONS_CLASS);
//         if (!buttons) {
//           return;
//         }
        
//         buttons.classList.remove('invisible');
//         buttonsWidth = buttons.offsetWidth;
        
//         // El item está abierto
//         if(offsetX === 0) {
//           content.style[ionic.CSS.TRANSFORM] = "translate3d(-" + buttonsWidth + "px, 0px, 0px)";
//           console.log('open');
//           // MAKE INPUT READ ONLY HERE
//         }
        
//         // El item está cerrado
//         else {
//           content.style[ionic.CSS.TRANSFORM] = "translate3d(0px, 0px, 0px)";
//           // REMOVE READ ONLY STATUS HERE
//         }
        
//         //console.log("buttonsWidth: " + buttonsWidth);
        
//       }, element);
//     }
//   };
// }])


.directive('openOptions', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('tap', function(e){

        // Grab the content
        var content = element.parent()[0];

        // Grab the buttons and their width
        var buttons = element.parent().parent()[0].querySelector('.item-options');

        var input = element.parent()[0].querySelector('input');

        angular.element(input).attr('readonly', 'readonly');


        //document.getElementById('foo').readOnly = true;

        if (!buttons) {
          console.log('There are no option buttons');
          return;
        }
        var buttonsWidth = buttons.offsetWidth;

        ionic.requestAnimationFrame(function() {
          //content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';


            buttons.classList.remove('invisible');
            content.style[ionic.CSS.TRANSFORM] = 'translate3d(-' + buttonsWidth + 'px, 0, 0)';
        });   

      }, element);
    }
  };
}])

.directive('closeOptions', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('touch', function(e){

        // Grab the content
        var content = element.parent()[0];

        // Grab the buttons and their width
        var buttons = element.parent().parent()[0].querySelector('.item-options');

        if (!buttons) {
          console.log('There are no option buttons');
          return;
        }
        var buttonsWidth = buttons.offsetWidth;



        ionic.requestAnimationFrame(function() {
         //content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

            console.log('close');
            content.style[ionic.CSS.TRANSFORM] = '';
            setTimeout(function() {
              buttons.classList.add('invisible');

              var input = element.parent()[0].querySelector('input');
            angular.element(input).attr('readonly', '');
            console.log('Back to normal');
            }, 250);        
        });   
        

      }, element);
    }
  };
}])