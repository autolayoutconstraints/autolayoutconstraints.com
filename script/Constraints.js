function Constraints() {}
Constraints.prototype = {
	constraintWithVisualFormat: function (language, viewName, superviewName, constraintFormat) {
		if (language === 'objc') {
			return '[' + superviewName + ' addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"' + constraintFormat + '" options:0 metrics:nil views:NSDictionaryOfVariableBindings(' + viewName + ')]];';
		} else if (language === 'swift') {
			return superviewName + '.addConstraints(NSLayoutConstraint.constraintsWithVisualFormat("' + constraintFormat.replace(viewName, 'view') + '", options: NSLayoutFormatOptions(rawValue: 0), metrics: nil, views: ["view": ' + viewName + ']));';
		}
	},
	align: function (language, viewName, superviewName, constraintName) {
		if (language === 'objc') {
			return '[' + superviewName + ' addConstraint:[NSLayoutConstraint constraintWithItem:' + viewName + ' attribute:' + constraintName + ' relatedBy:NSLayoutRelationEqual toItem:' + superviewName + ' attribute:' + constraintName + ' multiplier:1.0 constant:0.0]];';
		} else if (language === 'swift') {
			constraintName = constraintName.replace('NSLayoutAttribute', 'NSLayoutAttribute.');
        	return superviewName + '.addConstraint(NSLayoutConstraint(item: ' + viewName + ', attribute: ' + constraintName + ', relatedBy: NSLayoutRelation.Equal, toItem: ' + superviewName + ', attribute: ' + constraintName + ', multiplier: 1.0, constant: 0.0));'
		}
	}
};
Constraints = new Constraints();