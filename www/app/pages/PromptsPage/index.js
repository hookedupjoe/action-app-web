/*
Author: Joseph Francis
License: MIT
*/

(function (ActionAppCore, $) {

    var SiteMod = ActionAppCore.module("site");
    var AppModule = ActionAppCore.module("app");

    var thisPageSpecs = {
        pageName: "PromptsPage",
        pageTitle: "Prompts",
        pageNamespace: 'prompt',
        navOptions: {
            topLink: true,
            sideLink: true
        },
        appModule: AppModule
    };

    var docsBaseURL = 'app/pages/PromptsPage/docs';

    thisPageSpecs.required = {
        templates: {
            baseURL: 'app/pages/PromptsPage/tpl',
            //-- Page to lookup : name to call it when pulling
            //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
            map: {
                "cat-document": thisPageSpecs.pageNamespace + ":cat-document",
                "cat-contents": thisPageSpecs.pageNamespace + ":cat-contents",
                }
        },
        html: {
            baseURL: 'app/pages/PromptsPage/tpl',
            //-- Page to lookup : name to call it when pulling
            //---  Good to "namespace" your templates with the page prefix to avoid name conflicts
            map: {
                "page-header": thisPageSpecs.pageNamespace + ":page-header",
                "page-east": thisPageSpecs.pageNamespace + ":page-east",
                "page-body": thisPageSpecs.pageNamespace + ":page-body",
                "page-west": thisPageSpecs.pageNamespace + ":page-west"
            }
        }
    }

    //--- Define this applications layouts
    thisPageSpecs.layoutOptions = {
        html: {
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

                ThisPage.demoForm = ThisPage.getByAttr$({appuse:ThisPage.ns('demo-form')})
                console.log("ThisPage.demoForm",ThisPage.demoForm);

                ThisPage.demoForm.on('change', function(theEvent){
                    console.log("hisPage.demoForm.on", arguments);
                    var tmpItemChanged = theEvent.originalTarget || theEvent.target;
                    console.log( 'tmpItemChanged', tmpItemChanged );
                    
                    
                    
                })
                
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
            ThisPage.loadPageSpot('preview-area', tmpContenttEl())
        }
    }


    ThisPage.alertDemo = alertDemo;
    function alertDemo(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
        alert("Alert is new.  Now has a title and types (confirm,info,warn,error)", "Now with a title and type!", 'i') 
    };

    ThisPage.inputDemo = inputDemo;
    function inputDemo(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
        ThisApp.input("What is your name?", "Your Name", "Say Hello", "Bob")
            .then(function (theValue) {
                if (!(theValue)) { return };
                alert("Hello " + theValue, "Nice to meet you")
            })
    };

    ThisPage.confirmDemo = confirmDemo;
    function confirmDemo(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
        ThisApp.confirm("Are you sure?", "Checking to see")
            .then(function (theIsYes) {
                var tmpType = "c";
                if( !theIsYes ){
                    tmpType = "e"
                }
                var tmpYN = (theIsYes ? "Yes" : "No");

                alert("You clicked " + tmpYN, "Your Confirmation", tmpType);
            })
    };




    ThisPage.inputDemoTextOnly = inputDemoTextOnly;
    function inputDemoTextOnly(theAction, theTarget) {
        var tmpEl = false;
        if (theTarget) {
            tmpEl = $(theTarget)
        }
        ThisApp.input("What is your name?")
            .then(function (theValue) {
                if (!(theValue)) { return };
                alert("Hello " + theValue, "Nice to meet you")
            })
    };

    ThisPage.promptUsingFormDemo = promptUsingFormDemo;
    function promptUsingFormDemo(){
        if( ThisPage.accountFormInit !== true){

            var tmpAccountFormSpecs = {
                    "title": "Form Title",
                    "formname": thisPageSpecs.pageNamespace + ":account",
                    "requiredFieldList": ["name", "access", "account|url", "key"],
                    "defaultCaption": "Save Account Changes",
                    "defaultTitle": "Edit Account",
                    "newCaption": "Save New Account",
                    "newTitle": "New Account",
                    "items": [{
                        "name": "name",
                        "label": "Unique Account Name",
                        "type": "text"
                    },
                    {
                        "name": "access",
                        "label": "Access Level",
                        "type": "dropdown",
                        "list": ["API Key|api", "Full Admin Access|admin"]
                    },
                    {
                        "name": "account",
                        "label": "Account",
                        "type": "text",
                        "note": "Need either an Account or a URL but not both"
                    },
                    {
                        "name": "url",
                        "label": "URL",
                        "type": "text"
                    },
                    {
                        "name": "key",
                        "label": "API Key",
                        "type": "text"
                    }]
                    ,
                    validation: function (theFormObject) {
                        //--- Do form level validation here
                        var tmpFormDetails = theFormObject || false;
                        if (!tmpFormDetails) {
                            console.warn("No form details passed, can not run form validation")
                            return true;
                        }
                        if (theFormObject.data.url && theFormObject.data.account) {
                            var tmpFF = theFormObject.fields.account;
                            tmpFF.focus();
                            var tmpFieldWrap = tmpFF.closest('.field');
                            if (tmpFieldWrap) {
                                tmpFieldWrap.addClass('error')
                            }
                            alert("You can not have both a URL and an account, one or the other only");
                            //--- Return false to not close the dialog
                            return false;
                        }
                        return true;
                    }
                }

                ThisPage.accountForm = ThisApp.forms.newForm(tmpAccountFormSpecs);
                ThisPage.accountForm.loadTemplate();

                ThisPage.accountFormInit = true
        }

        ThisPage.accountForm.prompt({
            isNew: true,
            doc: {name:"somename","account":"test-account"},
            promptOptions: {
                callback: function(thePromptStatus){
                    if (thePromptStatus === false) {
                        return true;
                    }
                    var tmpFormObj = ThisPage.accountForm.getFormDetails();
                    var tmpIsValid = ThisPage.accountForm.isValid(tmpFormObj)
                    if( tmpIsValid ){
                        console.log("We have a valid form object ",tmpFormObj)    
                        alert("See console for object details.  Note the data and fields nodes.")
                    }
                    //--- return false to stay open, true to close
                    return tmpIsValid;
                }
            }
        })
    };
    
    ThisPage.runHelloTest = runHelloTest;
    function runHelloTest(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        alert('For your information','Information','i').then(function(){
            alert('Test Warning','Warning','w').then(function(){
                alert('Test Error message, do not worry, click OK','Some Error Title','e').then(function(){
                    alert('Whew! Your ok now','Confirmed','c').then(function(){
                        
                    })
                })
                
            })
            
        })
    };
    
    

    ThisPage.advancedPromptDemo = advancedPromptDemo;
    function advancedPromptDemo(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        
        var tmpHTML = ThisApp.renderTemplate(ThisPage.accountForm.getFormName(), tmpAccount);
        
                var tmpCaption = "Save Account Changes";
                var tmpTitle = "Edit Account";
                if (tmpIsNew) {
                    tmpCaption = "Save New Account";
                    tmpTitle = "New Account";
                }
        
                ThisApp.prompt({
                    title: tmpTitle,
                    text: tmpHTML,
                    callback: ThisPage.submitAccountForm.bind(ThisPage),
                    //process: ThisPage.ns('submitAccountForm'),
                    buttons: {
                        yes: tmpCaption,
                        no: "Cancel"
                    }
                })
                // //returns a promise if no action used
                // //returns even if with callback used and is called when callback does not return false
                // .then(
                //     function (theResults) {
                //         alert("closed " + theResults)
                //     }
                // )

    };
    
    
    


    //==== Form Demo Testing

    // <div pageaction="formDemoOpen" class="ui button fluid blue">Open</div>
    // <div pageaction="formDemoSave" class="ui button fluid blue">Save</div>
    // <div pageaction="formDemoTest1" class="ui button fluid blue">Run Test 1</div>
    // <div pageaction="formDemoTest2" class="ui button fluid blue">Test 2</div>


    ThisPage.formDemoOpen = formDemoOpen;
    function formDemoOpen(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        alert("formDemoOpen")
    };
    
    ThisPage.formDemoSave = formDemoSave;
    function formDemoSave(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        alert("formDemoSave")
    };
    
    
    ThisPage.formDemoTest1 = formDemoTest1;
    function formDemoTest1(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        alert("formDemoTest1")
    };

    ThisPage.formDemoTest2 = formDemoTest2;
    function formDemoTest2(theAction, theTarget){
        var tmpEl = false;
        if( theTarget ){
            tmpEl = $(theTarget)
        }
        alert("formDemoTest2")
    };
    
    
    
    
    


})(ActionAppCore, $);
