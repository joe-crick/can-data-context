export default (dataFilters, updatedFilter) => {
	const filters = {...dataFilters};
	updatedFilter.forEach((val, propName) => {
			let oldVal = filters[`$${propName}`];
			const newPropName = oldVal ? `_${propName}` : `$${propName}`;
			const oldPropName = oldVal ? `$${propName}` : `_${propName}`;
			delete filters[oldPropName];
			filters[newPropName] = val;
		}
	);
	return filters;
}
