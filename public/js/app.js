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
    .when('/new',{
      templateUrl: 'views/form.html',
      controller:  'AppViewController'
    })
    .when('/edit/:id',{
      templateUrl: 'views/form.html',
      controller:  'AppViewController'
    })
    .when('/delete/:id',{
      templateUrl: '/',
      controller:  'DeleteController'
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
    {id: 1,description : 'fruits',amount : 10,date:'2015-01-25'},
    {id: 2,description : 'shoes',amount : 25,date:'2015-01-26'},
    {id: 3,description : 'grocery',amount : 50,date:'2015-01-26'},
    {id: 4,description : 'fruits',amount : 10,date:'2015-01-29'},
    {id: 5,description : 'drugs',amount : 10,date:'2015-02-01'},
    {id: 6,description : 'grocery',amount : 10,date:'2015-02-04'}
  ];

  service.entries.forEach(function(element){
      element.date = dateHelper.stringToDateObj(element.date);
  })

  //Generate new ID
  service.getId = function(){
    if(service.newId){
      service.newId++;
      return service.newId;
    }
    else{
      var entryMaxId = _.max(service.entries, function(entry){return entry.id;});
      service.newId = entryMaxId.id+1;
      return service.newId;
    }
  }

  //Get entry by ID
  service.getById = function(id){
    return _.find(service.entries, function(entry){return entry.id == id;});
  }

  //Edit entry
  service.save = function(entry){

    var toUpdate = service.getById(entry.id);

    if(toUpdate){
      _.extend(toUpdate,entry);
    }else{
      entry.id = service.getId();
      service.entries.push(entry);
    }

    //Delete entry
    service.delete = function(entry){
      service.entries.remove(entry);
    }
}

  return service;
})

/*App Name Controller*/
.controller('MainViewController', ['$scope', 'Expenses',function($scope, Expenses){

  $scope.appName = 'Expenses Listing 1.0';
  $scope.expenses = Expenses.entries;
  }])
/**/
  
.controller('AppViewController', ['$scope', '$routeParams', '$location','Expenses', function($scope,$routeParams,$location,Expenses){
  $scope.idText = 'Current ID: ' + $routeParams.id;   
  if(!$routeParams.id){
    $scope.expense = {id: 7, description: 'New Expense', amount: 0, date: new Date()};
  }else{
    $scope.expense = _.clone(Expenses.getById($routeParams.id));
    
  }

  $scope.save = function(){
    Expenses.save($scope.expense);
    $location.path('/');
  }
  
}])

.controller('DeleteController', ['$scope', '$routeParams', '$location','Expenses', function($scope,$routeParams,$location,Expenses){
 
  $scope.delete = function(){
   
  }
  
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
}])

//Date Converter
var dateHelper = {
  //from http://stackoverflow.com/questions/2280104/convert-javascript-to-date-object-to-mysql-date-format-yyyy-mm-dd
  dateObjToString: function(dateObj) {
    var year, month, day;
    year = String(dateObj.getFullYear());
    month = String(dateObj.getMonth() + 1);
    if (month.length == 1) {
        month = "0" + month;
    }
    day = String(dateObj.getDate());
    if (day.length == 1) {
        day = "0" + day;
    }
    return year + "-" + month + "-" + day;
  },
  stringToDateObj: function(string) {
    return new Date(string.substring(0,4), string.substring(5,7) - 1, string.substring(8,10));
  }
};
