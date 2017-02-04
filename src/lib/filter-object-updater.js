export default (dataFilters, updatedFilter) => {
	const filters = {...dataFilters};
	updatedFilter.forEach((val, propName) => {
			if (propName !== 'weight') {
				let oldVal = filters[`$${propName}`];
				const newPropName = oldVal ? `_${propName}` : `$${propName}`;
				const oldPropName = oldVal ? `$${propName}` : `_${propName}`;
				delete filters[oldPropName];
				filters[newPropName] = {filter: val, weight: updatedFilter.weight};
			}
		}
	);
	return filters;
}
