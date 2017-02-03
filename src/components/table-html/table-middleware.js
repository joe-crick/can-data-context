import Either from 'data.either';
import {noOp} from 'can-table/lib/utils';
import Box from 'can-table/lib/box';
import composeMiddleware from 'can-table/lib/compose-list-of-functions';

const getFormatMiddleware = middleWareSet => {
	return Either.fromNullable(middleWareSet)
		.map(composeMiddleware)
		.fold(noOp, fn => Box(function (rows) {
			return rows.map(function (item, index) {
				const func = fn.get();
				return func(item, index)
			})
		}));
};

const getFilterMiddleware = middleWareSet => {
	return Either.fromNullable(middleWareSet)
		.fold(noOp, fn => Box(function filterRows (rows) {
			let newRows = rows;
			// Run each filter in succession
			fn.forEach(function(func){
				newRows =  rows.filter(func);
			});
			return newRows;
		}));
};

function _applyTableCellMiddleware(middleware, rows) {
	return middleware.fold(function (fn) {
			return rows.map(function (row) {
				const cells = row.cells;
				row.cells = fn(cells);
				return row;
			})
		}
	);
}

function _applyTableRowMiddleware(middleware, rows) {
	return middleware.fold(function (fn) {
			return fn(rows)
		}
	);
}

export const tableRowsMiddleware = tableFilters => rows =>
	Either.fromNullable(getFilterMiddleware(tableFilters))
		.map(middleware => _applyTableRowMiddleware(middleware, rows));


export const bodyCellMiddleware = cellMiddleware => rows =>
	Either.fromNullable(getFormatMiddleware(cellMiddleware))
		.map(cells => _applyTableCellMiddleware(cells, rows));


export const headerCellMiddleware = headerMiddleware => headings =>
	Either.fromNullable(getFormatMiddleware(headerMiddleware))
		.map(cells => _applyTableCellMiddleware(cells, headings));
