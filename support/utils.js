const fs = require('fs');

function makeBatchEmails(templateFile, outFile, count = 10) {
  const raw = JSON.parse(fs.readFileSync(templateFile));
  const base = raw[0];
  const list = [];

  for (let i = 0; i < count; i++) {
    const clone = { ...base, requestBody: { ...base.requestBody } };
    clone.requestBody.email = `batch${i}_${Date.now()}@example.com`;
    list.push(clone);
  }
  fs.writeFileSync(outFile, JSON.stringify(list, null, 2));
}

module.exports = { makeBatchEmails };
