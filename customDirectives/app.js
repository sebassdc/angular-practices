angular.module("CustomDirective", [])
.directive("myAutocomplete", function(){
	function link(scope, element, atribs){
		$(element).autocomplete({
			source: scope[atribs.myAutocomplete],
			select: function(ev, ui){
				ev.preventDefault();
				if(ui.item){
					scope.optionSelected(ui.item.value);
				}
			},
			focus: function(ev, ui){
				ev.preventDefault();
				$(this).val(ui.item.label);
			}
		});
	};
	return {
		link: link
	};
})
.directive('backImg', function(){
	return function(scope, element, atribs){
		atribs.$observe('backImg', function(value){
			element.css({
				"background": "url("+value+")",
				"background-size": "cover",
				"background-position": "center"
			});
		});
	}
})

.controller("AppCtrl", function($scope, $http){
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
});
function arrayfilter(data){
	var repos = [];
	for(var i = data.length - 1; i >= 0; i--){
		var repo = data[i];
		repos.push(repo.name);
	};
	return repos;
}
