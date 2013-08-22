box
===

custom image dialog box with animation

Demo: <a href="http://worzt.github.io/box/">http://worzt.github.io/box/</a>

Getting Started
=======================
Include jQuery, box.js, boxstyle.css and call <code>.box</code> method on some jquery object
```html
<html>
<head>
	<link rel="stylesheet" type="text/css" href="boxstyle.css" media="screen" />
</head>
<body>
	<a id="test" href="image.jpg">test</a>
	<span id="test2">test 2</span>
	<script src="jquery.js"></script>
	<script src="box.js"></script>
	<script>
		$("#test").box();
		$("#test2").box({ref:"2.jpg"});
	</script>
</body>
</html>
```
Options
=======================
```javascript
var defaults={
		width:0,	//for fixed width
		height:0,	//for fixed height
		ref:false,	//the href if the element is not <a href="">
		title:false,	//the text to display if caption is true
		closebutton:true,	//display close button
		type:"img",	//img or html
		caption:false,	//if true display the image title
		onStart:false,	//function to do before the box displaying
		onLoad:false,	//function to do when the url loads
		onClose:false,	//function to do before removing th box
		onError:false	//function to do if the box can´t load the url
};
```
Methods
=======================
create the box
```javascript
//create new box with default values on <a href="url">text</a>
$(this).box();
//create new box with object for custom values on any html object
$(this).box({
		ref:"imgs/1.jpg",
		title:"some title",
		caption:true
});
```
close the box
```javascript
$(this).box("close");
```