function DealListCtrl ($scope) {
	$scope.deals=['Написать продолжение кода', 'Принять душ', 'df'];
	$scope.eventsCtrl=function($event) {
		if($event.keyCode == '13' && !textInput.value == '' && 
			$scope.deals.indexOf(textInput.value) == -1) {$scope.deals
			.push(textInput.value);
			textInput.value='';
		}
	}
}

