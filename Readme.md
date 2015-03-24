#Seeka-JS
**A scrollbar alternative for HTML applications**

> I bless those who seek a scroll
> <br/> - Inspectah Deck

### Overview

Browser scrollbars are hideous and can break layouts when initiated dynamically.  There are proven techniques to work around these issues, which can be mixed and matched for the desired effect.

* Using `overflow:hidden`, layouts can be locked down.  Overflow is hidden outside of the content area.  

* Nested elements can be manipulated relative to their overflow container using DOM positioning.  This approach does not work with raw text content, so it is best to wrap all content in a wrapper element.

* Via the `scrollTop` and `scrollLeft` element attributes, the content area of an element, including  can be manipulated.  The DOM box model provides access to the the relevant measurements.  JQuery can be used to provide animated (smooth) scrolling via attributes.

* DOM elements can be bound to event handlers in order to turn them into replacements for scroll bar controls.

Various libraries / plugins employ these techniques to provided systematic approaches to specific use cases.  Most rely on the DOM positioning approach, combined with a generated wrapper and control elements.  These approaches tend to require tailoring the content around the design expectations of the library, and customization is limited to that provided by API.  Interoperability between solutions is not dubious.

Rather than pick a specific approach, *Seeka* attempts to provide a general purpose toolkit for convenient initialization and control of the critical positioning operations and the generation of content wrappers.  

By extension, common operations, such as pagination and replacement UI controls, will hopefully be simplified and more accessible to developers who want convenience and/or control beyond that provided by other APIs.

### Project Status

Currently, the project is in alpha.  Features and relevant documentation will be added incrementally.  The initial roadmap:

* Implement pixel scrolling using the `scroll(Top|Left)` approach.
* Basic pagination
  * Each page is the size of the content viewport.
  * Pagination information is provided by the library.
  * Scrolling operations can be invoked in either `page` or `pixel` mode
* UI controls
  * Scrollwheel
  * Mouse drag
  * Arrow keys
  * Touch gestures  
* Behavior normalization
  * Detect the type of content and positioning requirements.
  * Inject a wrapper if necessary, or modify stylings
  * Create an event cycle / design pattern by which content changes can be tied to trigger normalization.
* Animation integration (fade, slide, etc)
* Add DOM positioning as an alternative operating mode.
  * Implement automatic detection of operating mode
  * Normalize behavior.
* Complex pagination
  * Pages are wrapped in DOM elements.
  * Automatic detection of viewport overflow and rewrapping of pages.
* Create customized/dynamic scrolling behavior, using content elements as references. *i.e. `next(".scrollTarget")`*