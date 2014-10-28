angular.module('starter.directives',[])

.directive('cgFolder', function(clientSrvc){
	return{
		restrict: 'E',
		scope: {
			fname: '=',
			icon: '=',
			path: '=',
			click: '&onClick'
		},
		templateUrl: 'templates/directives/cg-folder.html'

	}
})

.directive('cgFile', function(){
	return{
		restrict: 'E',
		scope: {
			fname: '=',
			icon: '=',
			size: '=',
			modifiedAt: '=modifiedAt'
		},
		templateUrl: 'templates/directives/cg-file.html'
	}
})