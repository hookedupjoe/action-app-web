/*
Author: Joseph Francis
License: MIT
*/

(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "DocsPage",
        pageTitle: "Docs",
        pageNamespace: 'docs',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        appModule: AppModule
    };


    var pageBaseURL = 'app/pages/' + thisPageSpecs.pageName + '/';
    var docsBaseURL =  'app/pages/DocsPage/docs';

    //--- Define page templates that should load when the page is activated
    thisPageSpecs.required = {
        templates: {
            baseURL: pageBaseURL + 'tpl',
            //-- Page to lookup : name to call it when pulling
            //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
            map: {
                "cat-document.html": thisPageSpecs.pageNamespace + ":cat-document",
                "cat-contents.html": thisPageSpecs.pageNamespace + ":cat-contents"
            }
        },
        html: {
            baseURL: pageBaseURL + 'html',
            map: {
                "page-header.html": "page-header",
                "page-east.html": "page-east",
                "page-body.html": "page-body",
                "page-west.html": "page-west"
            }
        }
    }

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        html: {
            "east": "page-east",
            "north": "page-header",
            "center": "page-body",
            "west": "page-west"
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
        , east__size: "300"
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

    ThisPage.categoriesIndex = {};
    ThisPage.tabsStatus = {};

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
                ThisApp.subscribe("_app:gotoTab", ThisPage.tabChanged)

                var tmpDocsList = ['index.json'];
                showContentInPreviewPane('about-action-app')
                ThisApp.om.getObjects('[get]:' + docsBaseURL, tmpDocsList).then(function (theDocs) {
                    var tmpIndexDoc = theDocs["index.json"];
                    if (!(tmpIndexDoc)) {
                        //--- No Documentation found
                        console.error("No Documentation found");
                        throw ("No Documentation found");
                    }
                    if (tmpIndexDoc && tmpIndexDoc.categories) {
                        ThisPage.categoriesIndex = tmpIndexDoc.categories;
                    }

                });
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

    //--- Layout related lifecycle hooks
    ThisPage._onResizeLayout = function () {
        //--- Do layout stuff

    }
    //--- End Layout related lifecycle hooks
    ThisPage.showBoxVideo = function (theVideoID, theTarget) {
        var tmpVideoID = theVideoID;
        if (theTarget) {
            tmpVideoID = $(theTarget).attr('video');
        }
        var tmpHTML = '<iframe src="https://ibm.ent.box.com/embed/s/' + tmpVideoID + '?sortColumn=date&view=list" width="100%" height="550" frameborder="0" allowfullscreen webkitallowfullscreen msallowfullscreen></iframe>';
        ThisApp.showCommonDialog({ title: "Video", content: tmpHTML })
    }
    //--- End Layout related lifecycle hooks
    ThisPage.showDailyVideo = function (theVideoID, theTarget) {
        var tmpVideoID = theVideoID;
        if (theTarget) {
            tmpVideoID = $(theTarget).attr('video');
        }
        var tmpHTML = '<iframe frameborder="0" width="480" height="270" src="https://www.dailymotion.com/embed/video/' + tmpVideoID + '" allowfullscreen allow="autoplay"></iframe>';
        ThisApp.showCommonDialog({ title: "Video", content: tmpHTML })
    }

    
    //--- Loads a document into the content-body area for this tab / category
    function loadDocContent(theCategoryName, theDoc) {
        ThisPage.loadPageSpot(theCategoryName + ':doc-content', theDoc, ThisPage.ns('cat-document'))
    }

    //--- Subscribed to the changing of any tabs
    ThisPage.tabChanged = tabChanged;
    function tabChanged(theTarget, theDetails) {
        //--- If this group is the tab group we care about then 
        if (theDetails && theDetails.group === ThisPage.ns('tabs')) {
            //--- Get the item name of this tab, which is the category name
            var tmpItemName = theDetails.item || '';
            //--- This is where we lazy load the tab content one time
            //     .. if not setup in tabsStatus, do setup and add it as done
            if (!(ThisPage.tabsStatus[tmpItemName])) {
                ThisPage.tabsStatus[tmpItemName] = {
                    status: true
                }
                //-- Get the category with related docs form the index we loaded when the page was activated
                var tmpCats = ThisPage.categoriesIndex[tmpItemName];
                if (tmpCats) {
                    //-- Load the list of documents on the left and related are using a template
                    ThisPage.loadPageSpot(tmpItemName + ':doc-list', tmpCats, ThisPage.ns('cat-contents'))
                    var tmpFirstDoc = tmpCats.docs[0];
                    //-- Assume at least one doc (i.e. overview) in each category
                    //   .. show it on first laod so we have initial content
                    loadDocContent(tmpItemName, tmpFirstDoc);
                }
            }

        }


    };

    //--- Action used to load a document for a category from the left links
    ThisPage.loadCatDoc = loadCatDoc;
    function loadCatDoc(theParams, theTarget) {
        var tmpParams = theParams || false;

        //--- Get the params from the target element
        if (theTarget) {
            tmpParams = {};
            var tmpEl = $(theTarget)
            tmpParams.pos = parseInt(tmpEl.attr('pos'));
            tmpParams.category = tmpEl.attr('category');
        }

        if (!(tmpParams)) {
            console.error("No valid params")
            throw ("No valid params")
        }

        //--- Get the category details for the item selected
        var tmpCat = ThisPage.categoriesIndex[tmpParams.category];
        if (tmpCat) {
            //--- Get the document based on the position this document is in the array
            var tmpDoc = tmpCat.docs[tmpParams.pos];
            loadDocContent(tmpParams.category, tmpDoc);
        }

    };

    //---  The tabs are setup in the header and cards / content in the center layout panel
    ThisPage.gotoTab = function (theTabName, theTarget) {
        var tmpTabName = theTabName || '';
        if (theTarget) {
            var tmpEl = $(theTarget)
            tmpTabName = tmpEl.attr('tab') || tmpTabName;
        }
        console.log( 'tmpTabName theTarget ', tmpTabName, theTarget);
        if (!tmpTabName) {
            return;
        }
        ThisApp.gotoTab({ group: ThisPage.ns("tabs"), item: tmpTabName, animation: 'fade in', duration: 100 });
    }

    ThisPage.previewContent = function (theAction, theTarget) {
        var tmpName = $(theTarget).attr('name');
        showContentInPreviewPane(tmpName);
    }

    function showContentInPreviewPane(theContentName) {
        var tmpName = theContentName || 'default-content';
        var tmpContenttEl = ThisPage.getByAttr$({ appuse: 'page-content', name: tmpName })
        if (tmpContenttEl && tmpContenttEl.length > 0) {
            ThisPage.loadPageSpot('preview-area', tmpContenttEl.html())
        }
    }

})(ActionAppCore, $);
