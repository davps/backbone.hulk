define(["../Sandbox", "underscore", "backbone", "jquery"], 
function(sandbox, _, Backbone, $){
	var AppView = Backbone.View.extend({

		initialize: function(){
			_.bindAll(this, "render", "startFunctionA");
			
			this.render();
		},

		startFunctionA: function(e){
			alert("startFunctionA()");
		},

		render: function(){
			this.$el.html("ABC");
			return this;
		},
		
	});
	
	return AppView;
});

