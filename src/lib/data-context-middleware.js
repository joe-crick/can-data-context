import Either from 'data.either';
import {noOp} from 'can-table/lib/utils';
import Box from 'can-table/lib/box';

/**
 * @desc Converts the DefineMap that contains a list of functions as properties to an array based on the weight values
 * assigned to the function objects, e.g., `{ func: myFunc => 2, weight: 10}`.
 * @param functions
 * @returns {Array.<*>}
 */
function sortFunctionsByWeight(functions) {
	let weightedFunctions = [];
	functions.forEach(filterSet => {
		weightedFunctions.push(filterSet);
	});
	return weightedFunctions.sort((a, b) => a.weight - b.weight);
}

/**
 * @desc An Either that applies a set of filtering functions in a loop over successive sets of data
 * @param middleWareSet
 * @returns {Either}
 */
const getFilterMiddleware = middleWareSet => {
	return Either.fromNullable(middleWareSet)
		.fold(noOp, functions => Box(function filterRows(records) {
			let newRows = records;
			const weightedFunctions = sortFunctionsByWeight(functions);

			weightedFunctions.forEach(function (filterContainer) {
				newRows = newRows.filter(filterContainer.filter);
			});
			return newRows;
		}));
};

/**
 * @desc An Either containing a collection of records that is applied to a data set
 * @param middleware
 * @param records
 * @returns {Either}
 */
function applyDataFilters(middleware, records) {
	return middleware.fold(function (fn) {
			return fn(records)
		}
	);
}

/**
 * @desc An either that can be folded to apply a series of data filter functions to a data set
 * @param dataFilters
 * @returns {Either}
 */
export const dataFilterMiddleware = dataFilters => records =>
	Either.fromNullable(getFilterMiddleware(dataFilters))
		.map(middleware => applyDataFilters(middleware, records));

