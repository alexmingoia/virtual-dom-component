/*!
 * virtual-dom-component
 * https://github.com/alexmingoia/virtual-dom-component
 *
 * Copyright (c) 2014 Alex Mingoia <talk@alexmingoia.com>
 * Licensed under the BSD license.
 */

var expect = require('chai').expect;
var noop = function () {};
var VirtualComponent;

if (process.env.JSCOV) {
  VirtualComponent = require('../lib-cov/virtual-dom-component');
} else {
  VirtualComponent = require('../lib/virtual-dom-component');
}

var Event = require('geval/single');

describe('module', function(){
  it('exposes VirtualComponent', function() {
    expect(VirtualComponent).to.be.a('function');
    expect(VirtualComponent).to.have.property('name', 'VirtualComponent');
    expect(VirtualComponent).to.have.property('extend');
  });
});

describe('VirtualComponent.extend()', function() {
  it('extends VirtualComponent', function() {
    var Parent = VirtualComponent.extend({
      onParent: true,
      render: noop
    });
    expect(Parent).to.be.an('function');
    expect(Parent.prototype).to.have.property('render', noop);
    var Child = Parent.extend({
      onChild: true
    });
    var parent = new Parent();
    var child = new Child();
    expect(parent).to.not.have.property('onChild');
    expect(child).to.have.property('onChild', true);
    expect(child).to.have.property('onParent', true);
  });
});

describe('VirtualComponent()', function() {
  it('returns { events, state }', function() {
    var Component = VirtualComponent.extend({ render: noop });
    var component = new Component();
    expect(component).to.be.an('object');
    expect(component).to.have.keys('events', 'state');
    expect(component).to.have.property('render', noop);
  });

  it('creates geval events from prototype events array', function() {
    var Component = VirtualComponent.extend({
      events: ['login', 'logout'],
      render: noop
    });
    var component = new Component();
    expect(component).to.have.property('events');
    expect(component.events).to.be.an('object');
    expect(component.events).to.have.keys('login', 'logout');
    expect(component.events.login).to.be.a('function');
    expect(component.events.login).to.have.property('name', 'event');
  });
});

describe('VirtualComponent#initialize()', function() {
  it('is called with arguments on creation', function(done) {
    var Component = VirtualComponent.extend({
      initialize: function(args) {
        expect(args).to.be.an('object');
        expect(args).to.have.property('num', 1);
        done();
      },
      render: noop
    });
    var args = { num: 1 };
    var component = new Component(args);
    args.num = 2;
  });
});
