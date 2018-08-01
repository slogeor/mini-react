import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      num: 1
    }
  }

  onClick() {
    this.setState( { num: this.state.num + 1 } );
  }

  render() {
    return (
      <div>
        <h1>count: { this.state.num }</h1>
        <button onClick={ () => this.onClick()}>add</button>
      </div>
    );
  }
}

function Title(props) {
  return (
    <h1>hello {props.name}</h1>
  )
}

ReactDOM.render(
  <div>
    <Title name="react" />
    <Counter tag="aa" />
  </div>,
  document.getElementById( 'root' )
);
