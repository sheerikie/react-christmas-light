import React from "react";
import "./scss/App.scss";
import Circle from "./Circle";
import Triangle from "./triangle";
import { CircleContainer } from './styles';
import Switch from "react-switch";

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
      
    ],
    playing: false,
    timing: 2,
    circleRowsAmount:1,
    value:false
  };
  
  saveToLocalStorage = (strName,state) => {
    try {
      localStorage.setItem(strName, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  };
  
  loadFromLocalStorage = (strName) => {
    try {
      const stateStr = localStorage.getItem(strName);
      return stateStr ? JSON.parse(stateStr) : this.state.bubbles;
    } catch (e) {
      console.error(e);
      return undefined;
    }
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
    console.log("onAnimationEnd called");
  };

  handleStop = () => {
    this.setState({
      playing: false
    });
    console.log("onAnimationEnd stopped");
  };

  handleKeyDown = e => {
    console.log("size updated");
    let value=this.state.value;
    let target=2;
 
    this.setState({
      value: !value
    });
    if(value===true){
      target=1;
    }
    if (e.keyCode === 13) {
      this.setAnimationTiming(target);
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
    console.log("circle clicked");
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
    console.log("circle color clicked");
  };
  handleCircleRowsInputChange = (event) => {
    const circleRowsAmountText = event.target.value

    this.setState({ circleRowsAmount: circleRowsAmountText });
    console.log("line updated");

  };
  filter = (array, id) => {
    const newItem = array.filter((newVal) => {
      return newVal.id !== id; 
    });
    return newItem;
  };

  addRow=()=>{
  const circleHolder = []
  for (let i = 0; i < this.state.circleRowsAmount; i += 1) {
    circleHolder.push(
      <CircleContainer>
      {
              this.loadFromLocalStorage('bubbles').map(bubble => (
                
                <Circle
                  key={bubble.id + i }
                  id={bubble.id}
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
      </CircleContainer>,
      <Triangle></Triangle>
    )
  }
return circleHolder;
  }

  handleChangeBroken = (id, e) => {
    e.stopPropagation();
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    bubbles.filter(bubble => {
      return bubble.id === id? bubble.broken = true:bubble.broken;
    });
    this.setState({ bubbles });
    console.log(bubbles);
    this.reset(id);
  };

  handleChangeOnOff = (id, e) => {
    e.stopPropagation();
    const bubbles = [...this.state.bubbles];
    this.saveToLocalStorage('bubbles',bubbles);
    
    bubbles.filter(bubble => {
      return bubble.id === id? bubble.onSwitch = !bubble.onSwitch:bubble.onSwitch;
    });
    this.setState({ bubbles });
    console.log(bubbles);
    this.reset(id);
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
    console.log("bulb added");
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
    console.log("bulb removed");
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


  componentDidMount() {
    // this.setAnimationTiming(this.state.timing);
    // console.log('hekk',this.loadFromLocalStorage('bubbles'));
    // console.log(this.state.playing,'playin')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div
          className={(this.state.playing ? "animate" : "") + " circleWrapper"}
          style={{display:'inline-block',justifyContent:'center'}}
        >
           <h3>Switch Pattern: <b style={{color:'green'}}>[Green:Even; Gray:Odd]</b> </h3> 
           <br></br>
           <Switch checked={this.state.value}  onChange={this.handleKeyDown}  className="size"/>
           {this.state.value?<p>The Pattern is Even</p>:<p>The Pattern is Odd</p>} 
        <br></br>
             {this.addRow()}
            
        </div>
        <br></br>
        <span>Number Of Rows: </span>
     
        <input
          onChange={(event) => this.handleCircleRowsInputChange(event)}
          value={this.circleRowsAmount}
          className="line" data-test="add-row"
        />
      
        <div className="button-wrapper">
          <button className="play" onClick={this.handleStart} >
            Play
          </button>
          <button className="stop" onClick={this.handleStop}>
            Stop
          </button>
          <button className="add" onClick={this.handleAdd}>
            Add Bubble
          </button>
          <button className="remove" data-test="remove-bulb" onClick={this.handleRemove}>
            Remove Bubble
          </button>

          
        </div>
        </div>
    );
  }
}

export default App;
