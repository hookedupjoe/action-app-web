(function () {


    var tmpPluginNames = [];
    setup(false, tmpPluginNames, false);
  
    ActionAppCore = ActionAppCore || window.ActionAppCore;
  
    function setup(thePages, thePlugins, theUseLayout) {
      try {
        var siteMod = ActionAppCore.module('site');
        ThisApp = new siteMod.CoreApp();
        if( theUseLayout !== false ){
            theUseLayout = true;
        }
  
        //--- Items to load when the application loads
        var tmpRequired = {}
       
        //--- Use tmpRequiredSpecs to preload more using that example
        ThisApp.init({ layout: false, pages: thePages, plugins: thePlugins, required: tmpRequired }).then(function (theReply) {
          ThisApp.getByAttr$({ appuse: "app-loader" }).remove();
  
          //--- Extend common with your app specific stuff
          $.extend(ThisApp.common, {
            
          })
          
        });
      } catch (ex) {
        console.error("Unexpected Error " + ex);
      }
    }
  
  
  
  
  
  })();