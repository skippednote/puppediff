# Puppediff

> Puppeteer and Visual Regression

#### Setup

* `npm i`

#### Step

* Update pages.json with `baseUrl` and `pages` with list of `name` and `url`.
* Run `node index.js true` to generate baseline images.
* Update the codebase and run `node index.js` to generate updated images.
* Run `node diff.js` to generate diff images.
