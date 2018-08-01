import { diff } from './diff'

function render( vnode, container, dom ) {
  // 先清空，在挂载
  container.innerHTML = '';
  return diff( dom, vnode, container );
}

export default render;
