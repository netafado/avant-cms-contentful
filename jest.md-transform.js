"use strict";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const crypto = require("crypto");

module.exports = {
  process(source) {
    return {
      code: `module.exports = ${JSON.stringify(source)};`,
    };
  },
  getCacheKey(source, filePath) {
    return crypto
      .createHash("md5")
      .update(source)
      .update(filePath)
      .digest("hex");
  },
};