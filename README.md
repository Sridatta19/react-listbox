# react-listbox

a double listbox react component

[![travis build](https://img.shields.io/travis/Sridatta19/react-listbox.svg?maxAge=2592000?style=flat-square)](https://travis-ci.org/Sridatta19/react-listbox)
[![version](https://img.shields.io/npm/v/react-listbox.svg?style=flat-square)](http://npm.im/react-listbox)
[![license](https://img.shields.io/github/license/Sridatta19/react-listbox.svg?maxAge=2592000?style=flat-square)](http://opensource.org/licenses/MIT)
[![downloads](https://img.shields.io/npm/dm/react-listbox.svg?style=flat-square)](http://npm-stat.com/charts.html?package=react-listbox&from=2015-08-01)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

### Installation

This package can be installed via npm

```javascript
npm install react-listbox --save
```

![screen shot 2016-10-05 at 11 10 36 pm](https://cloud.githubusercontent.com/assets/11784027/19124722/edaa7f78-8b51-11e6-9723-2bb59aa35201.png)

### Demo

Demo & Examples can be found [here](https://sridatta19.github.io/react-listbox/)

### Usage

```javascript
import ListBox from 'react-listbox';
import 'react-listbox/dist/react-listbox.css';

const options = [
  { label: 'One', value: 1 },
  { label: 'Two', value: 2 },
  { label: 'Three', value: 3 },
];
// You can also pass the array of preselected options;
const selected = [1, 2];
onChange = selectedValues => {
  // handle selected values here
};
<ListBox options={options} onChange={onChange} selected={selected} />;
```

You can also use the browser build available in the dist folder.

```html
<script
  type="text/javascript"
  src="https://unpkg.com/react-listbox@1.2.11/dist/react-listbox.min.js"
></script>

<link
  rel="stylesheet"
  href="https://unpkg.com/react-listbox@1.2.11/dist/react-listbox.css"
/>
```

### Other

This library was inspired by jQuery [multi-select](https://github.com/lou/multi-select/).

### License

MIT Licensed. Copyright (c) Sridatta 2016.
