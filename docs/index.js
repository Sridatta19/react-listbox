const options = names.map((name, index) => ({
  label: name,
  value: index
}));

const App = () => {
  return (
    <div className="container">
      <h1>ReactJS Listbox</h1>
      <p>
        <a href="https://travis-ci.org/Sridatta19/react-listbox">
          <img
            alt="travis-build"
            src="https://img.shields.io/travis/Sridatta19/react-listbox.svg?maxAge=2592000?style=flat-square"
          ></img>
        </a>
        <a href="http://npm.im/react-listbox">
          <img
            alt="version"
            src="https://img.shields.io/npm/v/react-listbox.svg?style=flat-square"
          ></img>
        </a>
        <a href="http://opensource.org/licenses/MIT">
          <img
            alt="license"
            src="https://img.shields.io/github/license/Sridatta19/react-listbox.svg?maxAge=2592000?style=flat-square"
          ></img>
        </a>
        <a href="http://npm-stat.com/charts.html?package=react-listbox&from=2015-08-01">
          <img
            alt="downloads"
            src="https://img.shields.io/npm/dm/react-listbox.svg?style=flat-square"
          ></img>
        </a>
        <a href="https://github.com/semantic-release/semantic-release">
          <img
            alt="semantic-release"
            src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square"
          ></img>
        </a>
      </p>
      <p>A simple listbox component for React.</p>
      <div className="install">
        <h2>Installation</h2>
        <p>
          <code>npm install react-listbox --save</code>
        </p>
      </div>
      <div className="listbox">
        <DoubleListBox options={options} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("demo"));
