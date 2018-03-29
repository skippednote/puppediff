const fs = require('fs');
const looksSame = require('looks-same');
const { baseUrl, pages } = require('./pages.json');

pages.forEach(({ name, url }) => {
  var updated = `./screenshots/${name}.png`;
  var baseline = `./screenshots/${name}-baseline.png`;
  var diff = `./screenshots/${name}-diff.png`;

  if (fs.existsSync(baseline) && fs.existsSync(updated)) {
    looksSame.createDiff(
      {
        reference: baseline,
        current: updated,
        diff: diff,
        highlightColor: '#ff00ff',
        strict: false,
        tolerance: 2.5
      },
      function(error) {
        if (error) console.warn(error);
      }
    );
  } else {
    console.log(`Missing the baseline or updated image for "${name}".`);
  }
});
