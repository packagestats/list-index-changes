var assert = require('assert');
var listIndexChanges = require('../');

describe('list-index-changes', function() {
  it('returns an empty list when there were no package rank changes', function() {
    var yesterday = ['foo', 'bar'];
    var today = ['foo', 'bar'];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 0);
  });

  it('includes packages that dropped out of the ranking', function() {
    var yesterday = ['foo', 'bar'];
    var today = ['foo'];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 1);

    assert.deepEqual(changes[0], {
      element: 'bar',
      was: 1,
      now: null
    });
  });

  it('includes packages that are newly ranked', function() {
    var yesterday = ['foo', 'bar'];
    var today = ['foo', 'bar', 'baz'];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 1);

    assert.deepEqual(changes[0], {
      element: 'baz',
      was: null,
      now: 2
    });
  });

  it('includes movement within the ranks', function() {
    var yesterday = ['foo', 'bar'];
    var today = ['bar', 'foo'];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 2);

    assert.deepEqual(changes[0], {
      element: 'foo',
      was: 0,
      now: 1
    });

    assert.deepEqual(changes[1], {
      element: 'bar',
      was: 1,
      now: 0
    });
  });

  it('handles an empty yesterday', function() {
    var yesterday = [];
    var today = ['bar', 'foo'];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 2);

    assert.deepEqual(changes[0], {
      element: 'bar',
      was: null,
      now: 0
    });

    assert.deepEqual(changes[1], {
      element: 'foo',
      was: null,
      now: 1
    });
  });

  it('handles an empty today', function() {
    var yesterday = ['foo', 'bar'];
    var today = [];
    var changes = listIndexChanges(yesterday, today);

    assert.equal(changes.length, 2);

    assert.deepEqual(changes[0], {
      element: 'foo',
      was: 0,
      now: null
    });

    assert.deepEqual(changes[1], {
      element: 'bar',
      was: 1,
      now: null
    });
  });
});
