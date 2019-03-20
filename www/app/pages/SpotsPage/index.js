/*
Author: Joseph Francis
License: MIT
*/
(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "SpotsPage",
        pageTitle: "Spots",
        pageNamespace: 'spotpg',
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
            "page-body.html": thisPageSpecs.pageNamespace + ":page-body"
        }
    }

    thisPageSpecs.pageControls = {
        baseURL: pageBaseURL + 'controls',
        //-- Page to lookup : name to call it when pulling
        //---  No need to "namespace" your controls, they are page specific
        controlsMap: {
            "title.json": "titleBarCtl",
            "nestedtabs.json": "previewPanelCtl",
            "showfor.json": "demoFormCtl",
            "buttonPanel.json": "buttonPanelCtl"
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
            "north": { partname: "pageTitle", control: "titleBarCtl" },
            "east": { partname: "previewPanel", control: "previewPanelCtl" },
            "west": { partname: "buttonPanel", control: "buttonPanelCtl" }
        },
        templates: {
            "center": thisPageSpecs.pageNamespace + ":" + "page-body"
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
        west__size: "300"
        , east__size: "250"
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


        //--- Create Custom Web Controls to use in control JSON at "ctl"
        //     - Namespace it - one global web controls, similar to one templating engine
        var ControlHelloWorld = {
            getHTML: function (theControlName, theObject, theControlObj, isSigner) {
                var tmpObject = theObject || {};
                var tmpName = tmpObject.yourname || 'World';

                var tmpHTML = [];
                tmpHTML.push('<h1>Hello ' + tmpName + '!</h1><hr /><div pagespot="hello-area">Hello Area Here</div>')

                tmpHTML = tmpHTML.join('');
                return tmpHTML;

            },
            isField: false
        }
        //--- Add Custom Web Control BEFORE doign the initOnFirstLoad so your controls are
        //    ... available to be loaded when controls are loaded

        //--- Add new page specific HTML generator        
        ThisPage.addPageWebControl("hello", ControlHelloWorld);



        ///---- PAGE WEB CONTROLS

        var ControlTabPreviewCards = {
            getHTML: function (theControlName, theObject, theControlObj, isSigner) {
                var tmpObject = theObject || {};
                var tmpPageSpot = tmpObject.pagespot || '';

                var tmpHTML = [];
                if (tmpPageSpot) {
                    tmpPageSpot = ' pagespot="' + tmpPageSpot + '" '
                }

                tmpHTML.push('<div ' + tmpPageSpot + ' class="ui cards">')
                
                var tmpItems = tmpObject.items || tmpObject.cards || [];
                if ((tmpItems && tmpItems.length)) {
                    for (var iPos = 0; iPos < tmpItems.length; iPos++) {
                        var tmpItem = tmpItems[iPos];
                        var tmpCtl = tmpItem.ctl || 'field'
                        tmpHTML.push(ThisApp.controls.getHTMLForControl(tmpCtl, tmpItem, theControlObj))
                    }
                }

                tmpHTML.push('</div>')

                tmpHTML = tmpHTML.join('\n');
                return tmpHTML;

            },
            isField: false
        }
        ThisPage.addPageWebControl("previewcards", ControlTabPreviewCards);


        var ControlTabPreviewCard = {
            getHTML: function (theControlName, theObject, theControlObj, isSigner) {
                var tmpObject = theObject || {};
                var tmpTitle = tmpObject.title || '';
                var tmpText = tmpObject.text || '';
                var tmpTabName = tmpObject.tabname || '';

                var tmpHTML = [];

                tmpHTML.push('	<!-- Card ============ =============  -->')
                tmpHTML.push('	<div class="ui card">')
                tmpHTML.push('	  <div class="content">')
                if (tmpTitle) {
                    tmpHTML.push('		<div class="header">' + tmpTitle + '</div>')
                }
               
                if (tmpText) {
                    tmpHTML.push('		<div class="description">')
                    tmpHTML.push(tmpText)
                    tmpHTML.push('		</div>')
                }
                tmpHTML.push('	  </div>')
                if (tmpTabName) {
                    tmpHTML.push('	  <div pageaction="gotoTab" tab="' + tmpTabName + '" class="ui bottom attached icon button basic blue ">')
                    tmpHTML.push('		<i class="up arrow icon"></i>')
                    tmpHTML.push('		Open that tab')
                    tmpHTML.push('	  </div>')
                }
                tmpHTML.push('	</div>')



                tmpHTML = tmpHTML.join('\n');
                return tmpHTML;

            },
            isField: false
        }
        ThisPage.addPageWebControl("previewcard", ControlTabPreviewCard);





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

    actions.showHelloWorld = showHelloWorld;
    function showHelloWorld() {
        ThisPage.loadPageSpot('body-area', 'Hello World')
    };
    actions.showHello = showHello;
    function showHello(theParams, theTarget) {
        var tmpParams = ThisApp.getActionParams(theParams, theTarget, ['myname']);
        var tmpName = tmpParams.myname || '';
        if (!tmpName) {
            ThisPage.loadPageSpot('body-area', 'Hello World')
        } else {
            ThisPage.loadPageSpot('body-area', 'Hello ' + tmpName)
        }
    };

    actions.showHelloUsingAction = showHelloUsingAction;
    function showHelloUsingAction() {
        showHello({ 'myname': "Action Jackson" })
    };


})(ActionAppCore, $);
