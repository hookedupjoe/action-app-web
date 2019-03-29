/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

	var ControlSpecs = {
		"options": {
			"padding": false
		},
		"content": [
			{
				"ctl":"segment",
				"basic": true,
				"content": [
					{
						"ctl": "sep",
						"size": "small",
						"text": "Action Controls Designer"
					}
				]
			}
		]
	}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);

