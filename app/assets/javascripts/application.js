// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require socket.io
//= require angular
//= require angular-resource
//= require angular-animate
//= require angular-route
//= require angular-mocks
//= require app
//= require flow
//= require ng-flow
//= require websocket_rails/main
//= require app.js.erb
//= require ace-editor/ace.js
//= require_tree ./controllers
//= require_tree ./directives
//= require_tree ./services
//= require_tree ./templates

$(function(){ $(document).foundation(); });

