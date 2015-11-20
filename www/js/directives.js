angular.module('munch.directives', [])

.directive('openOptions', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('tap', function(e){

        var content = element.parent()[0];
        var buttons = element.parent().parent()[0].querySelector('.item-options');
        var input = element.parent()[0].querySelector('input');

        angular.element(input).attr('readonly', 'readonly');

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

        var content = element.parent()[0];
        var buttons = element.parent().parent()[0].querySelector('.item-options');
        var buttonsWidth = buttons.offsetWidth;

        ionic.requestAnimationFrame(function() {
          // Close
          content.style[ionic.CSS.TRANSFORM] = '';
          setTimeout(function() {
            buttons.classList.add('invisible');

            var input = element.parent()[0].querySelector('input');
            angular.element(input).attr('readonly', '');
            // Back to normal
          }, 250);        
        });   
      }, element);
    }
  };
}]);