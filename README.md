# virtual-dom-component

[![Build Status](http://img.shields.io/travis/alexmingoia/virtual-dom-component.svg?style=flat)](http://travis-ci.org/alexmingoia/virtual-dom-component) 
[![NPM version](http://img.shields.io/npm/v/virtual-dom-component.svg?style=flat)](https://npmjs.org/package/virtual-dom-component) 
[![Dependency Status](http://img.shields.io/david/alexmingoia/virtual-dom-component.svg?style=flat)](https://david-dm.org/alexmingoia/virtual-dom-component)

> A [Virtual DOM](https://github.com/Matt-Esch/virtual-dom) component (view).

Virtual components expose `events`, `state`, and a `render` function.

The state returned by a component acts as a lens meant to be embedded in the
"top level" state atom. Component state is not mutated directly. It's a black
box mutated by methods exposed on the component.

Events returned by a component are used to communicate with the application or
other components. For example, a component may have a "login button pressed"
event but no logic for handling login. Instead, another component can listen
for this event and mutate state.

These ideas are taken from [Raynos' mercury component][0] documentation.

## Installation

Using [npm](https://npmjs.org/):

```sh
npm install --save virtual-dom-component
```

Using [bower](http://bower.io/):

```sh
bower install --save alexmingoia/virtual-dom-component
```

Using browser script tag and global (UMD wrapper):

```html
// Available via window.VirtualComponent
<script src="dist/virtual-dom-component.js"></script>
```

## Usage

Create a component:

```javascript
var h = require('virtual-hyperscript');
var VirtualComponent = require('virtual-dom-component');

var LoginForm = VirtualComponent.extend({
  render: function (state) {
    return h('form', [
      h('input', { name: "username", type: "text" }),
      h('input', { name: "password", type: "password" }),
      h('button', { type: "submit" })
    ]);
  }
});

var loginForm = LoginForm(); // use of `new` keyword optional
```

Embed component state in application state:


```javascript
appState.loginState = loginForm(...).state;
```

Once embedded call the component's render method:

```javascript
function appRender (state) {
  return h('div', [
    loginForm.render(state.loginState);
  ]);
};
```

### Events

Wire up [geval][1] events via the prototype `events` array:

```javascript
var LoginForm = VirtualComponent.extend({
  events: ['login'],
  render: function (state) { ... }
});

var loginForm = LoginForm();

// listen for event by passing a listener function
loginForm.events.login(function listener (...) { ... });

// emit/broadcast/trigger event by passing a non-function value
loginForm.events.login(value);
```

### Lifecycle

#### initialize

If an `initialize` function is provided it will be called with the constructor
arguments when components are created.

```javascript
var LoginForm = VirtualComponent.extend({
  initialize: function(options) {
    console.log(options.foo) // => "bar"
  }
});

var loginForm = new LoginForm({ foo: "bar" });
```

### Extending

Extend the component by passing additional properties or methods:

```javascript
var LoginForm = VirtualComponent.extend({
  validate: function() { ... },
  render: function (state) { ... }
});

var loginForm = LoginForm();

loginForm.validate();
```

Components can have children that inherit from their parent:

```javascript
var Form = VirtualComponent.extend({
  validate: function () { ... },
  render: function (state) { ... }
});

var LoginForm = Form.extend({
  render: function (state) { ... }
});

var loginForm = LoginForm();

loginForm.validate();
```

## Contributing

Please submit all issues and pull requests to the [alexmingoia/virtual-dom-component](http://github.com/alexmingoia/virtual-dom-component) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/alexmingoia/virtual-dom-component/issues).

## License

The BSD License

Copyright (c) 2014, Alex Mingoia

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Alex Mingoia nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

[0]: https://github.com/Raynos/mercury/blob/master/docs/mercury-component.md
[1]: https://github.com/Raynos/geval/
