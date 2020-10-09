import React, { Component } from 'react';
import './index.css'

class Cell extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <button className='cell' onClick={() => this.props.onClick()}>{this.props.value}</button>
    )
  }
}

class Board extends Component {
  constructor(props){
    super(props)
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = {
      cells: Array(9).fill(null),
      xTurn: true,
      reset: false,
      playAgain: false
    }
    this.handlePlayAgainClick = this.handlePlayAgainClick.bind(this)
    this.firstplayer = ''
    this.secondplayer = '';
    this.firstResult = 0
    this.secondResult = 0
  }


  componentDidMount(){
    this.firstplayer = window.prompt('First player name: ')
    this.secondplayer = window.prompt('Second player name: ')
    const cellsCopy = this.state.cells.slice();
    this.setState({
      cells: cellsCopy
    })
  }


  handleClick(i){

    if(calculateWinner(this.state.cells) || this.state.cells[i]){
      return;
    }

    const cellsCopy = this.state.cells.slice();
    cellsCopy[i] = this.state.xTurn ? 'x' : 'o'
    this.setState({
      cells: cellsCopy,
      xTurn: !this.state.xTurn
    })
    console.log(this.firstResult, 'this.firstResult');
  }

  renderCells(i){
     return (
       <Cell onClick={() => {this.handleClick(i)}} value={this.state.cells[i]}/>
     )
  }

  handleResetClick(){
    var cellCopy = this.state.cells.slice();
    cellCopy = Array(9).fill(null)
    this.setState({
      cells : cellCopy,
      xTurn: true,
      reset: true
    })
    return;
  }

  handlePlayAgainClick(){
    // consol e.log('hiiiiiiii');
    this.firstResult = 0
    this.secondResult = 0
    const cellsCopy = Array(9).fill(null);
    this.setState({
      cells: cellsCopy,
      playAgain: true
    })
    console.log(this.state.cells);
    return;
  }
  render(){
    let status;

    const results = []
    if(calculateWinner(this.state.cells)){
      if(calculateWinner(this.state.cells) === 'x'){
        status = `Winner is ${this.firstplayer}`
        this.firstResult++
        results.push({frist: this.firstResult})
      }
      if(calculateWinner(this.state.cells) === 'o'){
        status = `Winner is ${this.secondplayer}`
        this.secondResult++
        results.push({second: this.secondResult})
      }

    } else {
      status = this.state.xTurn ? `Its player ${this.firstplayer} turn` : `Its player ${this.secondplayer} turn`;
    }

    console.log(results, 'results');

    // console.log(this.state.cells, 'this.state.cells');
    return (
      <div>
          <div className="status">{status}</div>
          <div>
            <table>
              <thead>
                 <tr>
                  <th>{this.firstplayer}</th>
                  <th>{this.secondplayer}</th>
                 </tr>
              </thead>
              <tbody>
              <tr>
                <td>{this.firstResult}</td>
                <td>{this.secondResult}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>
            {this.renderCells(0)}
            {this.renderCells(1)}
            {this.renderCells(2)}
          </div>

          <div>
            {this.renderCells(3)}
            {this.renderCells(4)}
            {this.renderCells(5)}
          </div>

          <div>
            {this.renderCells(6)}
            {this.renderCells(7)}
            {this.renderCells(8)}
          </div>
          <div class="btn">
              <button className="reset" onClick={this.handleResetClick}>Play Again</button>
              <button className="again" onClick={this.handlePlayAgainClick}>Reset Result</button>
          </div>
      </div>
    )
  }
}

class App extends Component {
  render(){
    return (
      <div>

      <Board />

      </div>

    )
  }
}

function calculateWinner(cells) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default App;
