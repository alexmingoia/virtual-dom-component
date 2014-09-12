!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self),n.VirtualComponent=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * virtual-dom-component
 * https://github.com/alexmingoia/virtual-dom-component
 *
 * Copyright (c) 2014 Alex Mingoia <talk@alexmingoia.com>
 * Licensed under the BSD license.
 */

var Event = require('geval/single');

module.exports = VirtualComponent;

/**
 * Create a new virtual DOM component.
 *
 * A component takes some initialization arguments and returns
 * { events, state, render }.
 *
 * @return {VirtualComponent}
 * @api public
 */

function VirtualComponent () {
  if (this.initialize) {
    this.initialize.apply(this, arguments);
  }

  // create geval single events from array of event names
  // `['login']` becomes `events.login(listener|value)`
  if (this.events instanceof Array) {
    var events = {};
    for (var i=0, l=this.events.length; i<l; i++) {
      var ev = this.events[i];
      events[ev] = Event();
    }
    this.events = events;
  } else {
    this.events = this.events || {};
  }

  // .initialize() cannot set state
  this.state  = {};
}

/**
 * Extend `VirtualComponent` with render and other methods.
 *
 * An `initialize` method will be called when a new component is created.
 *
 * @param {Object} prototype properties or methods to extend prototype
 * @param {Function} prototype.render receives state and returns virtual DOM
 * @param {Function} prototype.initialize called with constructor arguments
 * @param {Array} prototype.events transform into map of geval events
 * @return {VirtualComponent}
 * @api public
 */

VirtualComponent.extend = function (prototype) {
  var parent = this;
  var child;

  prototype = prototype || {};

  if (!this.prototype.render && !prototype.render) {
    throw new Error('VirtualComponents require a render function');
  }

  if (prototype.state) {
    throw new Error('.state is reserved for component state');
  }

  if (prototype.hasOwnProperty('constructor')) {
    child = prototype.constructor;
  } else {
    child = function component () {
      if (!(this instanceof child)) {
        var self = Object.create(child.prototype);
        child.apply(self, arguments);
        return self;
      }

      return parent.apply(this, arguments);
    };
  }

  child.extend = parent.extend;

  var Surrogate = function() {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;
  child.prototype = new Surrogate();

  for (var prop in prototype) {
    if (prototype.hasOwnProperty(prop)) {
      child.prototype[prop] = prototype[prop];
    }
  }

  child.__super__ = parent.prototype;

  return child;
};

},{"geval/single":3}],2:[function(require,module,exports){
module.exports = Event

function Event() {
    var listeners = []

    return { broadcast: broadcast, listen: event }

    function broadcast(value) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](value)
        }
    }

    function event(listener) {
        listeners.push(listener)

        return removeListener

        function removeListener() {
            var index = listeners.indexOf(listener)
            if (index !== -1) {
                listeners.splice(index, 1)
            }
        }
    }
}

},{}],3:[function(require,module,exports){
var Event = require('./event.js')

module.exports = Single

function Single() {
    var tuple = Event()

    return function event(value) {
        if (typeof value === "function") {
            return tuple.listen(value)
        } else {
            return tuple.broadcast(value)
        }
    }
}

},{"./event.js":2}]},{},[1])(1)
});