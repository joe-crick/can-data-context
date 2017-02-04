import Component from 'can/component/';
import template from './data-context.stache!';
import viewModel from './data-context-viewmodel';

export default Component.extend({
    tag: 'can-data-context',
    template,
	leakScope: true,
    viewModel
});
