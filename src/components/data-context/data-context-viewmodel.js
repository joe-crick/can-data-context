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
	filterData(records, dataFilters) {
		const applyDataMiddleware = dataFilterMiddleware(dataFilters);
		const rowClone = arrayClone(records);
		const rowFilterer = applyDataMiddleware(rowClone);
		const filteredRows = rowFilterer.fold(() => rowClone, identity);
		return filteredRows;
	}
});
