import DefineMap from 'can-define/map/';
import batch from 'can-event/batch/'

const filterPagination = lowerBounds => upperBounds => function (row, index, array) {
	return lowerBounds > array.length
		? index === (array.length - 1)
		: index >= lowerBounds && index <= upperBounds;
};

const updatePageState = function (lower, increment, pageIncrement) {
	this.isNextDisabled = false;
	this.isPrevDisabled = false;
	batch.start();
	this.lowerBounds = lower;
	this.upperBounds += increment;
	this.currentPage += pageIncrement;
	batch.stop();
};

export default DefineMap.extend({
	tableFilters: {
		type: '*',
		get() {
			return {
				pagination: filterPagination(this.lowerBounds)(this.upperBounds),
				filterPriority: this.filterPriority,
				sentinel: true
			};
		}
	},
	filterPriority: {
		type: 'number',
		value: 100
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
	totalPages: {
		get (){
			return Math.ceil(this.rowCount / (this.rowsPerPage + 1));
		}
	},
	currentPage: {
		type: 'number',
		value: 1
	},
	isNextDisabled: {
		type: 'boolean',
		value: false
	},
	isPrevDisabled: {
		type: 'boolean',
		value: true
	},
	next() {
		// +1, go to the next in the set
		const increment = this.rowsPerPage + 1;
		const lower = this.lowerBounds + increment;
		if (lower < this.rowCount) {
			updatePageState.call(this, lower, increment, 1);
		}
		this.isNextDisabled = this.upperBounds > this.rowCount;

	},
	prev() {
		const decrement = this.rowsPerPage + 1;
		const lower = this.lowerBounds - decrement;
		if (lower >= 0) {
			updatePageState.call(this, lower, -(decrement), -1)
		}
		this.isPrevDisabled = lower <= 0;
	}
});
