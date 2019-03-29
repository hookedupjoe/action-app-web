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
				"ctl": "tabs",
				"name": "pagetabs",
				"tabs": [
					{
						"label": "Preview",
						"name": "preview-control-tab",
						"ctl": "tab",
						"content": [
							{
								"ctl": "pagespot",
								"name": "preview-control"
							},
							{
								"ctl": "spot",
								"name": "body"
							}
						]
					},
					{
						"label": "Properties",
						"name": "preview-props-tab",
						"ctl": "tab",
						"content": [
							{
								"ctl": "pagespot",
								"name": "preview-props"
							}
						]
					},
					{
						"label": "Details",
						"name": "preview-details-tab",
						"ctl": "tab",
						"content": [
							{
								"ctl": "pagespot",
								"name": "preview-details"
							}
						]
					}
				]
			}
		]
	}

	var ThisControl = ThisApp.controls.newControl(ControlSpecs, {parent: ThisApp} )

	return ThisControl;

})(ActionAppCore, $);

