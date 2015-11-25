angular.module('starter.controllers', [])

// -------------------------- MEAL CTRL ---------------------------


.controller('MealsCtrl', function($scope, $ionicModal, $stateParams, Meals) {

  $scope.meals = Meals.all();
  $scope.data = {
    showDelete: false
  };
  $scope.deleteButton = "Edit";

  $scope.showDelete = function() {
    if ( $scope.meals.length > 0 ) {
      $scope.data.showDelete = !$scope.data.showDelete;
      if ($scope.data.showDelete) {
        $scope.deleteButton = "Done";
      } else {
        $scope.deleteButton = "Edit";
      }
    }
  }

  $scope.deleteMeal = function(idx) {
    $scope.meals.splice(idx, 1);
    if ( $scope.meals.length == 0 ) {
      $scope.deleteButton = "Edit";
      $scope.showDelete = false;
    }
  }

  $scope.dummyMeal = {};

  $ionicModal.fromTemplateUrl('templates/meal-create.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.createMeal = function(newMeal) {
    $scope.allMeals = Meals.all();
    var newID = (Meals.findLast() + 1);
    var newData = {id: newID, name: $scope.dummyMeal.name, ingredients: $scope.dummyMeal.ingredients};
    $scope.allMeals.push(newData);
  }

  $scope.addIngredient = function() {
    var listLength = $scope.dummyMeal.ingredients.length;
    var newID;
    if (listLength > 0) {
      newID = $scope.dummyMeal.ingredients[listLength - 1].id;
    } else {
      newID = 1;
    }
    var newData = {id: (newID + 1), name: ""};
    $scope.dummyMeal.ingredients.push(newData);
    console.log(listLength);
    console.log(newData);
  };


  $scope.deleteItem = function(item) {
    delete $scope.dummyMeal.ingredients[item];
  };
  $scope.openModal = function() {
    $scope.modal.show();

    $scope.fakeMeals = [{
      name: "",
      ingredients: [{id: 0, name: ""}, {id: 1, name: ""}, {id: 2, name: ""}],
      placeholderName: "Noodle Soup",
      placeholders: ["Noodles", "Water", "Believe"]
    }, {
      name: "",
      ingredients: [{id: 0, name: ""}, {id: 1, name: ""}, {id: 2, name: ""}],
      placeholderName: "Yoda Soda",
      placeholders: ["Sprite", "Ice Cream", "The Force"]
    }, {
      name: "",
      ingredients: [{id: 0, name: ""}, {id: 1, name: ""}, {id: 2, name: ""}],
      placeholderName: "Mario's Mushrooms",
      placeholders: ["A sweet moustache", "Mushrooms", "Third Item"]
    }];
  
    var randomNumber = Math.floor(Math.random() * 3);
    $scope.dummyMeal = $scope.fakeMeals[0];
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

// -------------------------- MEAL DETAIL ---------------------------

.controller('MealDetailCtrl', function($scope, $stateParams, Meals, $ionicHistory, $ionicPopup) {
  
  $scope.meal = Meals.get($stateParams.mealId);
  $scope.allMeals = Meals.all;

  $scope.addIngredient = function() {

    var num = Object.keys($scope.meal.ingredients).length;


    $scope.meal.ingredients.push("");
  };
  $scope.deleteMeal = function() {
    console.log('Delete');
    Meals.delete($stateParams.mealId);
  };
  $scope.goBack = function() {
    $ionicHistory.goBack();
  };
  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Meal',
     template: 'You sure you wanna delete this?',
     buttons: [
      { 
        text: 'Nope',
        type: 'button-positive button-clear',
      },
      {
        text: '<b>Yep</b>',
        type: 'button-positive button-clear',
        onTap: function() {
          $scope.deleteMeal();
          $ionicHistory.goBack();
        }
      }
    ]
   });
 };
})


// -------------------------- SCHEDULE CTRL ---------------------------

.controller('ScheduleCtrl', function($scope, $ionicModal, Meals, Schedule, $ionicPopup) {

  $scope.allMeals = Meals.all();
  $scope.currentSchedule = Schedule.all();

  $scope.dayOfWeek = 0;

  $scope.data = {
    showReorder: true
  };

  $scope.clearAll = function() {
    Schedule.clear();
    Groceries.clear();
    console.log('I tried');
  };

  $ionicModal.fromTemplateUrl('templates/schedule-choose.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.addToSchedule = function(meal) {
    var thisDay = Schedule.get($scope.dayOfWeek);
    thisDay.meals.push(meal.id);
  };
  $scope.addIngredient = function(newMeal) {
    $scope.dummyMeal.ingredients.push("");
  };
  $scope.mealName = function(tempID) {
    var temp = Meals.mirror(tempID);
    return temp;
  };
  $scope.openModal = function(day) {
    $scope.modal.show();
    $scope.dayOfWeek = day;
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.randomizeSchedule = function() {
    var max = $scope.allMeals.length;
    Schedule.clear();
    for (var i = 0; i < $scope.currentSchedule.length; i++) {
      var randomNumber = Math.floor(Math.random() * (max));
      Schedule.get(i).meals.push(randomNumber);
    }
  };

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Clear All',
     template: 'This will clear out your<br/>entire schedule. You sure?',
     buttons: [
      { 
        text: 'Nope',
        type: 'button-positive button-clear',
      },
      {
        text: '<b>Yep</b>',
        type: 'button-positive button-clear',
        onTap: function() {
          Schedule.clear();
        }
      }
    ]
   });
   };

   $scope.showConfirmRandom = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Random Meals',
     template: 'This will clear and randomly fill your schedule. You sure?',
     buttons: [
      { 
        text: 'Nope',
        type: 'button-positive button-clear',
      },
      {
        text: '<b>Yep</b>',
        type: 'button-positive button-clear',
        onTap: function() { 
          $scope.randomizeSchedule();
        }
      }
    ]
   });
 };
})

.controller('GroceriesCtrl', function($scope, Meals, Schedule) {
  $scope.meals = Meals.all();
  $scope.currentSchedule = Schedule.all();

});
