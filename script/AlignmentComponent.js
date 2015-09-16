function AlignmentComponent (element, onChangeCallback) {
	this._element = element;
	this._onChangeCallback = onChangeCallback;
	this._name = this._element.getAttribute('name');

	this._element.addEventListener('click', this._onClick.bind(this));
}
AlignmentComponent.prototype = {
	_onClick: function () {
		var selected = App.getSelectedValues();

		if (this._name === 'alignment-top-edges' && selected['alignment-bottom-edges']) {
			document.querySelector('.alignment-bottom-edges').classList.remove('checked');
		} else if (this._name === 'alignment-bottom-edges' && selected['alignment-top-edges']) {
			document.querySelector('.alignment-top-edges').classList.remove('checked');
		} else if (this._name === 'alignment-right-edges' && selected['alignment-left-edges']) {
			document.querySelector('.alignment-left-edges').classList.remove('checked');
		} else if (this._name === 'alignment-left-edges' && selected['alignment-right-edges']) {
			document.querySelector('.alignment-right-edges').classList.remove('checked');
		}

		if (this._element.classList.contains('checked')) {
			this._element.classList.remove('checked');
		} else {
			this._element.classList.add('checked');
		}

		this._onChangeCallback();
	}
};