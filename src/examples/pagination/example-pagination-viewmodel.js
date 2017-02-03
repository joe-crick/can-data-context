import DefineMap from 'can-define/map/';
import List from 'can-define/List/';

export default DefineMap.extend({

	tableFilters: {
		type: '*'
	},
	tableClasses: {
		Type: List,
		value: [
			'table',
			'table-striped',
			'table-bordered',
			'table-hover',
			'table-sm',
			'table-responsive'
		]
	},
	lowerBounds: {
		type: 'number',
		value: 0
	},
	rowsPerPage: {
		type: 'number',
		value: 5
	},
	rowCount: {
		type: 'number',
		get() {
			return this.rows.length;
		}
	},
	/**
	 * @property {List} pagination.viewmodel.rows
	 * @description The rows for the table.
	 */
	rows: {
		Type: List
	},

	/**
	 * @property {List} pagination.viewmodel.headings
	 * @description The headings for the table.
	 */
	headings: {
		Type: List
	}

});
