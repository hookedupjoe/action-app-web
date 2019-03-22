/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisControlSpecs = {
        controlName: "TesterControl",
        controlTitle: "Designer",
        controlNamespace: 'ctldesign',
        appModule: AppModule
    };

    var controlBaseURL = 'app/controls/' + thisControlSpecs.controlName + '/';


    //--- Define control templates that should load when the control is activated
    thisControlSpecs.controlTemplates = {
        baseURL: controlBaseURL + 'tpl',
        //-- Control to lookup : name to call it when pulling
        //---  Good to "namespace" your templates with the control prefix to avoid name conflicts
        templateMap: {
        }
    }

    thisControlSpecs.controlControls = {
        baseURL: controlBaseURL + 'controls',
        //-- Control to lookup : name to call it when pulling
        //---  No need to "namespace" your controls, they are control specific
        controlsMap: {
            "body.json": "bodyCtl",
            "header.json": "headerCtl",
            "footer.json": "footerCtl",
            "east.json": "eastCtl",
            "west.json": "westCtl"
        }
    }


    //--- Define this applications layouts
    //controls:  (use name from thisControlSpecs.controlControls)
    //   "north": {partname: "controlTitle",control: "titleBar"}
    //      and use: ThisControl.part.controlTitle to get control

    //-> templates:  (use name from thisControlSpecs.controlTemplates)
    //  "north": thisControlSpecs.controlNamespace + ":" + "control-north",

    thisControlSpecs.layoutOptions = {
        controls: {
            "center": { partname: "body", control: "bodyCtl" },
            "north": { partname: "header", control: "headerCtl" },
            "south": { partname: "footer", control: "footerCtl" },
            "east": { partname: "east", control: "eastCtl" },
            "west": { partname: "west", control: "westCtl" }
        },
        templates: {
        },
        facetPrefix: thisControlSpecs.controlNamespace,
        north: true,
        south: true,
        west: true,
        east: true
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisControlSpecs.layoutConfig = {
        west__size: "20%"
        , east__size: "40%"
    }


    //--- Start with a ase SiteControl component
    var ThisControl = new SiteMod.SiteControl(thisControlSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the control is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisControl.controlActions;
    ThisControl._onPreInit = function (theApp) {
        ThisControl._om = theApp.om;

    }
    ThisControl._onInit = function () {

    }

    //=== On Control Activation ===
    /*
    * This happens the first time the control is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when control is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the control was not activated yet
    */
    ThisControl._onFirstActivate = function (theApp) {
        //--- This tells the control to layout the control, load templates and controls, et
        ThisControl.initOnFirstLoad().then(
            function () {
                //--- Now your done - READY to do stuff the first time on your control
             
                

                //--- Do special stuff on control load here
                //--- Then optionally call the stuff that will happen every time 
                //      the control is activated if not already called by above code
                ThisControl._onActivate();
            }
        );
    }

    ThisControl._onActivate = function () {
        //-- Do refresh / checks here to update when control is activated

    }
    //--- End lifecycle hooks

    //=== Control Setup


    //--- Layout related lifecycle hooks
    ThisControl._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {
        if (thePane == 'center') {

        } else if (thePane == 'east') {

        }
    }

    //=== Control Stuff
    var tests = {
        "hello": function(theParams){
            alert("Hello World Again")
        }
        ,"test2": test2
        ,"spots": playWithSpots
    }

    
    var tmpTest2Counter = 0;
    function test2(theName){
        tmpTest2Counter++;
        var tmpArea = ThisControl.parts.body;
        var tmpArea2 = ThisControl.parts.east;
        tmpArea.getSpot("body").css('color','blue');
        tmpArea.loadSpot("body", "Hello Center Spot " + tmpTest2Counter);
        tmpArea.gotoItem('body');

        var tmpNewText = '';
        if( (tmpTest2Counter % 2) == 1 ){
            tmpNewText = 'New Top Header';
        }
        tmpArea.runItemAction('card-full-matt', 'setTopHeader', {text:tmpNewText})
        // tmpArea2.getSpot("body").append("Hello East Spot");
        tmpArea2.loadSpot("body", "Hello East Spot " + tmpTest2Counter);
        
        tmpArea2.gotoItem('body');
        //ThisControl.part.east.addToSpot("body", "Hello East Spot");
    }

    function playWithSpots(theName){
        var tmpPreviewArea = ThisControl.parts.east;
        
        ThisControl.loadSpot("hello-area", "Hello Area");
        ThisControl.loadSpot("preview-details", "Hello World Again");
        tmpPreviewArea.gotoItem('preview-details');
        
        var tmpIsVis = tmpPreviewArea.getItemDisplay('preview-details');
        tmpPreviewArea.setItemDisplay('preview-details', !tmpIsVis, ['slow']);

        
        
    }

    actions.runTest = runTest;
    function runTest(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname','param1','param2'])
        var tmpName = tmpParams.testname || '';
        if( !(tmpName) ){
            alert('Test ran, add testname param to run a specific test');
            return;
        }
        var tmpTestFunc = tests[tmpName];
        if( !(tmpTestFunc) ){
            alert('Test ' + tmpName + ', add testname param to run a specific test');
            return;
        }
        tmpTestFunc(theParams);

    };
    

})(ActionAppCore, $);
