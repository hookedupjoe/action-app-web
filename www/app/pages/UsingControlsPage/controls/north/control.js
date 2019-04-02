/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"content": [
			{
				"ctl": "field",
				"size": "huge",
				"name": "title",
				"text": "Hello World"
			}
		]
	}

	var ControlCode = {};
	var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};

	return ThisControl;

})(ActionAppCore, $);

