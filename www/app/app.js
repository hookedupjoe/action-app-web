(function () {

  ThisApp = null;

  var tmpPageNames = [
    'ControlDesignerPage', 
    'UsingControlsPage', 
    'ControlsPage',  
    'HomePage', 
    'DocsPage', 
    'PromptsPage', 
    'DataTablesPage',
    'JsonPage', 
    'LogsPage'
  ];

  var tmpPluginNames = [
    'DataTables'
  ];

  setup(tmpPageNames, tmpPluginNames);

  ActionAppCore = ActionAppCore || window.ActionAppCore;

  function setup(thePages, thePlugins) {
    try {
      var siteMod = ActionAppCore.module('site');
      ThisApp = new siteMod.CoreApp();
    
      //--- Items to load when the application loads
      var tmpRequired = {}

      ThisApp.init({ pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
        ThisApp.getByAttr$({ appuse: "app-loader" }).remove();

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









