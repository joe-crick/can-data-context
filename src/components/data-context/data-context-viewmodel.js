import DefineMap from 'can-define/map/';
import {dataFormatMiddleware, dataFilterMiddleware} from './data-context-middleware';
import {noOp, identity} from 'can-table/lib/utils';
import arrayClone from 'clone';

export default DefineMap.extend({
	data: {
		type: '*'
	},
	recordCount: {
		get() {
			return this.rows.length;
		}
	},
	dataFilters: {
		type: '*'
	},
	dataFormatters: {
		type: '*'
	},
	filterData() {
		const applyTableRowMiddleware = dataFilterMiddleware(this.tableFilters);
		const rowClone = arrayClone(this.rows);
		const rowFilterer = applyTableRowMiddleware(rowClone);
		const filteredRows = rowFilterer.fold(() => rowClone, identity);
		return filteredRows;
	},
	formatData() {
		const applyBodyCellMiddleware = dataFormatMiddleware(this.cellMiddleware);
		const displayRows = applyBodyCellMiddleware(filteredRows)
			.fold(() => filteredRows, identity);

		return displayRows;
	}
});
