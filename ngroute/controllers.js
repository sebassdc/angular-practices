angular.module("CustomDirective")
.controller("ReposController", function($scope, $http){
	var flag = false
	$scope.customuser = '';
	$scope.repos = [];
		$scope.setUser = function(){
			$scope.repos.length = 0;
			var hs = "https://api.github.com/users/"+$scope.customuser+"/repos";
			console.log(hs);
			$http.get(hs)
			.success(function(data){
				$scope.posts = data;
				for(var i = data.length - 1; i >= 0; i--){
					var repo = data[i];
					$scope.repos.push(repo.name);
				};
			})
			.error(function(err){
				console.log(err);
			});
		},
		$scope.optionSelected = function(data){
			$scope.$apply(function(){
				$scope.main_repo = data;
			})
		}
})
.controller("RepoController", function($scope, $http, $routeParams){
	$scope.repo = {};
	var hs = "https://api.github.com/repos/"+ $routeParams.owner +"/" + $routeParams.name;
	console.log(hs);
	$http.get(hs)
	.success(function(data){
		$scope.repo = data;
	})
	.error(function(err){
		console.log(err);
	});
});
