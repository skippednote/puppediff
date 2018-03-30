const fs = require('fs');
const looksSame = require('looks-same');
const { baseUrl, pages, breakpoints } = require('./pages.json');

breakpoints.forEach(({ width }) => {
  pages.forEach(({ name, url }) => {
    var updated = `./screenshots/${name}-${width}.png`;
    var baseline = `./screenshots/${name}-${width}-baseline.png`;
    var diff = `./screenshots/${name}-${width}-diff.png`;

    if (fs.existsSync(baseline) && fs.existsSync(updated)) {
      looksSame.createDiff(
        {
          reference: baseline,
          current: updated,
          diff: diff,
          highlightColor: '#ff00ff',
          strict: false,
          tolerance: 5
        },
        function(error) {
          if (error) console.warn(error);
        }
      );
    } else {
      console.log(`Missing the baseline or updated image for "${name}".`);
    }
  });
});
