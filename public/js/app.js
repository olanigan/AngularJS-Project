angular.module('expensesApp', [])

.controller('ViewController', ['$scope', function($scope){
  $scope.expense = {
  	description : 'food',
  	amount : 10
  };

  $scope.phrase = 'Expensive App';

  $scope.increaseAmt = function(){
  	$scope.expense.amount++;
  }

  $scope.items = [
  	{
  		name: 'John',
  		foods: ['rice','oatmeal','potato']
  	},
  	{
  		name: 'James',
  		foods: ['makkara','beans','apple','lassagne']
  	},
  	{
  		name: 'Steve',
  		foods: ['plaintain','wine']
  	}
  ];
}]);
