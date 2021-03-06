//script to handle popup options
//loads when popup.html is opened by clicking on the extension icon
var toggler = document.getElementById("toggler");
var ontxt = "Pause Productivity Mode";
var offtxt = "Unpause Productivity Mode";

function on(){
	if(toggler){
		toggler.innerHTML = ontxt; //Text to displayed after it has been turned on
		chrome.browserAction.setIcon({path:"/img/on.png"});
	}
}

function off(){
	if(toggler){
		toggler.innerHTML = offtxt;//Text to be displayed after LookFWD has been turned off
		chrome.browserAction.setIcon({path:"/img/off.png"});
	}
}

function toggle(){
	chrome.storage.sync.get("key",function(result){
		// console.log("toggle function key val is " + result.key);
		if(result.key == "true"){
			chrome.storage.sync.set({
				"key": "false"
			},function(){
				off();
			}
			);
		}
		else{
			chrome.storage.sync.set({
				"key": "true"
			},function(){
				on();
			}
			);
		}
	});
}

document.addEventListener("DOMContentLoaded", function(){
	// Used to update popup info based on chrome storage key settings
	chrome.storage.sync.get(null, function(result){
		if(result.key == "true"){
			on();
		}
		else{
			off();
		}
	});
});

if(toggler){
	toggler.addEventListener("click",function(){
		toggle();
	});
}
