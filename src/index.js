import React from './react'
import ReactDOM from './react-dom'

class Counter extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      num: 1,
      k1: 'A',
      k2: 'B',
      k3: 'C',
    }
  }

  onClick() {
    this.setState({
      num: this.state.num + 1,
      k1: 'C',
      k2: 'B',
      k3: 'A',
    });
  }

  render() {
    const { k1, k2 , k3 } = this.state;
    return (
      <div>
        <h1>count: { this.state.num }</h1>
        <ul>
          <li key={k1}>{k1}</li>
          <li key={k2}>{k2}</li>
          <li key={k3}>{k3}</li>
        </ul>
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
