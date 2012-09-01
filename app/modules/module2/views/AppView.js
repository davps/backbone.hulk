define(["../Sandbox", "underscore", "backbone", "jquery"], 
function(sandbox, _, Backbone, $){
	var AppView = Backbone.View.extend({
		
		initialize: function(){
			_.bindAll(this, "render");
			this.render();
		},
		
		render: function(){
			this.$el.html("module2");
			return this;
		},
		
	});
	
	return AppView;
});
