angular.module('munch.directives', [])

.directive('setFocus', function($timeout){
  return {
      restrict: 'A',
      scope: {
        setFocus: '=',
        firstTime: '='
      },
      link: function(scope, element){

        // check to see if it's page load
        if (scope.firstTime.justLoaded && scope.setFocus) {
          // set to false so we know it's not page load
          scope.firstTime.justLoaded = false;
        } else if (scope.setFocus) {
          // focus the element
          $timeout(function() {element[0].focus();});
        }
      }
  };
})

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