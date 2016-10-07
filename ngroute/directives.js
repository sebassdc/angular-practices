angular.module("CustomDirective")
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
