angular.module('munch.services', [])

// .factory('Meals', function($firebaseArray) {

//   var meals = new Firebase("https://munch-ionic.firebaseio.com/");
  
//   // var meals = [];

//   return {
//     all: function() {
//       return $firebaseArray(meals);
//     },
//     get: function(mealId) {
//       for (var i = 0; i < meals.length; i++) {
//         if (meals[i].id === parseInt(mealId)) {
//           return meals[i];
//         }
//       }
//       return null;
//     },
//     findLast: function() {
//       var listLength = meals.length;
//       if (listLength > 0) {
//         return meals[listLength - 1].id;
//       } else {
//         return 1;
//       }
//     },
//     delete: function(mealId) {
//       for (var i = 0; i < meals.length; i++) {
//         if (meals[i].id === parseInt(mealId)) {
//           meals.splice(i, 1);
//         }
//       }
//     }, 
//     mirror: function(tempID) { // used for schedule
//       for (var i = 0; i < meals.length; i++) {
//         if (meals[i].id === tempID) {
//           return meals[i].name;
//         }
//       }
//       return null;
//     },
//     mirrorIngredients: function(tempID) {
//       for (var i = 0; i < meals.length; i++) {
//         if (meals[i].id === tempID) {
//           return meals[i].ingredients;
//         }
//       }
//       return null;
//     }
//   };
// })

.factory('Meals', function() {

  var meals = [{
    id: 0,
    name: 'Lemon Garlic Chicken',
    ingredients: [{id: 0, name:"lemon"}, {id: 1, name:"garlic"}, {id: 2, name:"chicken"}, {id: 3, name:"noodles"}]
  }, {
    id: 1,
    name: 'Chicken Pockets',
    ingredients: [{id: 0, name:"crescent rolls"}, {id: 1, name:"chicken"}, {id: 2, name:"onions"}, {id: 3, name:"sour cream"}]
  }, {
    id: 2,
    name: 'Steak and Berry Salad',
    ingredients: [{id: 0, name:"steak"}, {id: 1, name:"berries"}, {id: 2, name:"lettuce"}]
  }, {
    id: 3,
    name: 'Beef Stew',
    ingredients: [{id: 0, name:"beef cutlets"}, {id: 1, name:"carrots"}, {id: 2, name:"potatoes"}, {id: 3, name:"broth"}]
  }, {
    id: 4,
    name: 'Longer title name that might overflow if the screen is too small',
    ingredients: [{id: 0, name: "test"}]
  }, {
    id: 5,
    name: 'Another meal name',
    ingredients: [{id: 0, name: "test again"}]
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
    },
    mirrorIngredients: function(tempID) {
      for (var i = 0; i < meals.length; i++) {
        if (meals[i].id === tempID) {
          return meals[i].ingredients;
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
})

.factory('Groceries', function(Meals) {

  var groceries = [];

  return {
    all: function() {
      return groceries;
    },
    add: function(mealID) {

      if (groceries.length) {
        var newID = (groceries[groceries.length - 1].id) + 1;
      } else {
        newID = 1;
      }

      var ingredients = Meals.mirrorIngredients(mealID)
      // loop through ingredients
      for (c = 0; c < ingredients.length; c++) {
        var item = ingredients[c].name; 

        var hasDuplicate = false;
        // loop through existing groceries
        for (d = 0; d < groceries.length; d++) {
          // check for duplicates
          if ( item === groceries[d].name ) {
            hasDuplicate = true;
            groceries[d].count ++;
          }
        }
        // if it's not a duplicate
        if (hasDuplicate == false && item.length) {
          var newData = {id: newID, name: item, checked: false, count: 1};
          groceries.push(newData);
          newID ++;
        }
      }
      return;
    },
    remove: function(mealID) {

      var ingredients = Meals.mirrorIngredients(mealID);
      // loop through ingredients
      for (c = 0; c < ingredients.length; c++) {
        var item = ingredients[c].name; 

        var hasDuplicate = false;
        // loop through existing groceries
        for (d = 0; d < groceries.length; d++) {
          // check for duplicates
          if ( item === groceries[d].name ) {
            groceries[d].count --;
            if (groceries[d].count == 0) {
              groceries.splice(d, 1);
            }
          }
        }
      }
      return;
    },
    clear: function() {
      groceries = [];
    },
    uncheckAll: function() {
      for (i = 0; i < groceries.length; i++) {
        console.log(groceries[i].checked);
        groceries[i].checked = false;
        console.log(groceries[i].checked);
      }
      return;
    }
  };
});
