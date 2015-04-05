angular.module('protein.controllers', [])

.controller("ProteinCtrl", ["$scope", "$http",
  function($scope, $http) {
    $scope.weight = 0;
    $scope.calculate = function(w, l, h){
    	$scope.lowerProteinAmount = (w * l).toFixed(0);
        $scope.higherProteinAmount = (w * h).toFixed(0);

    };

    $scope.onSwipeLeft = function(w){
        $scope.weight = w+1;
        console.log($scope.weight);
    };
    
    $scope.goals = [
    	{lowerProtein : 1.0, higherProtein : 1.6, text : 'Body Building'},
    	{lowerProtein : 0.9, higherProtein : 1.1, text : 'Power and Speed'},
    	{lowerProtein : 0.35, higherProtein : 1.0, text : 'Dieting'},
    	{lowerProtein : 0.7, higherProtein : 0.9, text : 'Endurance'},
    	{lowerProtein : 0.9, higherProtein : 1.4, text : 'Truama Recovery'},
    	{lowerProtein : 0.45, higherProtein : 0.7, text : 'Stressed'}
    ];

  }
]);