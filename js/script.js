var app = angular.module('Website', ['menuController']);
app.controller('menuController', ['$scope', function($scope){
		$scope.menu = 'close';
}])
