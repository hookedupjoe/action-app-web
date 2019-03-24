/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var ControlName = "TesterControl";

    var ControlSpecs = {
        "content":  [
            {
                "ctl": "tabs",
                "name": "controls-tabs",
                "tabs": [
                    {
                        "label": "Catalog",
                        "name": "catalog-tab",
                        "ctl": "tab",
                        "content": [
                            {
                                "ctl": "tabs",
                                "name": "catalog-tabs",
                                "color": "purple",
                                "tabs": [
                                    {
                                        "label": "Available",
                                        "name": "catalog-tab-list-tab",
                                        "ctl": "tab",
                                        "content": [
                                            {
                                                "ctl": "button",
                                                "color": "purple",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"hello"
                                                },
                                                "text": "Say Hello"
                                            },
                                            {
                                                "ctl": "button",
                                                "color": "purple",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"spots"
                                                },
                                                "text": "Fun with spots"
                                            },
                                            {
                                                "ctl": "button",
                                                "color": "blue",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"test2"
                                                },
                                                "text": "Test 2"
                                            },	{
                                                "ctl": "button",
                                                "color": "green",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"test3"
                                                },
                                                "text": "Test 3"
                                            },	{
                                                "ctl": "button",
                                                "color": "green",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"test4"
                                                },
                                                "text": "Test 4"
                                            },	{
                                                "ctl": "button",
                                                "color": "red",											
                                                "attr": {
                                                    "pageaction": "runTest",
                                                    "testname":"test5"
                                                },
                                                "text": "Test 5"
                                            },
                                            {
                                                "ctl": "pagespot",
                                                "name": "catalog-tab-list"
                                            }
                                        ]
                                    },
                                    {
                                        "label": "Loaded",
                                        "name": "catalog-tab-loaded-tab",
                                        "ctl": "tab",
                                        "content": [
                                            {
                                                "ctl": "pagespot",
                                                "name": "catalog-tab-loaded"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "label": "Clipboard",
                        "name": "controls-clipboard-tab",
                        "ctl": "tab",
                        "content": [
                            {
                                "ctl": "pagespot",
                                "name": "controls-clipboard"
                            },
                            {
                                "ctl": "pagespot",
                                "name": "hello-area"
                            }
                        ]
                    }
                ]
            }
        ]
    }

    var ControlCode = {
        helloCounter: 0,
        sayHello: sayHello
    }
    
    function sayHello(theOptionalName){
        var tmpMsg = '';
        if( theOptionalName ){
            tmpMsg = "Howdy " + theOptionalName;
        } else {
            this.helloCounter++;
            var tmpColor = "blue";
            if (this.helloCounter % 2 == 0){
                tmpColor = "orange";    
            }
            tmpMsg = 'Tester - Hello ' + this.helloCounter + ' times.'
        }
        

        this.setFieldValue('title',tmpMsg);
        this.setFieldMessage('title','I was set',{color: tmpColor});
        ThisApp.refreshLayouts();
        var tmpThis = this;
        ThisApp.delay(1000).then(function(){
            tmpThis.setFieldMessage('title', '');
            ThisApp.refreshLayouts();
        })
    }

    

    var ThisControl = ThisApp.controls.newControl(ControlSpecs, { proto: ControlCode, parent: ThisApp } )

    return ThisControl;

})(ActionAppCore, $);
