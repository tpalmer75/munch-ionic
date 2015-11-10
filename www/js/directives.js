angular.module('munch.directives', [])

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

        if (!buttons) {
          console.log('There are no option buttons');
          return;
        }
        var buttonsWidth = buttons.offsetWidth;

        ionic.requestAnimationFrame(function() {
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