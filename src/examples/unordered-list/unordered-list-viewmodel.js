import DefineMap from 'can-define/map/';
import List from 'can-define/List/';
import filterUpdater from 'can-data-context/lib/filter-object-updater';

export default DefineMap.extend({
	/**
	 * @property {Array | DefineList} pagination.viewmodel.dataFilters
	 * @description A set of table filter functions.
	 */
	dataFilters: {
		Type: DefineMap,
		value: {}
	},
	/**
	 * @desc Data filter aggregator
	 */
	setDataFilters: {
		Type: DefineMap,
		set(newVal){
			const filters = this.dataFilters;
			if (filters) {
				this.dataFilters = filterUpdater(filters, newVal);
			}
			return {};
		}
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
