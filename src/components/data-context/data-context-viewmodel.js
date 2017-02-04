import DefineMap from 'can-define/map/';
import {dataFormatMiddleware, dataFilterMiddleware} from 'can-table/lib/data-context-middleware';
import {identity} from 'can-table/lib/utils';
import arrayClone from 'clone';

export default DefineMap.extend({
	data: {
		type: '*'
	},
	dataFilters: {
		Type: DefineMap,
		value: {}
	},
	setDataFilters: {
		set(newVal){
			if (this.dataFilters) {
				const filters = {...this.dataFilters};
				newVal.forEach((val, propName) => {
						let oldVal = filters[`$${propName}`];
						const newPropName = oldVal ? `_${propName}` : `$${propName}`;
						const oldPropName = oldVal ? `$${propName}` : `_${propName}`;
						delete filters[oldPropName];
						filters[newPropName] = val;
					}
				);
				this.dataFilters = filters;
			}
			return {};
		}
	},
	filterData(records, dataFilters) {
		const applyTableRowMiddleware = dataFilterMiddleware(dataFilters);
		const rowClone = arrayClone(records);
		const rowFilterer = applyTableRowMiddleware(rowClone);
		const filteredRows = rowFilterer.fold(() => rowClone, identity);
		return filteredRows;
	}
});
