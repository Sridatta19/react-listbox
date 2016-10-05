# react-listbox
a double listbox react component

### Installation

This package can be insatlled via npm

`npm install react-listbox`

![screen shot 2016-10-05 at 11 10 36 pm](https://cloud.githubusercontent.com/assets/11784027/19124722/edaa7f78-8b51-11e6-9723-2bb59aa35201.png)

### Usage

```javascript
import ListBox from 'react-listbox'
const options = [
  {label:'One', value: 1},
  {label:'Two', value: 2},
  {label:'Three', value: 3}
]
onChange = (selectedValues) => {
  // handle selected values ehre
}
<ListBox options={options} onChange={onChange}/>
```

### Other

This library was heavily inspired by jquery [multi-select](https://github.com/lou/multi-select/). This was my attempt to write something similar in react
