var app = angular.module('elephantsApp', ['ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when("/", {templateUrl: "/views/list.html"}).
    when("/add", {templateUrl: "/views/edit.html", controller: "elephantsAddController"}).
    when("/edit/:id", {templateUrl: "/views/edit.html", controller: "elephantsEditController"}).
    otherwise({redirectTo: "/"});
});
