function DealListCtrl ($scope) {
	$scope.deals=[];
	$scope.eventsCtrl=function($event) {
		if($event.keyCode == '13' && !textInput.value == '' && 
			$scope.deals.indexOf(textInput.value) == -1) {$scope.deals
			.push(textInput.value);
			textInput.value='';
		}
	}
	$scope.checkedCtrl=function($event, chec) {
		if($event.currentTarget.id == 'checkboxAll') alert(1);
		alert(chec.checked);
	}
}

