angular.module('starter.services', [])

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
  }];

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
    }
  };
});
