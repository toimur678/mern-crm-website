// User-facing search matches literal names, including punctuation such as
// "ACME (UK)" or "C++", without interpreting them as regular expressions.
module.exports = function escapeSearch(value = '') {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};
