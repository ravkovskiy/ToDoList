angular.module('ToDo', []).
  filter('dealsDone', function() {
    return function(deals, dealsFilter) {
    	if(dealsFilter=='all') return deals;
       	var mas=[];
    	for (var i=0; i<deals.length; i++) {
    		if(deals[i].done == dealsFilter) {
    			mas.push(deals[i]);
    		}
    	}
    	return mas;
    }
 });




/*Объявляем функцию контроллер*/
function DealListCtrl ($scope) {

	$scope.deals=[];
	$scope.dealsFilter='all';
/*При вводе новых дел выполняется функция eventsCtrl */
	$scope.eventsCtrl=function($event) {

		$scope.dealsText=[];

		for(var i=0; i<$scope.deals.length; i++) {
			$scope.dealsText[i]=$scope.deals[i].textToDo;
		}

		/* textInput это id поля ввода */
		if($event.keyCode == '13' && !textInput.value == '' && 
			$scope.dealsText.indexOf(textInput.value) == -1) {$scope.deals.unshift({'textToDo': textInput.value, 'done': false});
			textInput.value='';
			document.getElementById('checkboxAll').checked=false;
			if(document.getElementById('img').style != 'display: none') {
				document.getElementById('img').setAttribute('style', 'display: none');
			}
		}	

	}
	$scope.checkedAllCtrl=function($event) {
		if($event.currentTarget.checked == true) {
			for(var i=0; i < $scope.deals.length; i++) {
				$scope.deals[i].done=true;
			}
		}
		else {
			for(var i=0; i < $scope.deals.length; i++) {
				$scope.deals[i].done=false;		
			}
		}

	}
	$scope.checkedCtrl=function($event) {
		if($event.currentTarget.checked == false) {
			
			$scope.deals[$event.currentTarget.id.slice(8)].done=false;
			document.getElementById('checkboxAll').checked=false;
		}
		if($event.currentTarget.checked == true) {
			
			$scope.deals[$event.currentTarget.id.slice(8)].done=true;
			document.getElementById('checkboxAll').checked=true;
			for(var i=0; i < $scope.deals.length; i++) {
				if($scope.deals[i].done == false) document.getElementById('checkboxAll').checked=false;
			};
		    
		}

		/*Следующий код сортирует массив дел, чтобы выполненные дела нахлдились внизу списка*/
		var oldDeals=[];

		for(var i=0; i<$scope.deals.length; i++) {
			oldDeals[i]={};
			oldDeals[i].textToDo=$scope.deals[i].textToDo;
			oldDeals[i].done=$scope.deals[i].done;
		}
		
		var j=oldDeals.length-1;
		var k=0;

		for(var i=j; i>=0; i--) {
			if(oldDeals[i].done == true) {
				$scope.deals[j].textToDo=oldDeals[i].textToDo;
				$scope.deals[j].done=oldDeals[i].done;
				document.getElementById('checkbox'+j).checked=true;
				j--;
				k++;
			}
		}
		j=oldDeals.length-1-k;	
		for(var i=oldDeals.length-1; i>=0; i--) {
			if(oldDeals[i].done == false) {
				$scope.deals[j].textToDo=oldDeals[i].textToDo;
				$scope.deals[j].done=oldDeals[i].done;
				document.getElementById('checkbox'+j).checked=false;
				
				j--;
			}
		}
	}

	$scope.closeCtrl=function($event, deal) {
		var mass=[];
		
		for(var i=0; i < $scope.deals.length; i++) {
			mass.push(document.getElementById('checkbox'+i).checked);
		};

		mass.splice($scope.deals.indexOf(deal),1);

		$scope.deals.splice($scope.deals.indexOf(deal),1);


		if(mass.indexOf(false) == -1 && mass.length > 0) document.getElementById('checkboxAll').checked=true;

		if($scope.deals.length == 0) {
			document.getElementById('img').setAttribute('style', '');
		}
	}
	$scope.all=function() {
		$scope.dealsFilter='all';
	}
	$scope.notDone=function() {
		$scope.dealsFilter= false;
	}
	$scope.done=function() {
		$scope.dealsFilter= true;
	}
	$scope.closeAll=function() {
		$scope.deals=[];
		document.getElementById('checkboxAll').checked=false;
	}
}



