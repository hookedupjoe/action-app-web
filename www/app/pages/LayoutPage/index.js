/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "LayoutPage",
        pageTitle: "Layout Only",
        pageNamespace: 'layoutpg',
        navOptions: {
            topLink: true,
            sideLink: true
        }
    };

    thisPageSpecs.layoutOptions = {
        facetPrefix: thisPageSpecs.pageNamespace,
        north: true,
        south: false,
        west: true,
        east: true
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    var actions = ThisPage.pageActions;
    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;       
        
    }
    ThisPage._onInit = function () {

    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function (theApp) {

        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.initOnFirstLoad().then(
            function () {
                //--- Now your done - READY to do stuff the first time on your page

                var tmpHTML = [];
                tmpHTML.push('<div class="ui button" action="layoutpg:runTest" testname="Test 1">Run Test 1</div>')
                ThisPage.loadLayoutSpot('west', tmpHTML.join(''))

                //--- Then optionally call the stuff that will happen every time 
                //      the page is activated if not already called by above code
                ThisPage._onActivate();
            }
        );
    }

    ThisPage._onActivate = function () {
        //-- Do refresh / checks here to update when page is activated

    }
    //--- End lifecycle hooks

    //=== Page Setup
   

    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function (thePane, theElement, theState, theOptions, theName) {


        if (thePane == 'center') {
         

        } else if (thePane == 'east') {
          
        }
    }

    //=== Page Stuff


    //--- Add an action to this page ...
    actions.runTest = function runTest(theParams, theTarget){
        //--- Get params if passed as an object or from attr's on theTarget
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname']);
        //--- Use the variables
        var tmpTestName = tmpParams.testname || tmpParams.default || '';
        if( tmpTestName == "Test 1"){
            alert('Test 1')
        } else if( tmpTestName == "Test 2"){
            alert('Test 2')
        } else if( tmpTestName == "Test 3"){
            alert('Test 3')
        } else {
            alert('Just the test')
        }
    };
    
    
})(ActionAppCore, $);
