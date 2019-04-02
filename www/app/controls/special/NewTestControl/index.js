/*
Author: Joseph Francis
License: MIT

Create a control .. a panel with a brain
*/
(function (ActionAppCore, $) {

    var ControlSpecs = {
        "content": [
            {
                "ctl": "field",
                "label": "Your Name",
                "size": "huge",
                "name": "title",
                "text": "Hello World"
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

    
    //--- Create a new control with the specs ..
    //--- Each instance of the control will have the prototype provided
    var ThisControl = {specs: ControlSpecs, options: { proto: ControlCode, parent: ThisApp }};
    //--- Anything else?
    return ThisControl;

})(ActionAppCore, $);
