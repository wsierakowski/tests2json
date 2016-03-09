var should = require("chai").should(),
    t2j = require("../lib/tests2json");
    
var rawTest = `Q2: Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified
`;

var output = {
  id: "Q2",
  text: "Which one of the following is the entry level certification for an individual?"
};
    
describe('Extract question id and title.', function() {

  it('Get question id and title', function() {
    t2j
      .getQuestion(rawTest)
      .should
      .deep
      .equal(output);
   });
});