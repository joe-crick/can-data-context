import DefineMap from 'can-define/map/';
import List from 'can-define/List/';

export default DefineMap.extend({

	/**
	 * @property {Number} pagination.rowDisplayLimit rowDisplayLimit
	 * @description The number of items to display per page.
	 * @option {Number} Default value: **25**
	 */
	rowDisplayLimit: {
		type: 'number',
		value: 10
	},

	/**
	 * @property {Number} pagination.rowCount rowCount
	 * @description The total number of items.
	 * @option {Number} Default value: **null**
	 */
	rowCount: {
		type: 'number',
		get(){
			return this.rows.length;
		}
	},

	/**
	 * @property {Number} pagination.viewmodel.currentPage
	 * @description The number of the page being viewed.
	 * @option {Number} Default value: **1**
	 */
	currentPage: {
		type: 'number',
		value: 2
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
