import React from "react";
import "./scss/App.scss";
import Circle from "./Circle";

class App extends React.Component {
  state = {
    bubbles: [
      {
        id: 1,
        color: "green",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch:false,
        broken:true
      },
      {
        id: 2,
        color: "red",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch:false,
        broken:false
      },
      {
        id: 3,
        color: "red",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch:false,
        broken:false
      },
      {
        id: 4,
        color: "green",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch:false,
        broken:true
      },
      {
        id: 5,
        color: "red",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch:false,
        broken:false
      },
      {
        id: 6,
        color: "red",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch: false,
        broken: false
      },
      {
        id: 7,
        color: "red",
        size: "50",
        changeColor: false,
        changeSize: false,
        onSwitch: false,
        broken: false
      }
    ],
    playing: false,
    timing: 2,
    circleRowsAmount:1,

   
  };
  

  reset = id => {
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    bubbles[id - 1].changeColor = false;
    bubbles[id - 1].changeSize = false;
    this.setState({ bubbles });
  };

  handleStart = () => {
    this.setState({
      playing: true
    });
  };

  handleStop = () => {
    this.setState({
      playing: false
    });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.setAnimationTiming(e.target.value);
    }
  };

  handleCircleClick = id => {
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    bubbles.map(bubble => {
      bubble.changeColor = false;
      bubble.changeSize = false;
      return false;
    });
    bubbles[id - 1].changeColor = true;
    bubbles[id - 1].changeSize = true;
    this.setState({ bubbles });
  };

  handleSizeClick = e => {
    e.stopPropagation();
  };

  handleCircleColorClick = (id, e) => {
    e.stopPropagation();
    const color = e.target.getAttribute("data-color");
    const newBubbles = [...this.state.bubbles];
    newBubbles[id - 1].color = color;
    this.setState({ bubbles: newBubbles });
    this.reset(id);
  };
  handleCircleRowsInputChange = (event) => {
    const circleRowsAmountText = event.target.value

    this.setState({ circleRowsAmount: circleRowsAmountText });

  };
  filter = (array, id) => {
    const newItem = array.filter((newVal) => {
      return newVal.id !== id; 
    });
    return newItem;
  };



  handleSizeChange = (id, e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      const bubbles = [...this.state.bubbles];
      const size = e.target.value;
      if (size > 10) {
        bubbles[id - 1].size = size;
        this.setState({ bubbles });
        this.reset(id);
      }
    }
  };

  handleBlur = id => {
    console.log("this");
    this.reset(id);
  };

  handleAdd = () => {
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    const id = bubbles.length + 1;
    bubbles.push({
      id: id,
      color: "red",
      size: "50",
      changeColor: false,
      changeSize: false
    });

    this.setState({ bubbles });
  };

  handleRemove = () => {
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    if (bubbles.length - 1 >= 1) {
      bubbles.pop();
      this.setState({ bubbles });
    } else {
      alert("Must have at least one bubble. Cannot remove all bubbles.");
    }
  };

  setAnimationTiming = timing => {
    const circles = document.querySelectorAll(".circle");
    const two_ns = document.querySelectorAll(".circle:nth-child(2n + 1)");
    const three_ns = document.querySelectorAll(".circle:nth-child(3n + 1)");


    circles.forEach(circle => {
      circle.style.animationDuration =`${timing}s`;
 
    });

    two_ns.forEach(two_n => {
     two_n.style.animationDuration = `${timing - 1}s`;
    });

    three_ns.forEach(three_n => {
     three_n.style.animationDuration = `${timing - 0.6}s`;
    });

  
  };


  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div
          className={(this.state.playing ? "animate" : "") + " circleWrapper"}
        >
         <div>
      {
              this.loadFromLocalStorage('bubbles').map(bubble => (
                <Circle
                  key={bubble.id }
                  id={bubble.id }
                  color={bubble.color}
                  size={bubble.size}
                  broken ={bubble.broken}
                  onSwitch ={bubble.onSwitch}
                  changeColor={bubble.changeColor}
                  changeSize={bubble.changeSize}
                  handleSizeChange={this.handleSizeChange}
                  handleChangeBroken={this.handleChangeBroken}
                  handleChangeOnOff={this.handleChangeOnOff}
                  handleCircleColorClick={this.handleCircleColorClick}
                  handleBlur={this.handleBlur}
                  handleCircleClick={this.handleCircleClick}
                  handleSizeClick={this.handleSizeClick}
                />
              ))
        }
      <div>,
        </div>
        <span>Number Of Lines</span>
      <input
        onChange={(event) => this.handleCircleRowsInputChange(event)}
        value={this.circleRowsAmount}
      />
        <div className="button-wrapper">
          <button className="play" onClick={this.handleStart}>
            Play
          </button>
          <button className="stop" onClick={this.handleStop}>
            Stop
          </button>
          <button className="add" onClick={this.handleAdd}>
            Add Bubble
          </button>
          <button className="remove" onClick={this.handleRemove}>
            Remove Bubble
          </button>
          <input type="number" onKeyDown={this.handleKeyDown} />
        </div>
        </div>
    );
  }
}

export default App;
