import DefineMap from 'can-define/map/';
import Box from 'can-table/lib/box';
import Curry from 'ramda/src/curry';

const commaSeparatedListToArray = val => val.split(',').map(Number);
const correctIfBelowLowerBound = page => page < 1 ? 1 : page;
const correctIfAboveUpperBound = Curry((totalPages, page) => (totalPages && page > totalPages) ? totalPages : page);

export default DefineMap.extend({
	/**
	 * @property {Number} pagination.rowDisplayLimit rowDisplayLimit
	 * @description The number of items to display per page.
	 * @option {Number} Default value: **25**
	 */
	rowDisplayLimit: {
		type: 'number',
		value: 25
	},

	/**
	 * @property {Number} pagination.rowCount rowCount
	 * @description The total number of items.
	 * @option {Number} Default value: **null**
	 */
	rowCount: {
		type: 'number',
		value: null
	},

	/**
	 * @property {Array} pagination.pages pages
	 * @description Builds array needed to build pagination
	 *
	 */
	pages: {
		get() {
			let pageCount = this.totalPages;
			const pages = [];

			while (pageCount !== 0) {
				pages.unshift(pageCount);
				pageCount--;
			}

			return pages;
		}
	},

	/**
	 * @property {Number} pagination.viewmodel.currentPage
	 * @description The number of the page being viewed.
	 * @option {Number} Default value: **1**
	 */
	currentPage: {
		type: 'number',
		value: 1,
		set(page) {
			return Box(page)
				.map(correctIfBelowLowerBound)
				.fold(correctIfAboveUpperBound(this.totalPages));
		}
	},
	/**
	 * @property {Number} pagination.viewmodel.minLimitListValue
	 * @description Minimum number of records defaulted on.
	 */
	minLimitListValue: {
		get() {
			return this.pageLimits[0];
		}
	},
	/**
	 * @property {Number} pagination.viewmodel.totalPages
	 * @description Calculates the page number based on set rowDisplayLimit and provided item rowCount.
	 */
	totalPages: {
		get() {
			return Math.ceil(this.rowCount / this.rowDisplayLimit);
		}
	},

	/**
	 * @property {Boolean} pagination.viewmodel.showItemTotal
	 * @description Whether or not to display how many items exist.
	 * @option {Boolean} Default value: **true**
	 */
	showItemTotal: {
		type: 'boolean',
		value: true
	},

	/**
	 * @property {Boolean} pagination.viewmodel.showPageNavigation
	 * @description Whether or not to display page navigation
	 * @option {Boolean} Default value: **true**
	 */
	showPageNavigation: {
		type: 'boolean',
		value: true
	},

	/**
	 * @property {Boolean} pagination.viewmodel.showListOfPageLinks
	 * @description Whether or not to display page navigation as a list of selectable pages
	 * @option {Boolean} Default value: **false**
	 */
	showListOfPageLinks: {
		type: 'boolean',
		value: false
	},

	/**
	 * @property {Boolean} pagination.viewmodel.showLimitList
	 * @description Whether or not to display a selectable list of display limits
	 * This is a derived option and can not be set
	 */
	showLimitList: {
		get() {
			return !(this.totalPages <= 1 && this.rowDisplayLimit <= this.minLimitListValue);
		}
	},

	/**
	 * @property {String} pagination.viewmodel.itemsType
	 * @description Describes the type of items being paginated
	 * @option {String} Default value: **'results'**
	 */
	itemsType: {
		type: 'string',
		value: 'Results'
	},

	/**
	 * @property {String} pagination.viewmodel.pageStatusSuffix
	 * @description String to display after page status ('1 of 10')
	 * @option {String} Default value: **'pages'**
	 */
	pageStatusSuffix: {
		type: 'string',
		value: 'pages'
	},

	/**
	 * @property {Array} pagination.viewmodel.pageLimits
	 * @description A list of per-page display page limits from which a user can select.
	 * User can change the limits as per requirement.
	 * @option {Array} Default value: **[25, 50, 100, 200]**
	 */
	pageLimits: {
		set(newValue) {
			return Box(newValue)
				.map(val => (typeof val === 'string') ? commaSeparatedListToArray(val) : val)
				.fold(val => (typeof val === 'number') ? [val] : val);

		},
		value: [25, 50, 100, 200]
	},

	/**
	 * @property {Array} pagination.viewmodel.availablePageLimits
	 * @description A list of per-page display limits from which a user can select based on the rowCount of results
	 * @option {Array} Default value: **[25, 50, 100, 200]**
	 */
	availablePageLimits: {
		get() {
			const rowCount = this.rowCount;
			return this.pageLimits.filter(rowDisplayLimit => rowDisplayLimit < rowCount);
		}
	},

	/**
	 * @function pagination.viewmodel.canPrev
	 * @description Checks if there are more pages before current page
	 *
	 * @return {Boolean} True when current page is not first page.
	 */
	canPrev() {
		return this.currentPage > 1;
	},

	/**
	 * @function pagination.viewmodel.canNext
	 * @description Checks if there are more pages after current page
	 *
	 * @codestart javascript
	 * const scope = this.viewModel;
	 * scope.totalPages;//->10
	 * scope.setCurrentPage(10);
	 * scope.canNext(); //-> false
	 * @codeend
	 *
	 * @return {Boolean} True when current page is not last page.
	 */
	canNext() {
		return this.currentPage < this.totalPages;
	},
	/**
	 * @function pagination.viewmodel.canGoToFirstPage
	 * @description Checks if the current page is first page
	 *
	 * @return {Boolean} False when the current page is the first page
	 */
	canGoToFirstPage() {
		return this.currentPage !== 1;
	},
	/**
	 * @function pagination.viewmodel.canGoToLastPage
	 * @description Checks if the current page is last page
	 *
	 * @return {Boolean} False when the current page is the last page
	 */
	canGoToLastPage() {
		return this.currentPage !== this.totalPages;
	},

	/**
	 * @function pagination.viewmodel.isCurrentLimit
	 * @description Checks if passed in rowDisplayLimit is same as the viewModel’s rowDisplayLimit.
	 *
	 * @codestart javascript
	 * const vm = this.viewModel;
	 * vm.setLimit(5);
	 * vm.isCurrentLimit(5); //-> true
	 * @codeend
	 *
	 * @param {Number} rowDisplayLimit The rowDisplayLimit.
	 * @return {Boolean} True when the passed in rowDisplayLimit is the current rowDisplayLimit.
	 */
	isCurrentLimit(rowDisplayLimit) {
		return rowDisplayLimit === this.rowDisplayLimit;
	},

	/**
	 * @function pagination.viewmodel.isCurrentPage
	 * @description Checks if passed in page number is same as currentPage.
	 *
	 * @codestart javascript
	 * const scope = this.viewModel;
	 * scope.setCurrentPage(5);
	 * scope.isCurrentPage(5); //-> true
	 * @codeend
	 *
	 * @param {Number} page Page number.
	 * @return {Boolean} True when page is current page.
	 */
	isCurrentPage(page) {
		return page === this.currentPage;
	},

	/**
	 * @function pagination.viewmodel.setCurrentPage
	 * @description Sets the currentPage property based on passed-in number.
	 *
	 * @codestart javascript
	 * const scope = this.viewModel;
	 * scope.setCurrentPage(5);
	 * scope.currentPage; //-> 5
	 * @codeend
	 *
	 * @param {Number} page Page number to set.
	 */
	setCurrentPage(page) {
		this.currentPage = page;
	},

	/**
	 * @function pagination.viewmodel.goToNextPage
	 * @description Increases the current page number, if not viewing the last page.
	 *
	 * @codestart javascript
	 * const scope = this.viewModel;
	 * scope.currentPage; //-> 4
	 * scope.goToNextPage();
	 * scope.currentPage; //-> 5
	 * @codeend
	 *
	 */
	goToNextPage() {
		const currentPage = this.currentPage;

		if (this.canNext()) {
			this.currentPage = currentPage + 1;
		}
	},

	/**
	 * @function pagination.viewmodel.goToPrevPage
	 * @description Decreases the current page number, if not viewing the first page.
	 *
	 * @codestart javascript
	 * const scope = this.viewModel;
	 * scope.currentPage; //-> 4
	 * scope.goToPrevPage();
	 * scope.currentPage; //-> 3
	 * @codeend
	 *
	 */
	goToPrevPage() {
		const currentPage = this.currentPage;

		if (this.canPrev()) {
			this.currentPage = currentPage - 1;
		}
	},
	/**
	 * @function pagination.viewmodel.goToFirstPage
	 * @description Traverses the user diretly to first page from wherever user is
	 *
	 * @codestart javascript
	 * const scope = this.scope;
	 * scope.currentPage; //-> 4
	 * scope.goToFirstPage();
	 * scope.currentPage; //-> 1
	 * @codeend
	 *
	 */
	goToFirstPage() {
		this.currentPage = 1;
	},
	/**
	 * @function pagination.viewmodel.goToLastPage
	 * @description Traverses the user diretly to last page from wherever user is
	 *
	 * @codestart javascript
	 * const scope = this.scope;
	 * scope.currentPage; //-> 5
	 * scope.goToLastPage();
	 * scope.currentPage; //-> scope.totalPages
	 * @codeend
	 *
	 */
	goToLastPage() {
		this.currentPage = this.totalPages;
	},

	/**
	 * @function pagination.viewmodel.setLimit
	 * @description Changes the number of items displayed per page.
	 * @param {Number} newLimit The new value to set as the rowDisplayLimit.
	 */
	setLimit(newLimit) {
		if ((typeof newLimit === 'number') && (newLimit > 0)) {
			this.rowDisplayLimit = newLimit;
			this.currentPage = 1;
		}
	}
});
