// 获取屏幕宽度
let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth

// 获取htmlDOM
let htmlDom = document.getElementsByTagName('html')[0];

// 设置html的font-size

htmlDom.style.fontSize = htmlWidth / 10 + 'px';

// 动态修改font-size
window.addEventListener('resize',() => {
	let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
	htmlDom.style.fontSize = htmlWidth / 10 + 'px';
});