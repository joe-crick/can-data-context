import Component from 'can/component/';
import template from './table-html.stache!';
import viewModel from './table-html-viewmodel';

export default Component.extend({
    tag: 'can-table-html',
    template,
    viewModel,
    helpers: {
		/**
		 * @desc Returns the tableClasses CanList as a space separated string
		 * @returns {string}
		 */
		tableClassName() {
            return this.tableClasses.join(' ');
        },
		/**
		 * @desc Returns the cells meta property cellClasses as a space separated string.
		 * NOTE: This is the default class name source for cells. Individual cells can override
		 * this property.
		 * @returns {string}
		 */
		cellClassName() {
			return this.cellClasses.join(' ');
		},
		/**
		 * @desc Returns the cells meta property cellClasses as a space separated string.
		 * NOTE: This is the default class name source for cells. Individual cells can override
		 * this property.
		 * @returns {string}
		 */
		headerClassName() {
			// TODO: Calling join seems to be calling .toString on the DefineList function
			return this.headerClasses.join(' ');
		}
    }
});
