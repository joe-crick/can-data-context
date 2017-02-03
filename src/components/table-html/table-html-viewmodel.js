import DefineMap from 'can-define/map/';
import List from 'can-define/list/';
import {headerCellMiddleware, bodyCellMiddleware, tableRowsMiddleware} from './table-middleware';
import {noOp, identity} from 'can-table/lib/utils';
import arrayClone from 'clone';
import cloneList from 'can-table/lib/clone-list';

export default DefineMap.extend({
	displayRows: {
		Value: List,
		get() {

			const applyTableRowMiddleware = tableRowsMiddleware(this.tableFilters);
			const rowClone = arrayClone(this.rows);
			const rowFilterer = applyTableRowMiddleware(rowClone);
			const filteredRows = rowFilterer.fold(() => rowClone, identity);
			const applyBodyCellMiddleware = bodyCellMiddleware(this.cellMiddleware);
			const displayRows = applyBodyCellMiddleware(filteredRows)
				.fold(() => filteredRows, identity);

			return displayRows;

		}
	},
	displayHeadings: {
		Value: List,
		get() {
			// Apply formatting middleware
			const headings = this.headings;
			const applyHeaderCellMiddleware = headerCellMiddleware(this.headerMiddleware);
			applyHeaderCellMiddleware(headings)
				.fold(noOp, identity);
			return headings;
		}
	},
	rowCount: {
		get() {
			return this.rows.length;
		}
	},
	currentPage: {
		type: 'number',
		value: 1
	},
	filters: {
		Type: List,
		value: []
	},
	tableClasses: {
		type: List,
		value: []
	},
	cellClasses: {
		type: List,
		value: []
	},
	// TODO: Default values for the DefineMap don't seem to be showing up. They only show up, if I pass them in.
	headerClasses: {
		type: List,
		value: []
	},
	headerMiddleware: {
		type: '*'
	},
	cellMiddleware: {
		type: '*'
	},
	tableFilters: {
		type: '*'
	},
	rows: {
		type: '*'
	},
	headings: {
		type: '*'
	}
});
