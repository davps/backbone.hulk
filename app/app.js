require.config({
    shim: {
    	'jquery': {
    		exports: '$'
    	},

        'underscore': {
            exports: '_'
        },

        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

		'core': {
			deps: ['underscore', 'backbone', 'jquery'],	
		},

		'core_extension_jquery_scroll' : ['jquery', 'core'],

		'backbone_validations' : ['backbone', 'underscore'],

        'module1' : ['core'],
        'module2' : ['core']
    },

    paths: {
        core: 'application_core/Core',
        core_extension_jquery_scroll: 'application_core/core.extension.jquery.scroll',

        text: 'base_library/text',
		jquery: 'base_library/jquery',
		backbone: 'base_library/backbone',
		underscore: 'base_library/underscore',
		backbone_validations: 'base_library/backbone.validations',

        module1: 'modules/module1/Sandbox',
        module2: 'modules/module2/Sandbox'

    }
});

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

requirejs(["core", "jquery", "module1", "module2", "core_extension_jquery_scroll"], 
function (core, $, SandboxModule1, SandboxModule2, core_extension_jquery_scroll) {
	core.register("module1").instantiate();
	core.register("module2").instantiate();
	core.startAll();
});
