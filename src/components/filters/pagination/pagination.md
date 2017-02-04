
@author Joseph Crick

@module {heyo} Imalego
Adds pagination to a list or table type component.

@function ViewModel.isCurrentPage
.pagination

Checks if passed value matches value stored as current page.


@signature `this.isCurrentPage(pageNumber)`

@codestart javascript
const scope = this.viewModel,
    isCurrent = scope.isCurrentPage(1);//->true

@codeend

@param {Number} PAGE The page to check.
@return {Boolean} True when PAGE is the same as currentPage.
