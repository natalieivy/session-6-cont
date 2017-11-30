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
        when('/reviews', {
            template: '<review-list></review-list>'
        }).
        when('/recipes/:recipeId', {
            template: '<recipe-detail></recipe-detail>'
        }).
        when('/reviews/:reviewId', {
            template: '<review-detail></review-detail>'
        });
        $locationProvider.html5Mode(true);
    });

app.component('recipeDetail', {
    templateUrl: '/includes/recipe-detail.html',

    controller: function RecipeDetailController($http, $routeParams) {
        $http.get('data/' + $routeParams.recipeId +  '.json')
            .then(response => {
                this.recipe = response.data;
                this.setImage(this.recipe.images[0])
            });

        this.setImage = function (imageUrl) {
            this.mainImageUrl = imageUrl;
        }

    }

});

app.component('recipeList', {
    templateUrl: '/includes/recipes.html',

    controller: function RecipeListController( $http ) {

        $http.get('data/recipes.json')
            .then( response => this.recipes = response.data);

        this.orderProp = 'date'

    }
});

app.component('reviewDetail', {
    templateUrl: '/includes/review-detail.html',

    controller: function ReviewDetailController($http, $routeParams) {
        $http.get('data/' + $routeParams.reviewId +  '.json')
            .then(response => {
                this.review = response.data;
                this.setImage(this.review.images[0])
            });

        this.setImage = function (imageUrl) {
            this.mainImageUrl = imageUrl;
        }

    }

});

app.component('reviewList', {
    templateUrl: '/includes/reviews.html',

    controller: function ReviewListController( $http ) {

        $http.get('data/reviews.json')
            .then( response => this.reviews = response.data);

        this.orderProp = '-date'

    }
});

app.controller('NavController', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        // var active = (viewLocation === $location.path());
        var active = (window.location.href.includes(viewLocation))
        return active;
    };
})



