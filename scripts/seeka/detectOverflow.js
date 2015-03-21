/**
Provides detection for whether an element is overflowing.  

An element is considered overflowing if a scroll is possible on the target axis.

NOTES:
Because of the browser inconsistency regarding in how scroll content is rendered,
the content can overflow into padding area, but without the elment being unscrollable.
TODO Add methods content{Width|Height}() to detect these scenarios for responsive design.

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
	}
}