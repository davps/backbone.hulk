Backbone Hulk
=============

It is hard to create large scale Javascript applications? Yeah but... We have a Backbone.Hulk! 

That's it! Backbone Hulk is a opinionanted architecture boilerplate developed to face common challenges that I've found in a large scale Javascript app on which I'm working right now. 

 Backbone Hulk uses Backbone.js, Undescore.js and Require.js. **Selectively**, I take concepts proposed by Nicholas Zakas in [Scalable Application Architecture](http://www.slideshare.net/nzakas/scalable-javascript-application-architecture) and the [Aura team](https://github.com/addyosmani/aura) (I discarded some of their tips in favor to increase the developers productivity and the pragmatism).


###Backbone Hulk Architecture: 

Backbone Hulk is composed by an Application Core, Sandboxes and highly decoupled Modules.

## CORE

The role of the core is to start and stop modules. Its function is similar to an airport control tower, to rule the whole system. The modules never take this decision for themserves, they jusk ask, and the CORE decide. 

## Sandbox

Always, the module ask to the sandbox. The sandbox provide the DOM to be used 
by the module, allows to their module to realize an intermodule communication
and only the sandbox speak with the CORE.

## Module

The module is, basically, and standalone and traditional Backbone.js application. 
At the module level, you can take your own architectural decision to structure your 
application under Backbone.js. 

The module don't know nothing about other parts of the system. 

That's the most important benefit of this architecture, because allows the creation of tiny apps that working together, in a highly decoupled way, compose a large scale javascript application. 

###Early version

This is just a early version of the project and will evolve adding more abtractions to the actual code and managing the module inter-dependencies when required. 

