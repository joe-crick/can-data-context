import DefineMap from 'can-define/map/';
import {dataFormatMiddleware, dataFilterMiddleware} from 'can-table/lib/data-context-middleware';
import {identity} from 'can-table/lib/utils';
import arrayClone from 'clone';

export default DefineMap.extend({
	data: {
		type: '*'
	},
	dataFilters: {
		type: '*'
	},
	dataFormatters: {
		type: '*'
	},
	filterData(records, dataFilters) {
		const applyTableRowMiddleware = dataFilterMiddleware(dataFilters);
		const rowClone = arrayClone(records);
		const rowFilterer = applyTableRowMiddleware(rowClone);
		const filteredRows = rowFilterer.fold(() => rowClone, identity);
		return filteredRows;
	},
	formatData(records, dataFormatters) {
		const applyBodyCellMiddleware = dataFormatMiddleware(dataFormatters);
		const displayRows = applyBodyCellMiddleware(records)
			.fold(() => records, identity);

		return displayRows;
	}
});
