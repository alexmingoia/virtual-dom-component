/*
 * virtual-dom-component
 * https://github.com/alexmingoia/virtual-dom-component
 *
 * Copyright (c) 2014 Alex Mingoia <talk@alexmingoia.com>
 * Licensed under the BSD license.
 */

'use strict';

var chai = require('chai');
var expect = chai.expect;

var VirtualComponent = require('../lib/virtual-dom-component.js');

describe('virtual-dom-component module', function(){
  describe('VirtualComponent()', function(){
    it('should return render function', function(){
      var render = VirtualComponent({ render: function(){} });
      expect(render).to.be.a('function');
    });

    it('instantiates component', function() {
      var component = new VirtualComponent(function() {});
      expect(component).to.be.an('object');
      expect(component).to.have.property('options');
      expect(component).to.have.property('render');
    });
  });
});
