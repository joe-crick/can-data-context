import Either from 'data.either';
import {noOp} from 'can-data-context/lib/utils';
import Box from 'can-data-context/lib/box';

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
	return weightedFunctions.sort((a, b) => a.filterPriority - b.filterPriority);
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
			let rowCount = 0;
			const weightedFunctions = sortFunctionsByWeight(functions);

			// TODO: This whole thing with the sentinal is straight up hackey... Improve!
			// setting state, even. Oy...
			weightedFunctions.forEach(function (filterContainer) {
				if (filterContainer.sentinel) {
					rowCount = newRows.length;
				}
				newRows = newRows.filter(filterContainer.filter);
			});
			newRows.rowCount = rowCount;
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

