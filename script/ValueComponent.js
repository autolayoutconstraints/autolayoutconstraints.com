function ValueComponent (element, onChangeCallback) {
	this._element = element;
	this._clickTimeout = null;
	this._onChangeCallback = onChangeCallback;
	
	this._element.addEventListener('change', this._onChange.bind(this));
	this._element.addEventListener('keydown', this._onKeyDown.bind(this));
	this._element.addEventListener('click', this._onClick.bind(this));
	this._element.addEventListener('dblclick', this._onDblClick.bind(this));
	this._element.addEventListener('blur', this._onBlur.bind(this));
	this._element.addEventListener('focus', this._onFocus.bind(this));
}
ValueComponent.prototype = {
	_onChange: function () {
		this._onChangeCallback();
	},
	_onClick: function (event) {
		if (!(this._element.readOnly)) return;

		clearTimeout(this._clickTimeout);

		this._clickTimeout = setTimeout(function () {
			console.log('end');
			this._toggleClassName('enabled');
			this._onChangeCallback();
		}.bind(this), 300);
	},

	_onDblClick: function (event) {
		clearTimeout(this._clickTimeout);
	
		this._element.classList.add('enabled');
		this._element.readOnly = false;
		this._element.select();
	},

	_onBlur: function (event) {
		if (!this._element.readOnly) {
			this._element.readOnly = true;
		}
	},

	_onFocus: function (event) {
		if (this._element.readOnly) {
			this._element.blur();
		}
	},

	_onKeyDown: function (event) {
		var key = event.charCode || event.keyCode || 0;

		if (key == 13) {
			this._element.readOnly = true;
			this._element.blur();
		}

		if(!(
			key == 8 ||
			(key >= 48 && key <= 57) || 
			(key >= 96 && key <= 105))) {
			return event.preventDefault();
		};
	},

	_toggleClassName: function (className) {
		if (this._element.classList.contains(className)) {
			this._element.classList.remove(className);
		} else {
			this._element.classList.add(className);
		}
	}
};