angular.module('munch.controllers', [])

// -------------------------- MEAL CTRL ---------------------------


.controller('MealsCtrl', function($scope, $ionicModal, $stateParams, Meals, Schedule, $ionicPopup) {

  $scope.meals = Meals.all();
  $scope.data = {
    showDelete: false
  };
  var currentSchedule = Schedule.all();

  $scope.deleteButton = "Edit";

  $scope.firstTime = {justLoaded : true};

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

    // check for the meal in schedule
    var thisMeal = $scope.meals[idx].id;

    for (a=0; a < currentSchedule.length; a++) {
      var mealsToday = currentSchedule[a].meals;
      for (b=0; b < mealsToday.length; b++) {
        var mealOnSchedule = mealsToday[b].name;
        if (mealOnSchedule == thisMeal) {
          var place = mealsToday.indexOf(mealOnSchedule);
          mealsToday.splice(place, 1);
        }
      }
    }

    $scope.meals.splice(idx, 1);

    if ( !$scope.meals.length ) {
      $scope.deleteButton = "Edit";
      $scope.data.showDelete = false;
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

    if ( $scope.dummyMeal.name.length > 0) {
      $scope.allMeals.push(newData);
      $scope.closeModal();
    } else {
      console.log('Nope');
      $scope.showConfirm();
    }
  }

  $scope.showConfirm = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'A meal with no name',
     template: 'Why would you create a meal </br>with no name?',
     buttons: [
      { 
        text: 'I would never!',
        type: 'button-positive button-clear',
      }
    ]
   });
 };

  $scope.addIngredient = function() {
    var listLength = $scope.dummyMeal.ingredients.length;
    var newID;
    if (listLength > 0) {
      newID = $scope.dummyMeal.ingredients[listLength - 1].id;
    } else {
      newID = 0;
    }
    var newData = {id: (newID + 1), name: ""};
    $scope.dummyMeal.ingredients.push(newData);
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
    $scope.dummyMeal = $scope.fakeMeals[randomNumber];
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  }

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
})

// -------------------------- MEAL DETAIL ---------------------------

.controller('MealDetailCtrl', function($scope, $stateParams, Meals, $ionicHistory, $ionicPopup) {
  
  $scope.meal = Meals.get($stateParams.mealId);
  $scope.allMeals = Meals.all;

  $scope.firstTime = {justLoaded : true};

  $scope.addIngredient = function() {

    var listLength = $scope.meal.ingredients.length;
    var newID;
    if (listLength > 0) {
      newID = ($scope.meal.ingredients[listLength - 1].id) + 1;
    } else {
      newID = 0;
    }
    var newData = {id: (newID), name: ""};
    $scope.meal.ingredients.push(newData);

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

.controller('ScheduleCtrl', function($scope, $ionicModal, Meals, Schedule, Groceries, $ionicPopup) {

  $scope.allMeals = Meals.all();
  $scope.currentSchedule = Schedule.all();
  $scope.allGroceries = Groceries.all();

  $scope.dayOfWeek = 0;
  $scope.search = '';

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
    var listLength = thisDay.meals.length;
    var newID;
    if (listLength > 0) {
      newID = (thisDay.meals[listLength - 1].id) + 1;
    } else {
      newID = 0;
    }
    var newData = {id: newID, name: meal.id};
    thisDay.meals.push(newData);

    //Groceries.generate();
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

  // $scope.generateGroceries = function() {
  //   Groceries.generate();
  // }

  $scope.randomizeSchedule = function() {
    var max = $scope.allMeals.length;
    Schedule.clear();
    for (var i = 0; i < $scope.currentSchedule.length; i++) {
      var randomNumber = Math.floor(Math.random() * (max));
      var randomMeal = {id: 0, name: $scope.allMeals[randomNumber].id}
      Schedule.get(i).meals.push(randomMeal);
    }
    //Groceries.generate();
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

.controller('GroceriesCtrl', function($scope, Groceries) {

  

  $scope.$on('$ionicView.beforeEnter', function () { 
    Groceries.generate(); // this has to come first to avoid cache
    $scope.groceries = Groceries.all();
  });

});
