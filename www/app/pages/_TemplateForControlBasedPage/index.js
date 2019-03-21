/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "ControlDesignerPage",
        pageTitle: "Designer",
        pageNamespace: 'ctldesign',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        appModule: AppModule
    };

    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';


    //--- Define page templates that should load when the page is activated
    thisPageSpecs.pageTemplates = {
        baseURL: pageBaseURL + 'tpl',
        //-- Page to lookup : name to call it when pulling
        //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
        templateMap: {
            // "page-header.html": thisPageSpecs.pageNamespace + ":page-header",
            // "page-east.html": thisPageSpecs.pageNamespace + ":page-east",
            // "page-body.html": thisPageSpecs.pageNamespace + ":page-body",
            // "page-footer.html": thisPageSpecs.pageNamespace + ":page-footer"
        }
    }

    thisPageSpecs.pageControls = {
        baseURL: pageBaseURL + 'controls',
        //-- Page to lookup : name to call it when pulling
        //---  No need to "namespace" your controls, they are page specific
        controlsMap: {
            "body.json": "bodyCtl",
            "header.json": "headerCtl",
            "footer.json": "footerCtl",
            "east.json": "eastCtl",
            "west.json": "westCtl"
        }
    }


    //--- Define this applications layouts
    //controls:  (use name from thisPageSpecs.pageControls)
    //   "north": {partname: "pageTitle",control: "titleBar"}
    //      and use: ThisPage.part.pageTitle to get control

    //-> templates:  (use name from thisPageSpecs.pageTemplates)
    //  "north": thisPageSpecs.pageNamespace + ":" + "page-north",

    thisPageSpecs.layoutOptions = {
        controls: {
            "center": { partname: "body", control: "bodyCtl" },
            "north": { partname: "header", control: "headerCtl" },
            "south": { partname: "footer", control: "footerCtl" },
            "east": { partname: "east", control: "eastCtl" },
            "west": { partname: "west", control: "westCtl" }
        },
        templates: {
            // "east": thisPageSpecs.pageNamespace + ":" + "page-east",
            // "north": thisPageSpecs.pageNamespace + ":" + "page-header",
            // "center": thisPageSpecs.pageNamespace + ":" + "page-body",
            // "west": thisPageSpecs.pageNamespace + ":" + "page-west"
        },
        facetPrefix: thisPageSpecs.pageNamespace,
        north: true,
        south: true,
        west: true,
        east: true
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "290"
        , east__size: "290"
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


        //--- Add Custom Web Control BEFORE doign the initOnFirstLoad so your controls are
        //    ... available to be loaded when controls are loaded

        //--- Add new page specific HTML generator        
   


        ///---- PAGE WEB CONTROLS





        ///====== ====== EMD WEB CTL





        //--- This tells the page to layout the page, load templates and controls, et
        ThisPage.initOnFirstLoad().then(
            function () {
                //--- Now your done - READY to do stuff the first time on your page




                //--- Do special stuff on page load here
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

    ThisPage.runTest = runTest;
    function runTest(theParams, theTarget){
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['testname'])
        alert('test ' + (tmpParams.testname || ''))
    };
    

})(ActionAppCore, $);