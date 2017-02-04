/**
 * @module {function} table.pagination Table Cell
 *
 * @description
 * A table pagination component. Renders either a th or td (perhaps refactor?) depending on the type passed in.
 *
 * @signature '<can-data-context-pagination> <content/> </can-data-context-pagination>'
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
 *   <can-data-context-pagination {class-name}="demoVm.className">
 *      <span>This is a test</span>
 *   </can-data-context-pagination>
 * ```
 *
 */
import Component from 'can/component/';
import template from './unordered-list.stache!';
import viewModel from './unordered-list-viewmodel';

export default Component.extend({
    tag: 'unordered-list',
    template,
    viewModel
});
