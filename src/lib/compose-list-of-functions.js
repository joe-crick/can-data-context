// TODO: There must be a better way to identify a DefineList
import isDefineList from 'can-table/lib/is-define-list';
import Maybe from 'data.maybe';
import compose from 'ramda/src/compose';

export default middleWareSet => {
	const functions = [];
	if (isDefineList(middleWareSet) || 'slice' in middleWareSet) {
		let len = 0;
		let fn = middleWareSet[len];
		while (fn) {
			fn = middleWareSet[len];
			if (fn) functions[len] = fn;
			len++;
		}
	} else {
		functions.push(middleWareSet)
	}

	return Maybe.of(functions.length > 0 ? compose(...functions) : null);

	// TODO: ERROR - forEach is not a method. Currently hacking around this
	// middleWare.forEach(
	// 	fn => fn(headerCell)
	// );
};