// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('munchApp', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDarkContent();
    }
  });
})

.directive('openOptions', ['$ionicGesture', function($ionicGesture) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      $ionicGesture.on('tap', function(e){

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
          content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';


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
      $ionicGesture.on('tap', function(e){

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
          content.style[ionic.CSS.TRANSITION] = 'all ease-out .25s';

            console.log('close');
            content.style[ionic.CSS.TRANSFORM] = '';
            setTimeout(function() {
              buttons.classList.add('invisible');
            }, 250);        
        });   

      }, element);
    }
  };
}])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.meals', {
      url: '/meals',
      views: {
        'tab-meals': {
          templateUrl: 'templates/tab-meals.html',
          controller: 'MealsCtrl'
        }
      }
    })
    .state('tab.meal-detail', {
        url: '/meals/:mealId',
        views: {
          'tab-meals': {
            templateUrl: 'templates/meal-detail.html',
            controller: 'MealDetailCtrl'
          }
        }
      })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/meals');

});
