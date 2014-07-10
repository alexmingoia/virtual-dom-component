/*!
 * virtual-dom-component
 * https://github.com/alexmingoia/virtual-dom-component
 *
 * Copyright (c) 2014 Alex Mingoia <talk@alexmingoia.com>
 * Licensed under the BSD license.
 */

'use strict';

module.exports = VirtualComponent;

/**
 * Create new virtual component.
 *
 * @param {Object=} options
 * @param {Object=} options.locals properties and methods local to render().
 * @param {Function} render receives state and returns virtual dom.
 * @return {VirtualComponent|Function}
 * @api public
 */

function VirtualComponent(options, render) {
  if (!(this instanceof VirtualComponent)) {
    var component = new VirtualComponent(options, render);

    return function render () {
      return component.options.render.apply(component.locals, arguments);
    };
  }

  if (typeof options === 'function') {
    render = options;
    options = {};
  }

  options.render = options.render || render;

  if (!options.render) {
    throw new Error("VirtualComponent must have a render() method.");
  }

  this.options = options;
  this.locals = options.locals || {};
};

VirtualComponent.prototype.render = function() {
  this.options.render.apply(this.locals, arguments);
};
