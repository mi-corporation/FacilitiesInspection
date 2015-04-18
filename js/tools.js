// 
// tools.js
// A set of functions of random usefulness
//
// Author: David Nakamura
// Date: 11/10/2014
// 

var NO_NETWORK_TITLE = "No Network Found";
var NO_NETWORK_MESSAGE = "This device is currently not connected to a network. Please verify a connection via Wi-Fi or other data services and try again.";

//check if the intenet is available
function hasNetwork() {
    if (typeof navigator !== 'undefined' && typeof navigator.onLine !== 'undefined' && navigator.onLine == false) {
        return false;
    }
    else {
        return true;
    }
}

// set the radio button with the given value as being 

// do nothing if there are no radio buttons
// if the given value does not exist, all the radio buttons
// are reset to unchecked
function setCheckedValue(radioObj, newValue) {
    if (!radioObj)
        return;
    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        radioObj.checked = (radioObj.value == newValue.toString());
        return;
    }
    for (var i = 0; i < radioLength; i++) {
        radioObj[i].checked = false;
        if (radioObj[i].value == newValue.toString()) {
            radioObj[i].checked = true;
        }
    }
}

function replaceHtml(el, html) {
    var oldEl = typeof el === "string" ? document.getElementById(el) : el;
    /*@cc_on // Pure innerHTML is slightly faster in IE
		oldEl.innerHTML = html;
		return oldEl;
	@*/
    var newEl = oldEl.cloneNode(false);
    newEl.innerHTML = html;
    oldEl.parentNode.replaceChild(newEl, oldEl);
    /* Since we just removed the old element from the DOM, return a reference
	to the new element, which can be used to restore variable references. */
    return newEl;
};