import QUnit from 'steal-qunit';
import ViewModel from './select-box.viewmodel';

// ViewModel unit tests
QUnit.module('can-data-context/components/select-box');

QUnit.test('selectedItem defaults to null', function(){
  const vm = new ViewModel();
  QUnit.equal(vm.attr('selectedItem'), null);
});


QUnit.test('setItemActive sets selectedItem', function(){
  const vm = new ViewModel();
  const ev = {
    preventDefault: () => {}
  }
  const testItem = {
    "name": "item 0"
  };

  vm.setItemActive(ev, testItem);

  QUnit.deepEqual(vm.attr('selectedItem').attr(), testItem);
});
