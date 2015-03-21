/**
Detects whether an element is overflowing using DOM attributes.

NOTES:  

This implementation requires jQuery for visible content width.
element.client{Width|Height} can be used in most cases, but causes improper detection
in some cases, such as detecting height improperly with `white-space:nowrap`.

Another issue, is that browsers render scrollHeight differently.  
Gecko does not include padding-bottom in scroll height, but Webkit does.
This creates situations in Firefox where the content overflows to padding,
but an oveflow is not detected, because firefox cannot scroll.
Because scroll is not allowed, this is technically correct.
Separate methods to detectOverflow.{contentHeight()|contentWidth()} could
use css height to detect if the scroll height has extended beyond the content area

A better detection method might simply involve testing to see if a scroll is possible
by incrementing the scroll{Top|Left} property and then decrementing.

*/
function detectOverflow(element) {
	var target = element.jquery ? element[0] : element
	
	return {
		width : function() {
			return element.scrollWidth > $(element).innerWidth() //element.clientWidth
		}
	,	height : function() {
			return element.scrollHeight > $(element).innerHeight()//element.clientHeight
		}
	}
}