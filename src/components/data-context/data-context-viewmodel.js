import DefineMap from 'can-define/map/';
import {dataFormatMiddleware, dataFilterMiddleware} from 'can-table/lib/data-context-middleware';
import {identity} from 'can-table/lib/utils';
import arrayClone from 'clone';

export default DefineMap.extend({
	dataFilters: {
		Type: DefineMap,
		value: {}
	},
	filteredRowCount: {
		type: 'number',
		value: 0
	},
	filterData(records, dataFilters) {
		const applyDataMiddleware = dataFilterMiddleware(dataFilters);
		const rowClone = arrayClone(records);
		const rowFilterer = applyDataMiddleware(rowClone);
		const filteredRows = rowFilterer.fold(() => rowClone, identity);
		// TODO: Refactor this so that it is cleaner. Right now the row count get set by the middleware.
		// As it is processing the rows, it checks for the sentinel row filter. When it reaches that
		// filter, it first records the number of rows in the set. Then, before returning the rows
		// it sets the row count property. Then, we set it here. Must find other way. Bad. Bad. BAD!
		this.filteredRowCount = filteredRows.rowCount;
		return filteredRows;
	}
});
