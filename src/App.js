import React from "react";
import "./App.css";

const allOperators = [`/`, `*`, `-`, `+`];
const nonMinusOperators = [`/`, `*`, `+`];
// const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const calculation = (arr) => {
  var workingArr = [...arr];
  reStart: for (let i = 0; i < workingArr.length; i++) {
    console.log(workingArr);
    if (workingArr.length === 3) {
      switch (workingArr[1]) {
        case "/":
          return parseFloat(workingArr[0]) / parseFloat(workingArr[2]);
        case "*":
          return parseFloat(workingArr[0]) * parseFloat(workingArr[2]);
        case "-":
          return parseFloat(workingArr[0]) - parseFloat(workingArr[2]);
        case "+":
          return parseFloat(workingArr[0]) + parseFloat(workingArr[2]);
        default:
          return;
      }
    }

    if (workingArr.length > 3) {
      switch (workingArr[1]) {
        case "+":
          let plus = parseFloat(workingArr[0]) + parseFloat(workingArr[2]);
          let elemOne = workingArr.slice(3);
          workingArr = [plus, ...elemOne]; // problem area
          break reStart;
        case "-":
          let minus = parseFloat(workingArr[0]) - parseFloat(workingArr[2]);
          let elemTwo = workingArr.slice(3);
          workingArr = [minus, ...elemTwo];
          break reStart;
        case "*":
          let multiply = parseFloat(workingArr[0]) * parseFloat(workingArr[2]);
          let elemThree = workingArr.slice(3);
          workingArr = [multiply, ...elemThree];
          break reStart;
        case "/":
          let divide = parseFloat(workingArr[0]) / parseFloat(workingArr[2]);
          let elemFour = workingArr.slice(3);
          workingArr = [divide, ...elemFour];
          break reStart;
        default:
          break reStart;
      }
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

  // XXXXXXXXXXXXXXXXXXXX
  // reset displayTop and displayBottom to default;
  handleClear() {
    console.log(this.state.displayTop);
    this.setState({ displayTop: [], displayBottom: `0` });
  }

  // XXXXXXXXXXXXXXXXXXXX
  handleDecimal(e) {
    // add only one decimal point to displayBottom,
    // and ensure displayBottom does not contain an operator;
    if (
      this.state.displayBottom.indexOf(`.`) === -1 &&
      allOperators.indexOf(this.state.displayBottom) === -1
    ) {
      this.setState({
        displayBottom: `${this.state.displayBottom}${e.target.value}`,
        displayTop: [
          ...this.state.displayTop.slice(0, -1),
          this.state.displayTop.slice(-1) + e.target.value,
        ],
      });
    }

    // add `0.` to displayBottom,
    // if displayBottom does contain an operator;
    if (
      this.state.displayTop.includes(`=`) ||
      allOperators.includes(this.state.displayBottom)
    ) {
      this.setState({
        displayBottom: `0.`,
        displayTop: [`0.`],
      });
    }
  }

  // XXXXXXXXXXXXXXXXXXXX
  handleNumbers(e) {
    // if displayTop is empty,
    // and displayBottom is zero;
    if (!this.state.displayTop.length && this.state.displayBottom === `0`) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [e.target.value],
      });
    }

    // if displayTop is not empty;
    // if displayBottom is greater than zero
    // or displayBottom is less than zero;
    if (this.state.displayBottom > `0` || this.state.displayBottom < `0`) {
      this.setState({
        displayBottom: this.state.displayBottom + e.target.value,
        displayTop: [
          ...this.state.displayTop.slice(0, -1),
          this.state.displayTop.slice(-1) + e.target.value,
        ],
      });
    }

    // if displayTop is empty,
    // and displayBottom contains a non-minus operator
    if (
      !this.state.displayTop.length &&
      nonMinusOperators.includes(this.state.displayBottom)
    ) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [e.target.value],
      });
    }

    // if the only element in displayTop is the minus operator,
    // and displayBottom contains the minus operator
    if (
      this.state.displayTop === `-` &&
      allOperators.includes(this.state.displayBottom)
    ) {
      this.setState({
        displayBottom: this.state.displayBottom + e.target.value,
        displayTop: [this.state.displayTop.slice(-1) + e.target.value],
      });
    }

    // if displayTop is not empty,
    // displayBottom contains the minus operator,
    // and second to last element in displayTop is an operator;
    if (
      this.state.displayTop.length &&
      this.state.displayBottom === `-` &&
      allOperators.includes(
        this.state.displayTop[this.state.displayTop.length - 2]
      )
    ) {
      this.setState({
        displayBottom: this.state.displayBottom + e.target.value,
        displayTop: [
          ...this.state.displayTop.slice(0, -1),
          this.state.displayTop.slice(-1) + e.target.value,
        ],
      });
    }

    // if displayTop is not empty,
    // and displayBottom contains a non-minus operator
    if (
      this.state.displayTop.length &&
      nonMinusOperators.includes(this.state.displayBottom)
    ) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [...this.state.displayTop, e.target.value],
      });
    }

    // if displayTop is not empty,
    // and displayBottom contains the minus operator,
    // and second to last element in displayTop is a number;
    if (
      this.state.displayTop.length &&
      this.state.displayBottom === `-` &&
      allOperators.indexOf(
        this.state.displayTop[this.state.displayTop.length - 2]
      ) === -1
    ) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [...this.state.displayTop, e.target.value],
      });
    }

    // if displayTop contains the equal sign;
    if (this.state.displayTop.includes(`=`)) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [e.target.value],
      });
    }
  }

  // XXXXXXXXXXXXXXXXXXXX
  handleOperators(e) {
    // if displayTop array is empty,
    // and operator clicked is a non-minus operator
    if (
      !this.state.displayTop.length &&
      nonMinusOperators.includes(e.target.value)
    ) {
      this.setState({ displayBottom: e.target.value });
    }

    // if displayTop array is empty,
    // and operator clicked is a minus operator
    if (!this.state.displayTop.length && e.target.value === `-`) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [e.target.value],
      });
    }

    // if displayTop array is not empty,
    // if last element in displayTop is an operator,
    // if displayBottom is an operator,
    // and operator clicked is minus
    if (
      this.state.displayTop.length &&
      allOperators.includes(
        this.state.displayTop[this.state.displayTop.length - 1]
      ) &&
      allOperators.includes(this.state.displayBottom) &&
      e.target.value === `-`
    ) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [...this.state.displayTop, e.target.value],
      });
    }

    // if displayTop array is not empty,
    // and last element of displayTop array is not an operator,
    if (
      this.state.displayTop.length &&
      allOperators.indexOf(
        this.state.displayTop[this.state.displayTop.length - 1]
      ) === -1
    ) {
      this.setState({
        displayBottom: e.target.value,
        displayTop: [...this.state.displayTop, e.target.value],
      });
    }

    // if displayTop array is not empty, ?????
    // and last element of displayTop array is an operator,
    // and operator clicked is a non-minus operator
    if (
      this.state.displayTop.length &&
      allOperators.includes(
        this.state.displayTop[this.state.displayTop.length - 1]
      ) &&
      e.target.value !== `-`
    ) {
      this.setState({ displayBottom: e.target.value });
    }

    if (this.state.displayTop.includes(`=`)) {
      this.setState({
        displayTop: [this.state.displayBottom, e.target.value],
        displayBottom: e.target.value,
      });
    }
  }

  // CONTINUE FROM HERE
  // XXXXXXXXXXXXXXXXXXXX
  handleCalculation() {
    // return single element number in displayTop
    if (
      this.state.displayTop.length === 1 &&
      allOperators.indexOf(this.state.displayTop[0]) === -1
    ) {
      this.setState({
        displayTop: this.state.displayTop,
        displayBottom: this.state.displayTop,
      });
      return;
    }

    // remove operator at the end of displayTop array if any
    if (
      allOperators.includes(
        this.state.displayTop[this.state.displayTop.length - 1]
      )
    ) {
      let arrx = [...this.state.displayTop].slice(
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
      let arrz = [...this.state.displayTop];

      // evaluate array
      const ans = calculation(arrz);

      // return answer in both displayTop and displayBottom
      this.setState({
        displayTop: `${arrz.join("")} = ${ans}`,
        displayBottom: `${ans}`,
      });
    }
  }

  // XXXXXXXXXXXXXXXXXXXX
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div id="calculator">
            <div id="display">{this.state.displayTop}</div>
            <div id="input">{this.state.displayBottom}</div>
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
                  value="*"
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
              <a
                href="https://www.freecodecamp.org/no-stack-dub-sack"
                target="_blank"
                rel="noreferrer"
              >
                Peter Weinberg
              </a>
            </p>
            <p>
              Coded by{" "}
              <a
                href="https://www.freecodecamp.org/mikeattah"
                target="_blank"
                rel="noreferrer"
              >
                Mike Attah
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
