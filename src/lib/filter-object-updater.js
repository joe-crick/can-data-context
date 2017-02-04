export default (dataFilters, updatedFilter) => {
	const filters = {...dataFilters};
	updatedFilter.forEach((val, propName) => {
			if (propName !== 'filterPriority' && propName !== 'sentinel') {
				const oldVal = filters[`$${propName}`];
				const newPropName = oldVal ? `_${propName}` : `$${propName}`;
				const oldPropName = oldVal ? `$${propName}` : `_${propName}`;
				delete filters[oldPropName];
				filters[newPropName] = {
					filter: val,
					filterPriority: updatedFilter.filterPriority,
					sentinel: updatedFilter.sentinel
				};
			}
		}
	);
	return filters;
}
