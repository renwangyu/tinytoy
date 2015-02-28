(function () {
	if (window.tinytoy) {
		return;
	}
	window.tinytoy = {
		// 辅助工具
		tt_util: {
			addClass: function (elem, clazz) {
				if (elem.classList) {
					elem.classList.add(clazz);
				} else {
					if (!(~elem.className.indexOf(clazz))) {
						elem.className += clazz;
					}
				}
			},
			removeClass: function (elem, clazz) {
				if (elem.classList) {
					elem.classList.remove(clazz);
				} else {
					elem.className = elem.className.replace(new RegExp(clazz, 'g'), '');
				}
			},
			addStyle: function (elem, styleName, value) {
				elem.style[styleName] = value;
			}
		},
		// 正方体
		tt_cube: function (cfg) {
			var myCube = new cube(cfg);
			myCube.init();
		},
		// img裁剪式轮播
		tt_imgclipplay: function (cfg) {
			var myImgclipplay = new imgclipplay(cfg);
			myImgclipplay.init();
		}
	};
})();