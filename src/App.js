import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTop: `0123456789`,
      displayBottom: `0123456789`,
    };
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div id="calculator">
            <div id="display">
              <div id="display-top">{this.state.displayTop}</div>
              <div id="display-bottom">{this.state.displayBottom}</div>
            </div>
            <div id="keyboard" className="keyboard">
              <div id="horizontal-ops" className="keyboard-one">
                <button id="clear" className="horizontal-ops">
                  AC
                </button>
                <button id="divide" className="horizontal-ops">
                  /
                </button>
                <button id="multiply" className="horizontal-ops">
                  x
                </button>
              </div>
              <div className="keyboard-two">
                <div id="digits" className="keyboard-two-a">
                  <button id="seven" className="digits">
                    7
                  </button>
                  <button id="eight" className="digits">
                    8
                  </button>
                  <button id="nine" className="digits">
                    9
                  </button>
                  <button id="four" className="digits">
                    4
                  </button>
                  <button id="five" className="digits">
                    5
                  </button>
                  <button id="six" className="digits">
                    6
                  </button>
                  <button id="one" className="digits">
                    1
                  </button>
                  <button id="two" className="digits">
                    2
                  </button>
                  <button id="three" className="digits">
                    3
                  </button>
                  <button id="zero" className="digits">
                    0
                  </button>
                  <button id="decimal" className="digits">
                    .
                  </button>
                </div>
                <div id="vertical-ops" className="keyboard-two-b">
                  <button id="subtract" className="vertical-ops">
                    -
                  </button>
                  <button id="add" className="vertical-ops">
                    +
                  </button>
                  <button id="equals" className="vertical-ops">
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="credit">
            <p>
              Designed by{" "}
              <a href="https://www.freecodecamp.org/no-stack-dub-sack">
                Peter Weinberg
              </a>
            </p>
            <p>
              Coded by{" "}
              <a href="https://www.freecodecamp.org/mikeattah">Mike Attah</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
