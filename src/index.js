const React = {
  createElement
};

const ReactDOM = {
  render: ( vnode, container ) => {
    // 先清除一下，在挂载dom
    container.innerHTML = '';
    return render( vnode, container );
  }
}

// 生成 vnode
function createElement( tag, attrs, ...children ) {
  return {
    tag,
    attrs,
    children
  }
}

// 将 vnode 生成 dom，并挂载到指定节点上
function render( vnode, container ) {
  // 文本直接追加
  if ( typeof vnode === 'string' ) {
    let textNode = document.createTextNode( vnode );
    return container.appendChild( textNode );
  }

  const dom = document.createElement( vnode.tag );

  // 遍历设置属性
  if ( vnode.attrs ) {
    Object.keys( vnode.attrs ).forEach( key => {
      const value = vnode.attrs[ key ];
      setAttribute( dom, key, value );
    } );
  }

  // 递归遍历子 vnode
  vnode.children.forEach( child => render( child, dom ) );
  return container.appendChild( dom );
}

// 设置 dom 的 attr
function setAttribute( dom, name, value ) {
  // 如果属性名是class，则改回className
  if ( name === 'className' ) name = 'class';

  // 如果属性名是onXXX，则是一个时间监听方法
  if ( /on\w+/.test( name ) ) {
    name = name.toLowerCase();
    dom[ name ] = value || '';
  // 如果属性名是style，则更新style对象
  } else if ( name === 'style' ) {
    if ( !value || typeof value === 'string' ) {
      dom.style.cssText = value || '';
    } else if ( value && typeof value === 'object' ) {
      for ( let name in value ) {
        // 可以通过style={ width: 20 }这种形式来设置样式，可以省略掉单位px
        dom.style[ name ] = typeof value[ name ] === 'number' ? value[ name ] + 'px' : value[ name ];
      }
    }
  // 普通属性则直接更新属性
  } else {
    if ( name in dom ) {
      dom[ name ] = value || '';
    }
    if ( value ) {
      // 添加
      dom.setAttribute( name, value );
    } else {
      // 移除
      dom.removeAttribute( name, value );
    }
  }
}

function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(
    element,
    document.getElementById( 'root' )
  );
}

setInterval( tick, 1000 );
