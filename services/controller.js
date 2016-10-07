angular.module("ToDoList", ["LocalStorageModule"])
	.service('ToDoService', function(localStorageService){
		this.key = "angular-todolist";
		if (localStorageService.get(this.key)) {
			this.activities = localStorageService.get(this.key);
		}else{
			this.activities = [];
		}
		this.updaLocalStorage = function(){
			localStorageService.set(this.key, this.activities);
		};
		this.add = function(newActv){
			this.activities.push(newActv)
			this.updaLocalStorage();
		};
		this.clean = function(){
			this.activities = [];
			this.updaLocalStorage();
			return this.getAll();
		};
		this.getAll = function(){
			console.log("geting ALl");
			return this.activities;
		};
		this.removeItem = function(item){
			this.activities = this.activities.filter(function(activity){
				return activity !== item;
			});
			this.updaLocalStorage();
			return this.getAll();
		};
	})
	.controller("ToDoController", function($scope, ToDoService){
		$scope.todo = ToDoService.getAll();
		$scope.newActv = {};
		$scope.addActv = function(){
			ToDoService.add($scope.newActv);
			$scope.newActv = {};
		}
		$scope.removeActv = function(item){
			$scope.todo = ToDoService.removeItem(item);
		}
		$scope.clean = function(){
			$scope.todo = ToDoService.clean();
		}
	});
