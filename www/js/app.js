// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic', 'ionic-material', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.backgroundColorByHexString("#FF000");
    }

  });
})

// Trying to fix slow scrolling
//myApp.config(function($ionicConfigProvider) {
  // $ionicConfigProvider.scrolling.jsScrolling(false);
//});

// Customize status bar
// .run(function($cordovaStatusbar) {
//   $cordovaStatusbar.styleHex('#FF0000') //red
// })


// myApp.config(['$ionicConfigProvider', function($ionicConfigProvider) {

//     $ionicConfigProvider.tabs.position('bottom'); // other values: top

// }]);