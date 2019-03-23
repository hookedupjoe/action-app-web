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
      var tmpRequired = {
        "panels": {
          baseURL: 'app/panels',
          map: {
            "showfor.json": "frmShowFor"
          }
        },
        "controls": {
          baseURL: 'app/controls',
          map: {
            "NewTestControl/index.js": "NewTestControl"
            // ,"forms/TesterFormControl": "TesterFormControl"
          }
        },
        "snippets": {
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

      var tmpTplSpecs = {
        baseURL: 'app/app-tpl',
        templateMap: {
          "about-this-app.html": "app:about-this-app",
          "page-loading-spinner.html": "app:page-loading-spinner"
        }
      };

      var tmpAppControlSpecs = {
        baseURL: 'app/controls',
        controlMap: {
          "TesterControl": "TesterControl"
          // ,"forms/TesterFormControl": "TesterFormControl"
        }
      };
      var tmpAppPanelSpecs = {
        baseURL: 'app/panels',
        panelMap: {
          "showfor.json": "frmShowFor"
        }
      };


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


      //appPanels: tmpAppPanelSpecs, appControls: tmpAppControlSpecs, appTemplates: tmpTplSpecs
      //
      //require: tmpRequired, 
      ThisApp.init({ required: tmpRequired, appPanels: tmpAppPanelSpecs, appControls: tmpAppControlSpecs, appTemplates: tmpTplSpecs, librarySpecs: tmpLibrarySpecs, hidePagesMenu: tmpHidePages }).then(function (theReply) {
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









