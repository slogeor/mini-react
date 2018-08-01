import { renderComponent } from '../react-dom/diff'

// state 队列
const setStateQueue = [];
// 组件队列
const renderQueue = [];

// 下一个事件循环执行
function defer( fn ) {
  return Promise.resolve().then( fn );
}

export function enqueueSetState( stateChange, component ) {
  if ( setStateQueue.length === 0 ) {
    defer( flush );
  }

  // 进入队列
  setStateQueue.push( {
    stateChange,
    component
  });

  // 避免重复
  if (!renderQueue.some( item => item === component) ) {
    renderQueue.push(component);
  }
}

// 更新 state
function flush() {
  let item, component;

  /* eslint-disable-next-line no-cond-assign */
  while ( item = setStateQueue.shift() ) {
    const { stateChange, component } = item;

    // 如果没有prevState，则将当前的state作为初始的prevState
    if ( !component.prevState ) {
      component.prevState = Object.assign( {}, component.state );
    }

    // 如果stateChange是一个方法，也就是setState的第二种形式
    if ( typeof stateChange === 'function' ) {
      Object.assign(component.state, stateChange(component.prevState, component.props));
    } else {
      // 如果stateChange是一个对象，则直接合并到setState中
      Object.assign( component.state, stateChange );
    }
    component.prevState = component.state;
  }

  /* eslint-disable-next-line no-cond-assign */
  while ( component = renderQueue.shift() ) {
    console.log('component:', component)
    renderComponent(component);
  }
}
