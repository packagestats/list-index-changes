module.exports = function(yesterday, today, options) {
  var changes = [];
  options = options || {};

  var offset = options.ordinal ? 1 : 0;

  yesterday.forEach(function(element, idx) {
    var todayIndex = today.indexOf(element);

    // Dropped out of the rankings
    if (todayIndex === -1) {
      changes.push({
        element: element,
        was: idx + offset,
        now: null
      });

    // Moved rankings
    } else if (todayIndex !== idx) {
      changes.push({
        element: element,
        was: idx + offset,
        now: todayIndex + offset
      });
    }
  });

  // Newly added to the rankings
  today.forEach(function(element, idx) {
    var yesterdayIndex = yesterday.indexOf(element);

    if (yesterdayIndex === -1) {
      changes.push({
        element: element,
        was: null,
        now: idx + offset
      });
    }
  });

  return changes;
};
