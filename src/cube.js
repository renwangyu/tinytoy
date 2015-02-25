/**
 * 正方体类
 */
'use strict';
function cube(cfg) {
	this.imgSrc = cfg.imgSrc || []; //img的url数组
	while (this.imgSrc.length) {
		if (this.imgSrc.length === 6) {
			break;
		} else if (this.imgSrc.length < 6) {
			this.imgSrc[this.imgSrc.length] = this.imgSrc[this.imgSrc.length - 1];
		} else {
			this.imgSrc.length = 6;
			break;
		}
	}
	this.stage = cfg.stage; //舞台元素
	this.perspective = cfg.perspective || 1000; //视角距离
	this.imgWh = cfg.wh || 100; //img的宽度和高度
}
cube.prototype.init = function () {
	this.create();
	this.handleEvent();
}
cube.prototype.create = function () {
	if (!this.stage) {
		return;
	} else {
		var util = window.tinytoy.tt_util;
		var rotateArr = [
			'rotateY(0deg)',
			'rotateY(90deg)',
			'rotateY(180deg)',
			'rotateY(270deg)',
			'rotateX(90deg)',
			'rotateX(270deg)'
		];
		// 舞台
		util.addClass(this.stage, 'tt-stage');
		util.addStyle(this.stage, 'width', this.imgWh + 'px');
		util.addStyle(this.stage, 'height', this.imgWh + 'px');
		util.addStyle(this.stage, 'perspective', this.perspective + 'px');
		// img容器
		var imgContainer = document.createElement('div');
		util.addClass(imgContainer, 'tt-img-container');
		util.addStyle(imgContainer, 'width', this.imgWh + 'px');
		util.addStyle(imgContainer, 'height', this.imgWh + 'px');
		// img
		this.imgSrc.forEach(function (src, i) {
			var img = document.createElement('img');
			img.setAttribute('alt', 'tinytoy\'s img');
			img.setAttribute('src', src);
			util.addStyle(img, 'width', this.imgWh + 'px');
			util.addStyle(img, 'height', this.imgWh + 'px');
			util.addStyle(img, '-webkit-transform', rotateArr[i] + ' translateZ(' + this.imgWh / 2 + 'px)');

			imgContainer.appendChild(img);
		}.bind(this));

		this.stage.appendChild(imgContainer);
	}
}
cube.prototype.handleEvent = function () {
	if(!this.stage) {
		return;
	}
	var html = this.stage;
	var isMouseDown = false;
	var preCoordinate = {
		x: 0,
		y: 0
	};
	var arc = Math.PI / 180; //转弧度
	var factor = 2; //角度因子
	var angleX = 0; //rotateX角度
	var angleY = 0; //rotateY角度
	var con = this.stage.children[0];
	// document.body.addEventListener('click', function (e) {
	// 	var v = getComputedStyle(con).transform;
	// 	console.log(v);
	// 	con.style.transform = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)'; //复位
	// 	angleX = 0;
	// 	angleY = 0;
	// }, false);
	html.addEventListener('mousedown', function (e) {
		isMouseDown = true;
		preCoordinate.x = e.pageX;
		preCoordinate.y = e.pageY;
	}, false);
	html.addEventListener('mouseup', function (e) {
		isMouseDown = false;
	}, false);
	html.addEventListener('mousemove', function (e) {
		if (isMouseDown) {
			var currCoordinate = {
				x: e.pageX,
				y: e.pageY
			};
			var dX = currCoordinate.x - preCoordinate.x,
				dY = currCoordinate.y - preCoordinate.y;
			angleX = angleX - dY * factor;
			angleY = angleY + dX * factor;
			con.style.transform = 'rotateX(' + angleX + 'deg) ' + 'rotateY(' + angleY + 'deg)';

			preCoordinate.x = currCoordinate.x;
			preCoordinate.y = currCoordinate.y;
		}
	}, false);
}