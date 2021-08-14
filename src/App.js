import React from "react";
import "./App.css";

const specOps = ["/", "x", "-", "+"];

const calculation = (arr) => {
  var result = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i + 1] === `/`) {
      result = result / arr[i + 2];
      continue;
    }
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayTop: [],
      displayBottom: `0`,
    };
    this.handleClear = this.handleClear.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleCalculation = this.handleCalculation.bind(this);
  }

  // reset displayTop and displayBottom
  handleClear() {
    console.log(this.state.displayTop);
    this.setState({ displayTop: [], displayBottom: `0` });
  }

  handleDecimal(e) {
    // add only one decimal point to displayBottom
    // ensure displayBottom does not contain an operator
    if (
      this.state.displayBottom.indexOf(`.`) === -1 &&
      this.state.displayBottom !== `/` &&
      this.state.displayBottom !== `x` &&
      this.state.displayBottom !== `-` &&
      this.state.displayBottom !== `+`
    ) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
      });
    }
  }

  handleNumbers(e) {
    if (this.state.displayTop.join("").length === 20) {
      this.setState({ disabled: `1` });
    }

    // if displayBottom is zero
    if (this.state.displayBottom === `0`) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayBottom is greater than zero
    if (this.state.displayBottom > `0`) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
      });
    }

    // if displayBottom is less than zero
    if (this.state.displayBottom < `0`) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
      });
    }

    // if displayTop is empty
    // and displayBottom contains a non-minus operator
    if (
      !this.state.displayTop.length &&
      this.state.displayBottom.indexOf(`-`) === -1 &&
      (this.state.displayBottom === `/` ||
        this.state.displayBottom === `x` ||
        this.state.displayBottom === `+`)
    ) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop is empty
    // and displayBottom contains the minus operator
    if (
      !this.state.displayTop.length &&
      this.state.displayBottom.indexOf(`-`) !== -1
    ) {
      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
      });
    }

    // if displayTop is not empty,
    // last element in displayTop is not an operator,
    // and displayBottom contains an operator*
    if (
      this.state.displayTop.length &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `/` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `x` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `-` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `+` &&
      specOps.includes(this.state.displayBottom)
    ) {
      this.setState({
        displayTop: [...this.state.displayTop, this.state.displayBottom],
      });

      this.setState({
        displayBottom: e.target.value,
      });
    }

    // if displayTop is not empty,
    // displayBottom contains minus operator
    // and last element in displayTop is an operator
    if (
      this.state.displayTop.length &&
      this.state.displayBottom === `-` &&
      (this.state.displayTop[this.state.displayTop.length - 1] === `/` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `x` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `-` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `+`)
    ) {
      this.setState({
        displayTop: [...this.state.displayTop],
      });

      this.setState({
        displayBottom: `${this.state.displayBottom} ${e.target.value}`,
      });
    }
  }

  handleOperators(e) {
    // if displayTop array is empty,
    // and displayBottom is greater than zero
    if (
      !this.state.displayTop.length &&
      this.state.displayBottom > `0` &&
      specOps.includes(this.state.displayBottom) !== true
    ) {
      this.setState({
        displayTop: [this.state.displayBottom],
      });

      this.setState({ displayBottom: e.target.value });
    }

    // if displayBottom is less zero,
    // and displayBottom is not an operator
    if (
      this.state.displayBottom < `0` &&
      this.state.displayBottom !== `/` &&
      this.state.displayBottom !== `x` &&
      this.state.displayBottom !== `-` &&
      this.state.displayBottom !== `+`
    ) {
      this.setState({
        displayTop: [...this.state.displayTop, this.state.displayBottom],
      });

      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop array is empty,
    // and displayBottom is zero
    if (!this.state.displayTop.length && this.state.displayBottom === `0`) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayBottom is an operator
    if (
      this.state.displayBottom === `/` ||
      this.state.displayBottom === `x` ||
      this.state.displayBottom === `-` ||
      this.state.displayBottom === `+`
    ) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop array is not empty,
    // if displayBottom is an operator,
    // and operator clicked is minus
    if (
      this.state.displayTop.length &&
      (this.state.displayBottom === `/` ||
        this.state.displayBottom === `x` ||
        this.state.displayBottom === `-` ||
        this.state.displayBottom === `+`) &&
      e.target.value === `-`
    ) {
      this.setState({
        displayTop: [...this.state.displayTop, this.state.displayBottom],
      });

      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop array is not empty,
    // and last element of displayTop array is not an operator,
    if (
      this.state.displayTop.length &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `/` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `x` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `-` &&
      this.state.displayTop[this.state.displayTop.length - 1] !== `+`
    ) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop array is not empty,
    // and last element of displayTop array is an operator,
    if (
      this.state.displayTop.length &&
      (this.state.displayTop[this.state.displayTop.length - 1] === `/` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `x` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `-` ||
        this.state.displayTop[this.state.displayTop.length - 1] === `+`)
    ) {
      this.setState({
        displayTop: [...this.state.displayTop, this.state.displayBottom],
      });

      this.setState({ displayBottom: e.target.value });
    }
  }

  handleCalculation() {
    // remove operator at the end of displayTop array if any
    if (
      this.state.displayTop[this.state.displayTop.length - 1] === `/` ||
      this.state.displayTop[this.state.displayTop.length - 1] === `x` ||
      this.state.displayTop[this.state.displayTop.length - 1] === `-` ||
      this.state.displayTop[this.state.displayTop.length - 1] === `+`
    ) {
      let arrx = this.state.displayTop.slice(
        0,
        this.state.displayTop.length - 1
      );

      // evaluate array
      const ans = calculation(arrx);

      // return answer in both displayTop and displayBottom
      this.setState({
        displayTop: `${arrx.join("")} = ${ans}`,
        displayBottom: `${ans}`,
      });
    } else {
      let arrz = this.state.displayTop;

      // evaluate array
      const ans = calculation(arrz);

      // return answer in both displayTop and displayBottom
      this.setState({
        displayTop: `${arrz.join("")} = ${ans}`,
        displayBottom: `${ans}`,
      });
    }
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
                    onClick={this.handleNumbers}
                  >
                    7
                  </button>
                  <button
                    id="eight"
                    value="8"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    8
                  </button>
                  <button
                    id="nine"
                    value="9"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    9
                  </button>
                  <button
                    id="four"
                    value="4"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    4
                  </button>
                  <button
                    id="five"
                    value="5"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    5
                  </button>
                  <button
                    id="six"
                    value="6"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    6
                  </button>
                  <button
                    id="one"
                    value="1"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    1
                  </button>
                  <button
                    id="two"
                    value="2"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    2
                  </button>
                  <button
                    id="three"
                    value="3"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    3
                  </button>
                  <button
                    id="zero"
                    value="0"
                    className="digits"
                    onClick={this.handleNumbers}
                  >
                    0
                  </button>
                  <button
                    id="decimal"
                    className="digits"
                    value="."
                    onClick={this.handleDecimal}
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
