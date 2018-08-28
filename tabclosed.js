var timer = null;
var thisTabId = null;
var timeLeft = prompt("Mitme minuti pärast soovite lehte sulgeda", "5");
timeLeft = 60*timeLeft;

var showTabTime = function(){
	if(timeLeft < 0){
		clearInterval(timer);
		chrome.tabs.remove(thisTabId);
	}else{
		if(timeLeft < 60){
			chrome.tabs.executeScript(thisTabId, {
				code: 'document.title="Avatud: '+ timeLeft + ' sek"'
			});
		}else{
			if(timeLeft%60==0){
				chrome.tabs.executeScript(thisTabId, {
					code: 'document.title="Avatud: '+ Math.floor(timeLeft/60) + ' min"'
				});
			}else{
				chrome.tabs.executeScript(thisTabId, {
					code: 'document.title="Avatud: '+ Math.floor(timeLeft/60) + ' min ja '+ timeLeft%60 + ' sek"'
				});
			}
		}
		timeLeft--;
	}
}

var destroyTab = function() {
	timer = setInterval(showTabTime, 1000);
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab){
  thisTabId = tab.id;
  
  destroyTab();
});