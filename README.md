# virtual-dom-component

[![Build Status](https://secure.travis-ci.org/alexmingoia/virtual-dom-component.png)](http://travis-ci.org/alexmingoia/virtual-dom-component) 
[![NPM version](https://badge.fury.io/js/virtual-dom-component.png)](http://badge.fury.io/js/virtual-dom-component) 
[![Dependency Status](https://david-dm.org/alexmingoia/virtual-dom-component.png)](http://david-dm.org/alexmingoia/virtual-dom-component)

> A virtual DOM component (view).

Virtual components are a thin wrapper around a render method which takes the
state and returns a virtual DOM representation.

## Getting Started

Install the module with: `npm install virtual-dom-component`

## Usage

```javascript
var VirtualComponent = require('virtual-dom-component');
var h = require('virtual-hyperscript');

var Profile = VirtualComponent(function(state) {
  return h('div', null,
    h('h1', null, state.name),
    h('img', { src: state.avatarURL })
  );
});

// with local state
var Profile = VirtualComponent({
  locals: {
    fullName: function(first, last) {
      return [first, last].join(' ');
    },
    url: function(gid) {
      return 'https://gravatar.com/' + gid;
    }
  },
  render: function(state) {
    return h('div', null,
      h('h1', null, state.name)),
      h('img', { src: this.url(state.gid) })
    );
  }
});

// using JSX
var Profile = VirtualComponent(function(state) {
  return <div>
    <h1>{state.name}</h1>
    <img src={state.avatarURL } />
  </div>;
});

// using constructor and instance
var Profile = new VirtualComponent({
  render: function(state) {
    // ...
  }
});

var vNode = Profile.render(state);
```

## Contributing

Please submit all issues and pull requests to the [alexmingoia/virtual-dom-component](http://github.com/alexmingoia/virtual-dom-component) repository!

## Support
If you have any problem or suggestion please open an issue [here](https://github.com/alexmingoia/virtual-dom-component/issues).

## License 

The BSD License

Copyright (c) 2014, Alex Mingoia <talk@alexmingoia.com>

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Alex Mingoia <talk@alexmingoia.com> nor the names of its
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
