(function () {

  ThisApp = null;

  var tmpPluginNames = ['DataTables'];
  var tmpPageNames = ['ControlDesignerPage', 'UsingControlsPage', 'ControlsPage',  'HomePage', 'DocsPage', 'PromptsPage', 'DataTablesPage', 'JsonPage', 'LogsPage'];

  setup(tmpPageNames, tmpPluginNames);

  //---- ACTUAL CODE ==    
  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup(thePages, thePlugins) {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();
    
      //--- Items to load when the application loads
      var tmpRequired = {
        "templates": {
          baseURL: 'app/app-tpl',
          map: {
            "about-this-app": "app:about-this-app",
            "page-loading-spinner": "app:page-loading-spinner"
          }
        }
      }


      var tmpLibrarySpecs = {
        baseURL: '/library'
      };

      ThisApp._onResizeLayouts = function (name, $pane, paneState) {
        //-- Do stuff here when application refreshes

      }

      ThisApp.init({ pages: thePages, plugins: thePlugins, required: tmpRequired, alibrarySpecs: tmpLibrarySpecs }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

        ThisApp.aboutThisApp = function () {
          ThisApp.showCommonDialog({ header: "About this application", content: { data: '', template: 'app:about-this-app' } });
        }

        //--- Turn off messages by default
        ThisApp.setMessagesOptions({ show: false })

        //--- Extend common with your app specific stuff
        $.extend(ThisApp.common, {
          samplesBaseURL: 'catalog/panels/samples'
        })

      });

    } catch (ex) {
      console.error("Unexpected Error " + ex);
    }
  }

})();








    //================









