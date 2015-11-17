angular.module('munch.services', [])

.factory('Meals', function() {

  var meals = [{
    id: 0,
    name: 'Lemon Garlic Chicken',
    ingredients: ["lemon", "garlic", "chicken", "chicken broth", "pasta", "basil"]
  }, {
    id: 1,
    name: 'Chicken Pockets',
    ingredients: []
  }, {
    id: 2,
    name: 'Steak and Berry Salad',
    ingredients: []
  }, {
    id: 3,
    name: 'Beef Stew',
    ingredients: []
  }, {
    id: 4,
    name: 'Longer title name that might overflow if the screen is too small',
    ingredients: []
  }, {
    id: 5,
    name: 'Another meal name',
    ingredients: []
  }];
  
  // var meals = [];

  return {
    all: function() {
      return meals;
    },
    get: function(mealId) {
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].id === parseInt(mealId)) {
          return meals[i];
        }
      }
      return null;
    },
    findLast: function() {
      var listLength = meals.length;
      if (listLength > 0) {
        return meals[listLength - 1].id;
      } else {
        return 1;
      }
    },
    delete: function(mealId) {
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].id === parseInt(mealId)) {
          meals.splice(i, 1);
        }
      }
    }, 
    mirror: function(tempID) { // used for schedule
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].id === tempID) {
          return meals[i].name;
        }
      }
      return null;
    }
  };
})

.factory('Schedule', function(Meals) {

  var mealQueue = [{
    dayInt: 0,
    name: "Monday",
    meals: []
  }, {
    dayInt: 1,
    name: "Tuesday",
    meals: []
  }, {
    dayInt: 2,
    name: "Wednesday",
    meals: []
  }, {
    dayInt: 3,
    name: "Thursday",
    meals: []
  }, {
    dayInt: 4,
    name: "Friday",
    meals: []
  }, {
    dayInt: 5,
    name: "Saturday",
    meals: []
  }, {
    dayInt: 6,
    name: "Sunday",
    meals: []
  }];

  return {
    all: function() {
      return mealQueue;
    },
    get: function(day) {
      for (var i = 0; i < mealQueue.length; i++) {
        if (mealQueue[i].dayInt === parseInt(day)) {
          return mealQueue[i];
        }
      }
      return null;
    },
    clear: function() {
      for (var i = 0; i < mealQueue.length; i++) {
        mealQueue[i].meals = [];

      }
      return null;
    }
  };
});
