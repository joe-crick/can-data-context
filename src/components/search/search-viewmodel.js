import DefineMap from 'can-define/map/';

const filterSearch = searchTerm => function (row) {
	let isSearchMatch = false;
	if (!searchTerm) {
		isSearchMatch = true;
	} else {
		isSearchMatch = row.cells.filter(function (cell) {
				return cell.content.indexOf(searchTerm) > -1;
			}).length > 0;
	}

	return isSearchMatch;
};

export default DefineMap.extend({
	tableFilters: {
		type: '*',
		get() {
			return {search: filterSearch(this.searchTerm)};
		}
	},
	searchTerm: {
		type: 'string',
		value: ''
	}
});
