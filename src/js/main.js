import babelPolyfill from 'babel-polyfill';
import {Map} from 'map/Map';
import React from 'react';

if(!babelPolyfill) { alert('Error: babel-polyfill could not be detected.'); }

// Set up globals
window.app = {
  debugEnabled: true,
  debug: function (message) {
    if (this.debugEnabled) {
      var print = typeof message === 'string' ? console.log : console.dir;
      print.apply(console, [message]);
    }
  }
};

// Shim for rAF with timeout for callback
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) { window.setTimeout(callback, 1000 / 60); };
})();

// Helper Functions
var loadCss = (url) => {
  var sheet = document.createElement("link");
  sheet.type = "text/css";
  sheet.rel = "stylesheet";
  sheet.href = url;
  requestAnimationFrame(function () { document.getElementsByTagName("head")[0].appendChild(sheet); });
};

var lazyloadStylesheets = () => {
  app.debug('main >>> lazyloadStylesheets');
  loadCss("http://js.arcgis.com/3.13/esri/css/esri.css");
  loadCss("css/app.css");
};

var applyConfigurations = () => {
  app.debug('main >>> applyConfigurations');
};

var initializeApp = () => {
  app.debug('main >>> initializeApp');
  React.render(<Map />, document.getElementById('map-container'));
};

// Start the App
lazyloadStylesheets();
applyConfigurations();
initializeApp();
