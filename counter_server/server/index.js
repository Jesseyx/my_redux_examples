import path from 'path';
import Express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import configureStore from '../store/configureStore';
import App from '../containers/App';

const app = Express();
const port = 3000;

//静态路径
console.log(path.join(__dirname, '..', 'dist'));
app.use('/static', Express.static(path.join(__dirname, '..', 'dist')));

// 每次收到请求都会触发
app.get('/', handleRender);

function handleRender(req, res) {
  // 创建新的 Redux store 实例
  const store = configureStore();

  // 把组件渲染成字符串
  const html = renderToString(
    <Provider store={ store }>
      <App />
    </Provider>
  );

  // 从 store 中获得初始 state
  const initialState = store.getState();

  // 把渲染后的页面内容发送给客户端
  res.send(renderFullPage(html, initialState));
}
function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${ html }</div>
        <script>
          window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

app.listen(port, function (error) {
  if (error) {
    console.log(error);
  } else {
    console.info("==>     Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});