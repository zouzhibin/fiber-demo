requestAnimationFrame 回调函数会在绘制之前执行
requestAnimationFrame(callback) 会在浏览器每次重绘前执行callback回调 每次callback 执行的时机都是浏览器刷新下一帧渲染周期的起点上
requestAnimationFrame(callback) 的回调callback 回调参数 timestamp 是回调被调用的时间 也就是当前帧的起始时间

rAfTime performance.timing.navigationStart + performance.now() 约等于Date.now()