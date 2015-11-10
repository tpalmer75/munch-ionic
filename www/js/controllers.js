angular.module('starter.controllers', [])

.controller('MealsCtrl', function($scope, Meals) {

  $scope.meals = Meals.all();
  $scope.data = {
    showDelete: false
  };
})

.controller('MealDetailCtrl', function($scope, $stateParams, Meals, $ionicHistory) {
  
  $scope.meal = Meals.get($stateParams.mealId);
  $scope.allMeals = Meals.all;


  $scope.addIngredient = function() {
    $scope.meal.ingredients.push("");
  };

  $scope.deleteMeal = function() {
    console.log('Delete');
    Meals.delete($stateParams.mealId);
  };

  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
})

.controller('createMealCtrl', function($scope, $rootScope, $ionicModal, $stateParams, Meals) {
  
  $scope.fakeMeals = [{
    id: 0,
    name: 'Noodle Soup',
    ingredients: ["Noodles", "Water", "Believe"],
    placeholders: ["Fake", "Fake 2", "Fake 3"]
  }, {
    id: 1,
    name: 'Yoda Soda',
    ingredients: ["Sprite", "Ice Cream", "The Force"]
  }, {
    id: 2,
    name: "Mario's Mushrooms",
    ingredients: ["A sweet moustache", "Mushrooms", "Third Item"]
  }];

  $scope.randomNumber = Math.floor(Math.random() * 3);

  $scope.dummyMeal = {
    name: "",
    ingredients: ["", "", ""]
  };

  $ionicModal.fromTemplateUrl('templates/meal-create.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.createMeal = function(newMeal) {
    console.log('New Meal', newID);

    $scope.allMeals = Meals.all();
    var newID = (Meals.findLast() + 1);
    var newData = {id: newID, name: $scope.dummyMeal.name, ingredients: $scope.dummyMeal.ingredients};
    $scope.allMeals.push(newData);
  }
  $scope.addIngredient = function(newMeal) {
    $scope.dummyMeal.ingredients.push("");
  };
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

.controller('ScheduleCtrl', function($scope) {


})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
