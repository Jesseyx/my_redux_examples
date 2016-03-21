// 浅渲染目前的问题是 如果调用 setState 便抛异常. 
// React 貌似想要的是，如果想要使用 setState，
// DOM 就一定要存在（但测试运行在 node 环境下，是没有 DOM 的）。
// 要解决这个问题，我们用了 jsdom，为了在 DOM 无效的时候，React 也不抛异常

import { jsdom } from 'jsdom';
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;