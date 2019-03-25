(function () {

  ThisApp = null;
  setup();

  //---- ACTUAL CODE ==    
  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup() {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      //--- Items to load when the application loads
      //--- Options for creatinga  rquired list
      // If one entry, it is just the one entries
      // 

      //--- Get URLs ...
      /*
      end result .. getRequiredURIs(theRequiredSpecs)
      //--- if name blank, use full as name
      //--- Index of all the files we are to request with the type
      {
        "library/common/panels/forms/title": {type:"panel",  name: ""}
        ,"library/common/panels/status/status-bar": {type:"panel",  name: ""}
        ,"library/panels/demos/cardsdemo": {type:"panel",  name: ""}
        ,"library/panels/demos/showfor": {type:"panel",  name: ""}
        ,"app/panels/showfor": {type:"panel",  name: "frmShowFor"}
      }
      
      //-------
      Then check to see if cached at ThisApp.controlCache["library/panels/demos/cardsdemo"]
      //  if so -> return true
      //  if not
           -> add the needed file extension (i.e. .json for panels)
           -> request the resource, and return a promise
             -> when get back resource, store in ThisApp.res.type.fullname
             -> If we also have a name, also store as this.res.type.name (alias)
             
      //  ** Either way the $.when(theTrueReply,thePromise,...) all work the same

      Note: The name is used to store the resource at the local level by name that is easier to reference later
            The resource is really saved in the full URI location and a reference also saved with an alias name in thise case

      

      */
      var tmpRequiredSpecs = {
        "controls": {
          baseURL: 'app/controls/special',
          list: [
            'NewTestControl',
            'more/NewTestControl2'
          ],
          map: {
            "NewTestControl": "MainControl"
            // ,"forms/TesterFormControl": "TesterFormControl"
          }
        },
        "html": {
          baseURL: 'app/app-tpl',
          map: {
            "about-this-app": "app:about-this-app-snippet",
            "page-loading-spinner": "app:page-loading-spinner-snippet"
          }
        },
        "templates": {
          baseURL: 'app/app-tpl',
          map: {
            "about-this-app": "app:about-this-app",
            "page-loading-spinner": "app:page-loading-spinner"
          }
        },
        "panels": [
          'library/common/panels/forms/title',
          'library/common/panels/status/status-bar',
          {
            baseURL: 'library/panels/demos',
            list: [
              'cardsdemo',
              'showfor'
            ]
          },
          {
            baseURL: 'app/panels',
            map: {
              "showfor": "frmShowFor"
            }
          }
        ]
      }
      ThisApp.loadResources(tmpRequiredSpecs).then(function () {
        console.log('loadResources done', ThisApp.res);
      })
      //--- Items to load when the application loads
      var tmpRequired = {
        // "rem_panels": {
        //   baseURL: 'app/panels',
        //   map: {
        //     "showfor.json": "frmShowFor"
        //   }
        // },
        "panels": [
          'library.panels.cardsdemo',
          'library.panels.showfor'
        ],
        "rem_controls": {
          baseURL: 'app/controls',
          map: {
            "NewTestControl/index.js": "NewTestControl"
            // ,"forms/TesterFormControl": "TesterFormControl"
          }
        },
        "rem_html": {
          baseURL: 'app/app-tpl',
          map: {
            "about-this-app.html": "app:about-this-app-snippet",
            "page-loading-spinner.html": "app:page-loading-spinner-snippet"
          }
        },
        "templates": {
          baseURL: 'app/app-tpl',
          map: {
            "about-this-app.html": "app:about-this-app",
            "page-loading-spinner.html": "app:page-loading-spinner"
          }
        }
      }


      var tmpLibrarySpecs = {
        baseURL: '/library'
      };

      /* ****************************************
      //------------ This App Config
      //-- "display" Option:  The Links on the top hide when in mobile, the display options control where the links show
      //     primary = show on top but not in sidebar, then add to sidebar for small screens only
      //     both = show on top and sidebar, then add to sidebar for small screens only
      //     primary = show on top but not in sidebar, then add to sidebar for small screens only
      //     [blank] = blank or missing value will make it show on the left only
      */
      var tmpPluginComponents = ['DataTables'];
      var tmpAppCompsToInit = ['ControlDesignerPage', 'UsingControlsPage', 'ControlsPage', 'HomePage', 'DocsPage', 'PromptsPage', 'DataTablesPage', 'JsonPage', 'LogsPage'];
      var tmpAppComponents = [];

      ThisApp.useModuleComponents('plugin', tmpPluginComponents)

      ThisApp.initModuleComponents(ThisApp, 'app', tmpAppCompsToInit)
      ThisApp.useModuleComponents('app', tmpAppComponents)

      ThisApp._onResizeLayouts = function (name, $pane, paneState) {
        //-- Do stuff here when application refreshes

      }

      var tmpHidePages = (tmpAppCompsToInit.length < 2)

      ThisApp.init({ required: tmpRequired, alibrarySpecs: tmpLibrarySpecs, hidePagesMenu: tmpHidePages }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        ThisApp.aboutThisApp = function () {
          ThisApp.showCommonDialog({ header: "About this application", content: { data: '', template: 'app:about-this-app' } });
        }

        //--- Turn off messages by default
        ThisApp.setMessagesOptions({ show: false })

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, {
          samplesBaseURL: 'catalog/panels/samples',
          yourStuff: function () {

          }
        })


      });



    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }


  }

})();








    //================









