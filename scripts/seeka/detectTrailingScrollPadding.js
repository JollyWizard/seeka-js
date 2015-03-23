/**
Detects whether the browser appends bottom or right padding to scrollable content.
This behavior is not standardized, and browsers handle it different.

The technique used here tests a fixed width, hidden div, 
to see if its scrollable content grows when trailing padding is added.

@returns whether or not the browser appends trailing padding to scrollable content.
true : Chrome
false : Firefox, IE
*/
function detectTrailingScrollPadding() {

	if (window.trailingScrollPadding)
		return window.trailingScrollPadding
		
	var wrapper = document.createElement('div')
	wrapper.style.visibility = 'hidden'
	
	var tester = document.createElement('div')	
	tester.innerHTML = 'M'
	tester.style.width = '0em'
	tester.style.overflow = 'hidden'
	tester.style.display = 'inline-block'
	
	wrapper.appendChild(tester)
	document.body.appendChild(wrapper)
	
	var css = getComputedStyle(tester)
	var preWidth = tester.scrollWidth
	
	tester.style.paddingRight = '10px'
	var postWidth = tester.scrollWidth 
	
	document.body.removeChild(wrapper)
	console.log({pre: preWidth,post: postWidth})
	
	window.trailingScrollPadding = preWidth != postWidth
	
	return window.trailingScrollPadding
}