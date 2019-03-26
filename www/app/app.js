(function () {

  ThisApp = null;
  setup();

  //---- ACTUAL CODE ==    
  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup() {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();

      var tmpRequiredSpecs = {
        "controls": {
          baseURL: 'app/controls/special',
          list: [
            'NewTestControl',
            'more/NewTestControl2'
          ],
          map: {
            "NewTestControl": "MainControl"
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
          'catalog/panels/common/east',
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
      // ThisApp.loadResources(tmpRequiredSpecs).then(function () {
      //   console.log('loadResources done', ThisApp.res);
      // })
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

      /* ****************************************
      //------------ This App Config
      //-- "display" Option:  The Links on the top hide when in mobile, the display options control where the links show
      //     primary = show on top but not in sidebar, then add to sidebar for small screens only
      //     both = show on top and sidebar, then add to sidebar for small screens only
      //     primary = show on top but not in sidebar, then add to sidebar for small screens only
      //     [blank] = blank or missing value will make it show on the left only
      */
      var tmpPluginComponents = ['DataTables'];
      var tmpAppCompsToInit = ['ControlsPage', 'ControlDesignerPage', 'UsingControlsPage', 'HomePage', 'DocsPage', 'PromptsPage', 'DataTablesPage', 'JsonPage', 'LogsPage'];
      var tmpAppComponents = [];

      ThisApp.useModuleComponents('plugin', tmpPluginComponents)

      ThisApp.initModuleComponents(ThisApp, 'app', tmpAppCompsToInit)
      ThisApp.useModuleComponents('app', tmpAppComponents)

      ThisApp._onResizeLayouts = function (name, $pane, paneState) {
        //-- Do stuff here when application refreshes

      }

      var tmpHidePages = (tmpAppCompsToInit.length < 2)

      //--- Use tmpRequiredSpecs to preload more using that example
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









