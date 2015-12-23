module.exports = function(yesterday, today) {
  var changes = [];

  yesterday.forEach(function(element, idx) {
    var todayIndex = today.indexOf(element);

    // Dropped out of the rankings
    if (todayIndex === -1) {
      changes.push({
        element: element,
        was: idx,
        now: null
      });

    // Moved rankings
    } else if (todayIndex !== idx) {
      changes.push({
        element: element,
        was: idx,
        now: todayIndex
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
        now: idx
      });
    }
  });

  return changes;
};
