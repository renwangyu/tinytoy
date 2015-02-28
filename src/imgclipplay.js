/**
 * img裁剪式轮播类
 */
// 'use strict';

function imgclipplay(cfg) {
	this.imgBox = cfg.imgBox; //img容器
	this.imgSrc = cfg.imgSrc || []; //img的url数组
	if (this.imgSrc.length === 1) {
		this.imgSrc[this.imgSrc.length] = this.imgSrc[this.imgSrc.length - 1];
	}
	this.imgWidth = cfg.imgWidth || 300; //img宽度
	this.imgHeight = cfg.imgHeight || 200; //img高度
	this.currIdx = 0; //当前显示img的索引
	this.timer = null;
	this.interval = (cfg.interval&&cfg.interval < 2000) || 2000; //时间间隔，至少2s
	this.radius = Math.max(this.imgWidth, this.imgHeight) * 2; //裁剪半径
	this.count = this.imgSrc.length;
}
imgclipplay.prototype.updateCurrIdx = function () {
	this.currIdx = (this.currIdx + 1) < this.count ? (this.currIdx + 1) : 0;
}
imgclipplay.prototype.getNextIdx = function (d) {
	d = d || 1;
	var nextIdx = this.currIdx + d;
	return nextIdx < this.count ? nextIdx : (nextIdx - this.count);
}
imgclipplay.prototype.init = function () {
	this.create();
	this.play();
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
		x: (this.imgBox.offsetWidth) / 2,
		y: (this.imgBox.offsetHeight) / 2
	};
	//img
	this.imgSrc.forEach(function (src, i) {
		var img = document.createElement('img');
		img.setAttribute('alt', 'tinytoy\'s loading img' + i);
		img.setAttribute('src', src);
		img.setAttribute('tt-index', i);
		img.setAttribute('class', '');	//test
		util.addStyle(img, 'width', this.imgWidth + 'px');
		util.addStyle(img, 'height', this.imgHeight + 'px');
		// 初始化curr和next
		if (i === 0) {
			util.addClass(img, 'curr');
			img.style.cssText += '-webkit-clip-path: circle(' + this.radius + 'px at ' + this.centerPoint.x + 'px ' + this.centerPoint.y + 'px)';
			
		} else {
			img.style.cssText += '-webkit-clip-path: circle(0px at ' + this.centerPoint.x + 'px ' + this.centerPoint.y + 'px)';
		}
		this.imgBox.appendChild(img);
	}.bind(this));
}
imgclipplay.prototype.play = function () {
	if (!this.imgSrc.length) {
		return;
	}
	var util = window.tinytoy.tt_util;
	var radiusReg = new RegExp(this.radius + 'px at', 'g');

	this.timer = setTimeout(function () {
		var currImg = document.querySelector('img[tt-index=\'' + this.currIdx + '\']'),
			nextImg = document.querySelector('img[tt-index=\'' + this.getNextIdx(1) + '\']'),
			nnextImg = document.querySelector('img[tt-index=\'' + this.getNextIdx(2) + '\']');
		currImg.style.cssText = currImg.style.cssText.replace(radiusReg, '0px at');
		setTimeout(function (currImg, nextImg, nnextImg, r, updateCurrIdx) {
			return function () {
				//把下一个img的next去掉，增加curr
				util.addClass(nextImg, 'curr');
				//把当前img的curr去掉
				util.removeClass(currImg, 'curr');
				//延缓200ms，展现下张图片放大
				setTimeout((function (currImg) {
					return function () {
						nextImg.style.cssText = nextImg.style.cssText.replace(/0px at/g, r + 'px at');
					}
				})(currImg), 200);
				//更新当前index
				updateCurrIdx();
			}
		}(currImg, nextImg, nnextImg, this.radius, this.updateCurrIdx.bind(this)), 1000);
		//循环
		this.timer = setTimeout(arguments.callee.bind(this), this.interval);
	}.bind(this), this.interval);
}