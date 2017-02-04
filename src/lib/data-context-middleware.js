import Either from 'data.either';
import {noOp} from 'can-table/lib/utils';
import Box from 'can-table/lib/box';
import composeMiddleware from 'can-table/lib/compose-list-of-functions';

/**
 * @desc An Either that applies a composed function over a data set. When folded returns a Box.
 * @param middleWareSet
 * @returns {Either}
 */
const getFormatMiddleware = middleWareSet => {
	return Either.fromNullable(middleWareSet)
		.map(composeMiddleware)
		.fold(noOp, fn => Box(function (records) {
			return records.map(function (item, index) {
				const func = fn.get();
				return func(item, index)
			})
		}));
};

/**
 * @desc An Either that applies a set of filtering functions in a loop over successive sets of data
 * @param middleWareSet
 * @returns {Either}
 */
const getFilterMiddleware = middleWareSet => {
	return Either.fromNullable(middleWareSet)
		.fold(noOp, fn => Box(function filterRows (records) {
			let newRows = records;
			// Run each filter in succession
			fn.forEach(function(func){
				newRows =  records.filter(func);
			});
			return newRows;
		}));
};

/**
 * @desc An Either containing a composed formatting function over which a collection of records is mapped
 * @param middleware
 * @param records
 * @returns {Either}
 */
function applyFormatting(middleware, records) {
	return middleware.fold(function (fn) {
			return records.map(function (row) {
				const cells = row.cells;
				row.cells = fn(cells);
				return row;
			})
		}
	);
}

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

/**
 * @desc An either that can be folded to apply data format functions to a data set
 * @param cellMiddleware
 * @returns {Either}
 */
export const dataFormatMiddleware = cellMiddleware => records =>
	Either.fromNullable(getFormatMiddleware(cellMiddleware))
		.map(cells => applyFormatting(cells, records));
