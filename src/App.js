import React from "react";
// import ReactDOM from "react-dom";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTop: ``,
      displayBottom: `0`,
      displayArray: [],
    };
    this.handleClear = this.handleClear.bind(this);
    this.addDecimal = this.addDecimal.bind(this);
    this.addZero = this.addZero.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  handleClear() {
    this.setState({ displayTop: ``, displayBottom: `0`, displayArray: [] });
  }

  addDecimal(e) {
    if (this.state.displayBottom.indexOf(`.`) === -1) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
        displayArray: this.state.displayArray.push(
          `${this.state.displayBottom} ${e.target.value}`
        ),
        displayTop: this.state.displayArray.join(),
      });
    }
  }

  addZero(e) {}

  handleClick(e) {
    if (this.state.displayBottom.indexOf(`.`) > 0) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
        displayArray: this.state.displayArray.push(`${e.target.value}`),
        displayTop: this.state.displayArray.join(),
      });
    } else if (this.state.displayBottom === `0`) {
      this.setState({
        displayBottom: `${e.target.value}`,
        displayArray: this.state.displayArray.push(`${e.target.value}`),
        displayTop: this.state.displayArray.join(),
      });
    } else if (this.state.displayBottom !== `0`) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
        displayArray: this.state.displayArray.push(`${e.target.value}`),
        displayTop: this.state.displayArray.join(),
      });
    }

    if (
      this.state.displayBottom.slice(this.state.displayBottom.length - 1) ===
        `/` ||
      this.state.displayBottom.slice(this.state.displayBottom.length - 1) ===
        `x` ||
      this.state.displayBottom.slice(this.state.displayBottom.length - 1) ===
        `-` ||
      this.state.displayBottom.slice(this.state.displayBottom.length - 1) ===
        `+`
    ) {
      this.setState({
        displayBottom: `${e.target.value}`,
        displayArray: this.state.displayArray.push(`${e.target.value}`),
        displayTop: this.state.displayArray.join(),
      });
    }

    if (
      this.state.displayBottom.slice(this.state.displayBottom.length - 1) ===
        `-` &&
      (this.state.displayTop.slice(this.state.displayTop.length - 1) === `` ||
        this.state.displayTop.slice(this.state.displayTop.length - 1) === `/` ||
        this.state.displayTop.slice(this.state.displayTop.length - 1) === `*` ||
        this.state.displayTop.slice(this.state.displayTop.length - 1) === `-` ||
        this.state.displayTop.slice(this.state.displayTop.length - 1) === `+`)
    ) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
        displayArray: this.state.displayArray.push(`${e.target.value}`),
        displayTop: this.state.displayArray.join(),
      });
    }
  }
  // stop
  handleChange() {
    this.setState({
      displayTop: this.state.displayBottom,
    });
  }

  handleOperators(e) {
    this.setState({
      displayBottom: `${e.target.value}`,
    });
  }

  handleCalculation() {}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div id="calculator">
            <div id="display">
              <div id="display-top">{this.state.displayTop}</div>
              <div id="display-bottom" onChange={this.handleChange}>
                {this.state.displayBottom}
              </div>
            </div>
            <div id="keyboard" className="keyboard">
              <div id="horizontal-ops" className="keyboard-one">
                <button
                  id="clear"
                  className="horizontal-ops"
                  onClick={this.handleClear}
                >
                  AC
                </button>
                <button
                  id="divide"
                  value="/"
                  className="horizontal-ops"
                  onClick={this.handleOperators}
                >
                  /
                </button>
                <button
                  id="multiply"
                  value="x"
                  className="horizontal-ops"
                  onClick={this.handleOperators}
                >
                  x
                </button>
              </div>
              <div className="keyboard-two">
                <div id="digits" className="keyboard-two-a">
                  <button
                    id="seven"
                    value="7"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    7
                  </button>
                  <button
                    id="eight"
                    value="8"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    8
                  </button>
                  <button
                    id="nine"
                    value="9"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    9
                  </button>
                  <button
                    id="four"
                    value="4"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    4
                  </button>
                  <button
                    id="five"
                    value="5"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    5
                  </button>
                  <button
                    id="six"
                    value="6"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    6
                  </button>
                  <button
                    id="one"
                    value="1"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    1
                  </button>
                  <button
                    id="two"
                    value="2"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    2
                  </button>
                  <button
                    id="three"
                    value="3"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    3
                  </button>
                  <button
                    id="zero"
                    value="0"
                    className="digits"
                    onClick={this.handleClick}
                  >
                    0
                  </button>
                  <button
                    id="decimal"
                    className="digits"
                    value="."
                    onClick={this.addDecimal}
                  >
                    .
                  </button>
                </div>
                <div id="vertical-ops" className="keyboard-two-b">
                  <button
                    id="subtract"
                    value="-"
                    className="vertical-ops"
                    onClick={this.handleOperators}
                  >
                    -
                  </button>
                  <button
                    id="add"
                    value="+"
                    className="vertical-ops"
                    onClick={this.handleOperators}
                  >
                    +
                  </button>
                  <button
                    id="equals"
                    value="="
                    className="vertical-ops"
                    onClick={this.handleCalculation}
                  >
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
