angular.module('munch.services', [])

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

.factory('Groceries', function(Meals, Schedule) {

  var groceries = [];
  var currentSchedule = Schedule.all();

  return {
    all: function() {
      return groceries;
    },
    generate: function() {
      groceries = [];

      var newID = 1;

      for (a = 0; a < currentSchedule.length; a++){
        //console.log("starting day " + a);
        for (b = 0; b < currentSchedule[a].meals.length; b++) {

          var tempID = currentSchedule[a].meals[b].name;
          var ingredients = Meals.mirrorIngredients(tempID)

          //console.log(currentSchedule[a].meals.length + " meals today, meal " + b)

          for (c = 0; c < ingredients.length; c++) {
            var item = ingredients[c].name;
            if (item.length > 0) {
              var newData = {id: newID, name: item};
              groceries.push(newData);
            }
            newID ++;

            //console.log(ingredients.length + " ingredients, adding " + ingredients[c].name)

          }
          // now you just need to to add unique IDs each time.
        }
      }
      //console.log(groceries);
    }
  };
});
