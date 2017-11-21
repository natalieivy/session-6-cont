import angular from 'angular'
import ngRoute from 'angular-route'

const app = angular.module('foodApp', ['ngRoute'])

app.config(
  function config($locationProvider, $routeProvider) {
    $routeProvider.
    when('/', {
      template: '' 
    }).
    when('/recipes', {
      template: '<recipe-list></recipe-list>'
    }).
    when('/recipes/:recipeId', {
      template: '<recipe-detail></recipe-detail>'
    })
    $locationProvider.html5Mode(true);
  });

app.component('recipeDetail', {
  templateUrl: '/includes/recipe-detail.html',

  controller: function RecipeDetailController($http, $routeParams) {
    $http.get('data/' + $routeParams.recipeId + '.json')
    .then( response => this.recipe = response.data)
  }

});

app.component('recipeList', {
  templateUrl: '/includes/recipes.html',

  controller: function RecipeListController( $http ) {
  	
    $http.get('data/recipes.json')
    .then( response => this.recipes = response.data)

    this.orderProp = 'date'

  }
});

app.controller('NavController', function ($scope, $location) {
  $scope.isActive = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };
})






























