/**
 * @module {function} table.pagination Table Cell
 *
 * @description
 * A table pagination component. Renders either a th or td (perhaps refactor?) depending on the type passed in.
 *
 * @signature '<can-table-pagination> <content/> </can-table-pagination>'
 *
 * The table pagination component should contain these attributes along with the tag:
 *
 * @param {String} class-name
 * @param {Number} rowspan
 * @param {Number} colspan
 * @param {String} headers - A space separated string of IDs that associates this pagination with specific column headers
 *
 *
 * @body
 *
 * ## Use
 *
 * ```js
 *   <can-table-pagination {class-name}="demoVm.className">
 *      <span>This is a test</span>
 *   </can-table-pagination>
 * ```
 *
 */
import Component from 'can/component/';
import template from './context-pagination.stache!';
import viewModel from './context-pagination-viewmodel';

export default Component.extend({
    tag: 'context-pagination',
    template,
    viewModel
});
