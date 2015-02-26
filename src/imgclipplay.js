/**
 * img裁剪式轮播类
 */
// 'use strict';

function imgclipplay(cfg) {
	this.imgBox = cfg.imgBox; //img容器
	this.imgSrc = cfg.imgSrc || []; //img的url数组
	this.imgWidth = cfg.imgWidth || 300; //img宽度
	this.imgHeight = cfg.imgHeight || 200; //img高度
	this.currImgIdx = 0; //当前显示img的索引
	this.timer = null;
	this.interval = cfg.ingerval || 1000; //时间间隔
}
imgclipplay.prototype.init = function () {
	this.create();
	this.handleEvent();
}
imgclipplay.prototype.create = function () {
	if (!this.imgBox) {
		return;
	}
	var util = window.tinytoy.tt_util;
	//img容器
	util.addClass(this.imgBox, 'tt-imgclipplay-box');
	util.addStyle(this.imgBox, 'width', this.imgWidth + 'px');
	util.addStyle(this.imgBox, 'height', this.imgHeight + 'px');
	// 中心点(x,y)
	this.centerPoint = {
		x: (this.imgBox.offsetLeft+this.imgBox.offsetWidth)/2,
		y: (this.imgBox.offsetTop+this.imgBox.offsetHeight)/2
	}
	//img
	this.imgSrc.forEach(function (src, i) {
		var img = document.createElement('img');
		img.setAttribute('alt', 'tinytoy\'s loading img');
		img.setAttribute('src', src);
		img.setAttribute('index', i);
		util.addStyle(img, 'width', this.imgWidth + 'px');
		util.addStyle(img, 'height', this.imgHeight + 'px');
		if (i === 0) {
			util.addClass(img, 'curr');
		}

		this.imgBox.appendChild(img);
	}.bind(this));

	// var e=document.querySelector('img.curr');
}
imgclipplay.prototype.handleEvent = function () {
	this.timer = setTimeout(function(){
		console.log(this.timer);
		this.timer = setTimeout(arguments.callee.bind(this), this.interval);
	}.bind(this), this.interval);
}