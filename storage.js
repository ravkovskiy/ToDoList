restoreSettings = function() {
	if (!localStorage['saved.settings'] == 'true') {
	    return false;	
	} 
}
savedSettings = function(deals) {
	localStorage['saved.settings'] = 'true';
	localStorage['numbers.deals'] = deals.length;
	for (var i = 0; i < deals.length; i++) {
		localStorage['text.to.do.' + i] = deals[i].textToDo;
		localStorage['done.' + i] = String(deals[i].done);
	}
	localStorage['checkbox.all'] =
	    String(document.getElementById('checkboxAll').checked);
	localStorage['display.img'] =
	    document.getElementById('img').style.display;
}