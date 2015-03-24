
/**
Provides detection for whether an element is overflowing.  

An element can be considered overflowing in two different scenarios.

1. If a scroll is possible on the target axis,
   implying the scrollable content overflows the container.
   This is referred to as scroll overflow.

2. The content extends beyond the content box into the padding area, 
   but without the element being scrollable.
   This is referred to as content overflow.

 The default syntax detects a scroll overflow.
 Explicit syntax is provided to test content overflow.

@return an object whose methods test the input element

.height() 
   : returns true if the element is scrollable vertically
.width() 
   : returns true if the element is scrollable horizontally

.contentHeight() 
   : returns true if the content overflows into the bottom padding area.
.contentWidth() 
   : returns true if the content overflows into the padding area.
*/
function detectOverflow(element) {
	var target = element.jquery ? element[0] : element
	
	return {
		width : function() {
			if (element.scrollLeft > 0) 
				return true
			
			element.scrollLeft += 1
			if (element.scrollLeft == 0)
				return false
			
			element.scrollLeft -= 1
			return true
		}
	,	height : function() {
			if (element.scrollTop > 0) 
				return true
			
			element.scrollTop += 1
			if (element.scrollLeft == 0)
				return false
			
			element.scrollTop -= 1
			return true
		}
	,	contentWidth : function() {
			var css = getComputedStyle(target)
			var width = parseInt(css.width,10)
			
			var padding = parseInt(css.paddingLeft,10)
				+ detectTrailingScrollPadding() ? parseInt(css.paddingRight,10) : 0
			
			return element.scrollWidth - padding > width
		}	
	,	contentHeight : function() {
			var css = getComputedStyle(target)
			var height = parseInt(css.height,10)
			
			var padding = parseInt(css.paddingTop, 10) 
				+ detectTrailingScrollPadding() ? parseInt(css.paddingBottom,10) : 0
			
			return element.scrollHeight - padding > height
		}
	}
}
	

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