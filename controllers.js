angular.module('ToDo', []).
  filter('dealsDone', function() {
    return function(deals, dealsFilter) {
    	if (dealsFilter == 'all') {
    		return deals;
    	}
       	var mas = [];
    	for (var i = 0; i < deals.length; i++) {
    		if (deals[i].done == dealsFilter) {
    			mas.push(deals[i]);
    		}
    	}
    	return mas;
    }
 });
/*Объявляем функцию контроллер*/
function DealListCtrl ($scope) {
	$scope.dealsFilter = 'all';
	if (restoreSettings()){
		$scope.deals = [];	
	} else {
		$scope.deals = [];
		for (var i = 0; i < localStorage['numbers.deals']; i++) {
			$scope.deals[i] = {
				'textToDo': localStorage['text.to.do.' + i],
		        'done': 'true' == localStorage['done.' + i]
		    };
		}
		document.getElementById('checkboxAll').checked =
		    (localStorage['checkbox.all'] == 'true');
		document.getElementById('img').setAttribute('style',
		    'display: ' + localStorage['display.img']);
	}
/*При вводе новых дел выполняется функция eventsCtrl */
	$scope.eventsCtrl = function($event) {
		$scope.dealsText = [];
		for (var i = 0; i < $scope.deals.length; i++) {
			$scope.dealsText[i] = $scope.deals[i].textToDo;
		}
		/* textInput это id поля ввода */
		if ($event.keyCode == '13' && !textInput.value == '' && 
			$scope.dealsText.indexOf(textInput.value) == -1) {
			    $scope.deals.unshift({'textToDo': textInput.value,
			        'done': false});
			    textInput.value = '';
			    document.getElementById('checkboxAll').checked = false;
			    if (document.getElementById('img').style != 'display: none') {
				    document.getElementById('img').setAttribute('style',
				        'display: none');
			    }
			savedSettings($scope.deals);
		}	
	}
	$scope.checkedAllCtrl = function($event) {
		if ($event.currentTarget.checked == true) {
			for (var i = 0; i < $scope.deals.length; i++) {
				$scope.deals[i].done = true;
			}
		} else {
			for (var i = 0; i < $scope.deals.length; i++) {
				$scope.deals[i].done = false;		
			}
		}
		savedSettings($scope.deals);
	}
	$scope.checkedCtrl=function($event) {
		if ($event.currentTarget.checked == false) {
			$scope.deals[$event.currentTarget.id.slice(8)].done = false;
			document.getElementById('checkboxAll').checked = false;
		}
		if ($event.currentTarget.checked == true) {
			$scope.deals[$event.currentTarget.id.slice(8)].done = true;
			document.getElementById('checkboxAll').checked = true;
			for (var i = 0; i < $scope.deals.length; i++) {
				if ($scope.deals[i].done == false) {
					document.getElementById('checkboxAll').checked = false;
				}
			}
		}
		savedSettings($scope.deals);
	}
	$scope.closeCtrl = function($event, deal) {
		var mass = [];
		for (var i = 0; i < $scope.deals.length; i++) {
			if (!document.getElementById('checkbox' + i) == undefined) {
				mass.push(document.getElementById('checkbox' + i).checked);
			}	
		}
		mass.splice($scope.deals.indexOf(deal),1);
		$scope.deals.splice($scope.deals.indexOf(deal),1);
		if (mass.indexOf(false) == -1 && mass.length > 0) {
			document.getElementById('checkboxAll').checked = true;
		}
		if ($scope.deals.length == 0) {
			document.getElementById('img').setAttribute('style', '');
			document.getElementById('checkboxAll').checked = false;
		}
		savedSettings($scope.deals, $scope.dealsFilter);
	}
	$scope.all = function() {
		$scope.dealsFilter = 'all';
		savedSettings($scope.deals);
	}
	$scope.notDone = function() {
		$scope.dealsFilter = false;
		savedSettings($scope.deals);
	}
	$scope.done = function() {
		$scope.dealsFilter = true;
		savedSettings($scope.deals);
	}
	$scope.closeAll = function() {
		if ($scope.dealsFilter == 'all') {
			$scope.deals = [];
			document.getElementById('checkboxAll').checked = false;
			document.getElementById('img').setAttribute('style',
			    'display: block');
			savedSettings($scope.deals);
		}
		if ($scope.dealsFilter == true) {
			for (var i = 0; i < $scope.deals.length; i++) {
				if ($scope.deals[i].done == true) {
					$scope.deals.splice(i, 1);
					--i;
				}
			}
			document.getElementById('checkboxAll').checked = false;
		}
		if ($scope.dealsFilter == false) {
			for (var i = 0; i < $scope.deals.length; i++) {
				if ($scope.deals[i].done == false) {
					$scope.deals.splice(i, 1);
					--i;
				}
			}
			if (!$scope.deals.length == 0) {
				document.getElementById('checkboxAll').checked = true;
			}
		}
	}
}