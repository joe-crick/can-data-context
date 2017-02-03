import DefineMap from 'can-define/map/';
import List from 'can-define/List/';

const filterPagination = lowerBounds => upperBounds => function(row, index) {
	return index >= lowerBounds && index <= upperBounds;
};

export default DefineMap.extend({
	tableFilters: {
		type: '*',
		get() {
			return new List([filterPagination(this.lowerBounds)(this.rowsPerPage)])
		}
	},
	lowerBounds: {
		type: 'number',
		value: 0
	},
	rowsPerPage: {
		type: 'number',
		value: 5
	}
});
