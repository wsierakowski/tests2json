var should = require("chai").should(),
    t2j = require("../lib/tests2json");
    
var rawTest = `Q2: Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified
`;

var output = [{
  order: 0,
  id: "A",
  text: "ABC Certified"
}, {
  order: 1,
  id: "B",
  text: "ABC Foundation"
}, {
  order: 2,
  id: "C",
  text: "ABC Professional"
}, {
  order: 3,
  id: "D",
  text: "ABC Qualified"
}];
    
describe('Extract all options with their properties.', function() {

  it('Extract all options with their order number, id and text.', function() {
    t2j
      .getOptions(rawTest)
      .should
      .deep
      .equal(output);
   });
});