angular.module('starter.controllers', [])

.controller('MealsCtrl', function($scope, Meals) {

  $scope.meals = Meals.all();
  $scope.data = {
    showDelete: false
  };
})

.controller('MealDetailCtrl', function($scope, $stateParams, Meals) {
  
  $scope.meal = Meals.get($stateParams.mealId);
  $scope.allMeals = Meals.all;


  $scope.addIngredient = function() {
    console.log("add");

   // $scope.allMeals.push($scope.)
  };
})

.controller('createMealCtrl', function($scope, $rootScope, $ionicModal, $stateParams, Meals) {
  $ionicModal.fromTemplateUrl('templates/meal-create.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
    //$scope.ingredients = 
  });
  $scope.createMeal = function(newMeal) {
    console.log('New Meal', newID);

    $scope.allMeals = Meals.all();
    var newID = (Meals.findLast() + 1);
    var newData = {id: newID, name: newMeal.name};
    $scope.allMeals.push(newData);

    newMeal.name = "";

  }
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.$on('modal.hidden', function() {
    console.log('hidden');
  });

  $scope.$on('modal.removed', function() {
    console.log('removed');
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
