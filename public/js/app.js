angular.module('expensesApp', ['ngRoute'])

/**/
/*
Config defines routes for the app, along with
its individual template and controller*/

.config(function($routeProvider){
  $routeProvider
    .when('/',{
      templateUrl: 'views/expenses.html',
      controller:  'AppViewController'
    })
    .when('/expenses',{
      templateUrl: 'views/expenses.html',
      controller:  'AppViewController'
    })
    .when('/expenses/new',{
      templateUrl: 'views/form.html',
      controller:  'AppViewController'
    })
    .when('/edit/:id',{
      templateUrl: 'views/form.html',
      controller:  'ExpenseViewController'
    })
    .when('/test',{
      templateUrl: 'test.html',
      controller:  'TestViewController'
    })
    .otherwise({
      redirectTo: '/'
    })
})

/*Service for modularity*/
.factory('Expenses',function(){
  var service = {};

  service.entries = [
    {description : 'fruits',amount : 10,date:'2015-01-25'},
    {description : 'shoes',amount : 25,date:'2015-01-26'},
    {description : 'grocery',amount : 50,date:'2015-01-26'},
    {description : 'fruits',amount : 10,date:'2015-01-29'},
    {description : 'drugs',amount : 10,date:'2015-02-01'},
    {description : 'grocery',amount : 10,date:'2015-02-04'}
  ];

  return service;
})

/*App Name Controller*/
.controller('MainViewController', ['$scope', function($scope){
  $scope.appName = 'Expenses Listing';
  
  }])
/**/
.controller('AppViewController', ['$scope', 'Expenses',function($scope, Expenses){
  $scope.expenses = Expenses.entries;

}])
  
.controller('ExpenseViewController', ['$scope', '$routeParams',function($scope,$routeParams){
  $scope.idText = 'Current ID: ' + $routeParams.id;   
  
}])

.controller('TestViewController', ['$scope', function($scope){
  $scope.phrase = 'Page of Test';
  $scope.amount = 10;
  $scope.description = 'Grocery';
  $scope.items = [
    {name : 'Fruits',foods : ['Apple','Banana']},
    {name : 'Vegetables',foods : ['Spinach','Brocolli','Onions']},
    {name : 'Seafoods',foods : ['Shrimp','Salmon','Tilapia']},
  ];

  $scope.increaseAmt = function(){
    $scope.amount++;
  }
}]);
