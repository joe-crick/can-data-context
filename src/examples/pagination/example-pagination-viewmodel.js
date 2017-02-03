import DefineMap from 'can-define/map/';
import List from 'can-define/List/';

export default DefineMap.extend({
	/**
	 * @property {Array | DefineList} pagination.viewmodel.tableFilters
	 * @description A set of table filter functions.
	 */
	tableFilters: {
		type: '*',
		value: []
	},
	/**
	 * @property {Array | DefineList} pagination.viewmodel.tableFilters
	 * @description A set of table filter functions.
	 */
	setTableFilters: {
		set(newVal){
			if ('length' in newVal && newVal.length > 0) {
				this.tableFilters = this.tableFilters.concat(newVal[0]);
			}
			return {};
		},
		value: {}
	},
	/**
	 * @property {Array | DefineList} pagination.viewmodel.tableClasses
	 * @description The CSS classes the `<table>` tag should have.
	 */
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
	/**
	 * @property {number} pagination.viewmodel.lowerBounds
	 * @description The index of the starting point for displaying table rows.
	 */
	lowerBounds: {
		type: 'number',
		value: 0
	},
	/**
	 * @property {List} pagination.viewmodel.rowsPerPage
	 * @description The number of rows to display per page.
	 */
	rowsPerPage: {
		type: 'number',
		value: 5
	},
	/**
	 * @property {List} pagination.viewmodel.rowCount
	 * @description The number of rows in the collection.
	 */
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
