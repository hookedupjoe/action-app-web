/*
Author: Joseph Francis
License: MIT
*/

(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "JsonPage",
        pageTitle: "JSON Helper",
        pageNamespace: 'jsonpage',
        navOptions: {
            topLink: false,
            sideLink: true
        },
        appModule: AppModule
    };

    var docsBaseURL = 'app/pages/JsonPage/docs';

    //--- Define page templates that should load when the page is activated
    thisPageSpecs.pageTemplates = {
        baseURL: 'app/pages/JsonPage/tpl',
        //-- Page to lookup : name to call it when pulling
        //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
        templateMap: {
            "page-header.html": thisPageSpecs.pageNamespace + ":page-header",
            "page-east.html": thisPageSpecs.pageNamespace + ":page-east",
            "page-body.html": thisPageSpecs.pageNamespace + ":page-body",
            "page-west.html": thisPageSpecs.pageNamespace + ":page-west"
        }
    }

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        templates: {
            "east": thisPageSpecs.pageNamespace + ":" + "page-east",
            "north": thisPageSpecs.pageNamespace + ":" + "page-header",
            "center": thisPageSpecs.pageNamespace + ":" + "page-body",
            "west": thisPageSpecs.pageNamespace + ":" + "page-west"
        },
        facetPrefix: thisPageSpecs.pageNamespace,
        north: true,
        south: false,
        west: true,
        east: false
    }

    //--- Customize default layout configuration
    //--- See http://layout.jquery-dev.com/documentation.cfm for details
    thisPageSpecs.layoutConfig = {
        west__size: "330"
        , east__size: "600"
    }

    //--- Start with a ase SitePage component
    var ThisPage = new SiteMod.SitePage(thisPageSpecs);

    // .. they happen in this order

    //=== On Application Load ===
    /*
    * This happens when the page is loaded, try to push activity back to when the tab is used
    *    If your component need to do stuff to be availale in the background, do it here
    */
    ThisPage._onPreInit = function (theApp) {
        ThisPage._om = theApp.om;

    }
    ThisPage._onInit = function () {
        //console.log("Docs Page: _onInit");
    }

    //=== On Page Activation ===
    /*
    * This happens the first time the page is activated and happens only one time
    *    Do the lazy loaded stuff in the initial activation, then do any checks needed when page is active
    *    Do stuff that needs to be available from this component, such as services, 
    *     that are needed even if the page was not activated yet
    */
    ThisPage._onFirstActivate = function (theApp) {
        ThisPage.initOnFirstLoad().then(
            function () {

                ThisPage.jsonEditorEl = ThisPage.getByAttr$({spot: ThisPage.ns("json-editor")});
                
                ThisPage.jsonEditor = ace.edit(ThisPage.jsonEditorEl.get(0));
                ThisPage.jsonEditor.setTheme("ace/theme/vibrant_ink");
                ThisPage.jsonEditor.setFontSize(16);
                ThisPage.jsonEditor.session.setMode("ace/mode/json");
                ThisPage.jsonEditor.session.setTabSize(2);

                ThisPage.loadJson(ThisPage.defaultJson);
                             
                //--- Do special stuff on page load here
                //--- Then optionally call the stuff that will happen every time 
                //      the page is activated if not already called by above code
                ThisPage._onActivate();
            }
        );
    }

    ThisPage._onActivate = function () {
        //-- Do refresh / checks here to update when page is activated
        ThisPage._onResizeLayout();

    }
    //--- End lifecycle hooks
    
    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function () {
        
        try {

            if(ThisPage.jsonEditorEl && ThisPage.jsonEditor){
                var tmpH = ThisPage.layout.panes.center.height()
                ThisPage.jsonEditorEl
                .css('height','' + tmpH + 'px')
                .css('position','relative')
                ThisPage.jsonEditor.resize(true);
            }
        
        } catch (ex) {
            console.error("ex",ex)
        }
    }

    ThisPage.defaultJson = {
        "hello":"world"
    }

    ThisPage.clearJson = clearJson;
    function clearJson(){
        ThisPage.jsonEditor.setValue('');
    };

    ThisPage.formatJson = formatJson;
    function formatJson(){
        try {
            var tmpJSON = ThisPage.jsonEditor.getValue();
            var tmpEval = eval('ThisPage.__jsonConverter =' + tmpJSON)
            ThisPage.loadJson(tmpEval);    
        } catch (ex) {
            alert("Could not load", "Format Error", "e");
        }
        
    };
    
    ThisPage.loadJson = loadJson;
    function loadJson(theSpec){
        ThisPage.jsonEditor.setValue(ThisApp.json(theSpec));
        ThisPage.jsonEditor.clearSelection();
    };


})(ActionAppCore, $);
