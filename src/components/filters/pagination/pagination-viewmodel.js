import DefineMap from 'can-define/map/';
import batch from 'can-event/batch/'

/**
 * @desc The filter function applied to the data set
 * @param lowerBounds
 */
const filterPagination = lowerBounds => upperBounds => function (row, index, array) {
	return lowerBounds > array.length
		? index === (array.length - 1)
		: index >= lowerBounds && index <= upperBounds;
};

/**
 * @desc Updates the page state on navigation for increment and decrement
 * @param lower
 * @param increment
 * @param pageIncrement
 */
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
			return Math.ceil(this.rowCount / (this.rowsPerPage));
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
	nextButtonLabel: {
		value: 'Next'
	},
	previousButtonLabel: {
		value: 'Previous'
	},
	next() {
		const increment = this.rowsPerPage;
		const lower = this.lowerBounds + increment;
		if (lower < this.rowCount) {
			updatePageState.call(this, lower, increment, 1);
		}
		this.isNextDisabled = this.upperBounds > this.rowCount;

	},
	prev() {
		const decrement = this.rowsPerPage;
		const lower = this.lowerBounds - decrement;
		if (lower >= 0) {
			updatePageState.call(this, lower, -(decrement), -1)
		}
		this.isPrevDisabled = lower <= 0;
	}
});
