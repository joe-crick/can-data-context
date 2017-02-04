/**
 * @desc This is a workaround to trigger DefineMap's publishing. When the properties of the filter functions update
 * they don't trigger the observable to fire an update. We have to trick the Observable, by giving it "new" properties
 * when the properties update.
 * @param dataFilters
 * @param updatedFilter
 * @returns {Object}
 */
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
