import DefineMap from 'can-define/map/';
import List from 'can-define/List/';
import batch from 'can-event/batch/'

const filterSearch = searchTerm => function(row) {
	return row;
};

export default DefineMap.extend({
	tableFilters: {
		type: '*',
		get() {
			return new List([filterSearch(this.lowerBounds)(this.upperBounds)])
		}
	},
	searchTerm: {
		type: 'string',
		value: ''
	}
});
