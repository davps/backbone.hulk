define(["underscore", "require"], function(_, require){
	/*
	 * Core
	 */
	var CoreApplication = function(){
		var moduleData = {};
		
		var instanceCounter = 0;
		
		var publisherChannel = {};
		_.extend(publisherChannel, Backbone.Events);

		var subscriberChannel = {};
		_.extend(subscriberChannel, Backbone.Events);

		var permissions =  {
			module1: {
				canRunABCfromModule2: true
			},
			module2: {
				
			}
		};
		
		//Intermodule communication proxy
		var self = this;
		publisherChannel.on("all", function(eventName, msg){
			if(eventName == "openSignalsSheetModule:analog" || eventName == "openSignalsSheetModule:binary"){
				
			}
			subscriberChannel.trigger(eventName, msg);
		});
		
		var _currentModule;
		var _currentInstance;
		
		return {
			/*register the module*/
			register: function(moduleId, Sandbox){
				_currentModule = moduleId;
				var Sandbox = require ("./modules/" + moduleId + "/Sandbox");
				moduleData[moduleId] = {
					"Sandbox" 	: Sandbox,
					"instances"	: {} /*Values type: sandbox, osea, new Sandbox()*/
				}
				return this;
			}, 
			/*create an instance of the module*/
			instantiate: function(moduleId, element){
				if(!moduleId){
					moduleId = _currentModule;
				}
				var instanceId = "i" + (++instanceCounter);
				_currentModule = moduleId;
				_currentInstance = instanceId;
				var module = moduleData[moduleId];
				if(typeof module == "undefined"){
					throw new Error("No existe el módulo" + moduleId);
				}
				var sandbox = Object.create(module.Sandbox(this, moduleId, instanceId, element));
				module.instances[instanceId] = sandbox;
				return this;
			},
			/*start the instance*/
			start: function(moduleId, instanceId){
				if(!moduleId){
					moduleId = _currentModule;
					instanceId = _currentInstance;
				}
				var module = moduleData[moduleId];
				if(typeof module == "undefined"){
					throw new Error("No existe el módulo" + moduleId);
				}
				var instance = module.instances[instanceId];
				if(typeof instance == "undefined"){
					throw new Error("No existe el la instancia ", instance, " en el módulo ",  moduleId);
				}
				if(instance) instance.init();
				return this;
			}, 
			/*start all instances*/
			startAll: function(){
				_.each(moduleData, function(module, moduleId){
					_.each(module.instances, function(instance, instanceId){
						this.start(moduleId, instanceId);
					}, this);
				}, this);
			},
			stop: function(moduleId, instanceId){
				var module = moduleData[moduleId];
				var instances = module.instances;
				var instance = instances[instanceId];
				instance.module.mainView.remove();
			},
			stopAllModuleInstances: function(moduleId){
				var module = moduleData[moduleId];
				_.each(module.instances, function(instance){
					instance.module.mainView.remove();
				});
			},
			intermoduleCommunication: {
				publish: function(event, msg, sandbox){
					publisherChannel.trigger(event, {msg:msg, sandbox:sandbox});
				},
				subscribe: function(event, callback, context){
					subscriberChannel.on(event, callback, context);
				},
			},
			/*ask for permissions of the sandbox*/
			ask: function(){
				return permissions;
			}, 
		};
	};

	return new CoreApplication();
});
