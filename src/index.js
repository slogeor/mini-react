import React from './react'
import ReactDOM from './react-dom'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      newNum: 0,
    }
  }
  componentDidMount() {
    for ( let i = 0; i < 100; i++ ) {
      this.setState( { num: this.state.num + 1 } );
      console.log( 'num :', this.state.num );

      this.setState( prevState => {
        console.log( 'newNum:', prevState.newNum);
        return {
          newNum: prevState.newNum + 1
        }
      });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>num: { this.state.num }</h1>
        <h1>newNum: { this.state.newNum }</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById( 'root' )
);
