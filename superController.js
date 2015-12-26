function DealListCtrl ($scope) {
	$scope.deals=[];
	$scope.eventsCtrl=function($event) {
		if($event.keyCode == '13' && !textInput.value == '' && 
			$scope.deals.indexOf(textInput.value) == -1) {$scope.deals
			.unshift(textInput.value);
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
				var check=document.getElementById('checkbox'+i);
				check.checked=true;
				check.parentNode.nextSibling.nextSibling.setAttribute('style',
					'text-decoration:line-through; transition: all .03s; color: #259433');
			}
		}
		else {
			for(var i=0; i < $scope.deals.length; i++) {
				var check=document.getElementById('checkbox'+i);
				check.checked=false;
				check.parentNode.nextSibling.nextSibling.setAttribute('style',
					'text-decoration:none; transition: all .03s;');
			}
		}

	}
	$scope.checkedCtrl=function($event) {
		if($event.currentTarget.checked == false) {
			$event.currentTarget.parentNode.nextSibling.nextSibling.setAttribute('style',
				'text-decoration:none; transition: all .03s;');
		}
		if($event.currentTarget.checked == true) {
			$event.currentTarget.parentNode.nextSibling.nextSibling.setAttribute('style',
				'text-decoration:line-through; transition: all .03s; color: #259433');

			var mass=[];
		
			for(var i=0; i < $scope.deals.length; i++) {
				mass.push(document.getElementById('checkbox'+i).checked);
			};
			if(mass.indexOf(false) == -1) document.getElementById('checkboxAll').checked=true;
		}

		if($event.currentTarget.checked == false && document.getElementById('checkboxAll').checked ==true) {
			document.getElementById('checkboxAll').checked=false;
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
}

