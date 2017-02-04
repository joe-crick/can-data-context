import DefineMap from 'can-define/map/';
import batch from 'can-event/batch/'

const filterPagination = lowerBounds => upperBounds => function(row, index, array) {
	return lowerBounds > array.length
		? index === (array.length - 1)
		: index >= lowerBounds && index <= upperBounds;
};

export default DefineMap.extend({
	tableFilters: {
		type: '*',
		get() {
			return {
				pagination: filterPagination(this.lowerBounds)(this.upperBounds),
				weight: 100
			};
		}
	},
	lowerBounds: {
		type: 'number',
		value: 0
	},
	upperBounds: {
		type: 'number',
		value: this.rowsPerPage
	},
	rowsPerPage: {
		type: 'number',
		value: 0
	},
	rowCount: {
		type: 'number',
		value: 0
	},
	next() {
		// +1, go to the next in the set
		const increment = this.rowsPerPage +1;
		const lower = this.lowerBounds + increment;
		if(lower < this.rowCount) {
			batch.start();
			this.lowerBounds = lower;
			this.upperBounds+= increment;
			batch.stop();
		}
	},
	prev() {
		const decrement = this.rowsPerPage +1;
		const lower = this.lowerBounds - decrement;
		if(lower >= 0) {
			batch.start();
			this.lowerBounds = lower;
			this.upperBounds += -decrement;
			batch.stop();
		}
	}
});
