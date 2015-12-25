function DealListCtrl ($scope) {
	$scope.deals=[];
	$scope.eventsCtrl=function($event) {
		if($event.keyCode == '13' && !textInput.value == '' && 
			$scope.deals.indexOf(textInput.value) == -1) {$scope.deals
			.push(textInput.value);
			textInput.value='';
			document.getElementById('checkboxAll').checked=false;
		}
	}
	$scope.checkedAllCtrl=function($event) {
		if($event.currentTarget.checked == true) {
			for(var i=0; i < $scope.deals.length; i++) {
				var check=document.getElementById('checkbox'+i);
				check.checked=true;
				check.parentNode.nextSibling.nextSibling.setAttribute('style','text-decoration:line-through; color:#ddd');
			}
		}
		else {
			for(var i=0; i < $scope.deals.length; i++) {
				var check=document.getElementById('checkbox'+i);
				check.checked=false;
				check.parentNode.nextSibling.nextSibling.setAttribute('style','text-decoration:none; color:black');
			}
		}

	}
	$scope.checkedCtrl=function($event) {
		if($event.currentTarget.checked == false) {
			document.getElementById($event.currentTarget.id).parentNode.nextSibling.nextSibling.setAttribute('style','text-decoration:none; color:black');
		}
		if($event.currentTarget.checked == true) {
			document.getElementById($event.currentTarget.id).parentNode.nextSibling.nextSibling.setAttribute('style','text-decoration:line-through; color:#ddd');
		}
		if($event.currentTarget.checked == false && document.getElementById('checkboxAll').checked ==true) document.getElementById('checkboxAll').checked=false;
	}
}

