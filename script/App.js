function App () {
	this._viewNameElement = document.querySelector('.view-name');
	this._superviewNameElement = document.querySelector('.superview-name');
	this._buttonObjCElement = document.querySelector('.language-objc');
	this._buttonSwiftElement = document.querySelector('.language-swift');

	this._onChange = this._onChange.bind(this);
	this._onButtonObjCClick = this._onButtonObjCClick.bind(this);
	this._onButtonSwiftClick = this._onButtonSwiftClick.bind(this);

	this._selectedLanguage = 'swift';

	this._buttonObjCElement.addEventListener('click', this._onButtonObjCClick);
	this._buttonSwiftElement.addEventListener('click', this._onButtonSwiftClick);

	this._viewNameElement.addEventListener('keyup', this._onChange);
	this._superviewNameElement.addEventListener('keyup', this._onChange);

	var inputs = _.toArray(document.querySelectorAll('.value'));
	inputs.forEach(function (input) {
		new ValueComponent(input, this._onChange);
	}, this);

	var buttons = _.toArray(document.querySelectorAll('.alignment-button'));
	buttons.forEach(function (button) {
		new AlignmentComponent(button, this._onChange);
	}, this);
}

App.prototype = {
	_onButtonObjCClick: function () {
		if (this._selectedLanguage !== 'objc') {
			this._selectedLanguage = 'objc';
			this._buttonObjCElement.classList.add('active');
			this._buttonSwiftElement.classList.remove('active');
			this._onChange();
		}
	},

	_onButtonSwiftClick: function () {
		if (this._selectedLanguage !== 'swift') {
			this._selectedLanguage = 'swift';
			this._buttonSwiftElement.classList.add('active');
			this._buttonObjCElement.classList.remove('active');
			this._onChange();
		}
	},

	_onChange: function () {
		var selected = this.getSelectedValues();

		var code = '',
			format,
			name;

		if (!_.isUndefined(selected['alignment-horizontal-centers'])) {
			code += '// center ' + this._viewNameElement.value + ' horizontally in ' + this._superviewNameElement.value + '\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeCenterX') + '\n\n';
		}

		if (!_.isUndefined(selected['alignment-vertical-centers'])) {
			code += '// center ' + this._viewNameElement.value + ' vertically in ' + this._superviewNameElement.value + '\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeCenterY') + '\n\n';
		}

		if (!_.isUndefined(selected['alignment-top-edges'])) {
			code += '// align ' + this._viewNameElement.value + ' and ' + this._superviewNameElement.value + ' to top\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeTop') + '\n\n';
		}

		if (!_.isUndefined(selected['alignment-bottom-edges'])) {
			code += '// align ' + this._viewNameElement.value + ' and ' + this._superviewNameElement.value + ' to bottom\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeBottom') + '\n\n';
		}

		if (!_.isUndefined(selected['alignment-right-edges'])) {
			code += '// align ' + this._viewNameElement.value + ' and ' + this._superviewNameElement.value + ' to right\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeRight') + '\n\n';
		}

		if (!_.isUndefined(selected['alignment-left-edges'])) {
			code += '// align ' + this._viewNameElement.value + ' and ' + this._superviewNameElement.value + ' to left\n';
			code += Constraints.align(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'NSLayoutAttributeLeft') + '\n\n';
		}

		if (!_.isUndefined(selected.left) || !_.isUndefined(selected.right)) {
			name = '';
			format = '[' + this._viewNameElement.value + ']';

			if (!_.isUndefined(selected.left)) {
				name = 'left';
				format = '|-' + selected.left + '-' + format;
			}

			if (!_.isUndefined(selected.right)) {
				name += (name ? ' and ' : '') + 'right';
				format += '-' + selected.right + '-|';
			}

			code += '// align ' + this._viewNameElement.value + ' from the ' + name + '\n';
			code += Constraints.constraintWithVisualFormat(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'H:' + format) + '\n\n';
		}	

		if (!_.isUndefined(selected.top) || !_.isUndefined(selected.bottom)) {
			name = '';
			format = '[' + this._viewNameElement.value + ']';

			if (!_.isUndefined(selected.top)) {
				name = 'top';
				format = '|-' + selected.top + '-' + format;
			}

			if (!_.isUndefined(selected.bottom)) {
				name += (name ? ' and ' : '') + 'bottom';
				format += '-' + selected.bottom + '-|';
			}

			code += '// align ' + this._viewNameElement.value + ' from the ' + name + '\n';
			code += Constraints.constraintWithVisualFormat(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'V:' + format) + '\n\n';
		}	

		if (!_.isUndefined(selected.width)) {
			code += '// width constraint\n';
			code += Constraints.constraintWithVisualFormat(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'H:[' + this._viewNameElement.value + '(==' + selected.width + ')]') + '\n\n';
		}

		if (!_.isUndefined(selected.height)) {
			code += '// height constraint\n';
			code += Constraints.constraintWithVisualFormat(this._selectedLanguage, this._viewNameElement.value, this._superviewNameElement.value, 'V:[' + this._viewNameElement.value + '(==' + selected.height + ')]') + '\n\n';
		}

		document.querySelector('code.code').innerHTML = code;
		
		Prism.highlightAll()
	},

	getSelectedValues: function () {
		var result = {};
		var inputs = _.toArray(document.querySelectorAll('.value.enabled'));
		inputs.forEach(function (input) {
			result[input.name] = input.value;
		});

		var buttons = _.toArray(document.querySelectorAll('.alignment-button.checked'));
		buttons.forEach(function (input) {
			result[input.getAttribute('name')] = true;
		});
		return result;
	}
};

App = new App();