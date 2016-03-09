var should = require("chai").should(),
    t2j = require("../lib/tests2json");
    
var rawTests = `Q1: How many certification levels are there in the ABC Essentials certification?
A. 1
B. 2
C. 3
D. 4
Q2: Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified
Q3: Which one of the following describes three principles of the ABC Essentials
certification program?
A. Characteristic1, Characteristic2, Characteristic3
B. Characteristic1, Characteristic2, Characteristic4
C. Characteristic2, Characteristic3, Characteristic4
D. Characteristic3, Characteristic4, Characteristic5
E. All of these
`;

var lfTests = rawTests.replace(/\n/gim, "\n");
var crTests = rawTests.replace(/\n/gim, "\r");
var crlfTests = rawTests.replace(/\n/gim, "\r\n");

var splitIntoUnitsOutput = [
`Q1: How many certification levels are there in the ABC Essentials certification?
A. 1
B. 2
C. 3
D. 4
`,
`Q2: Which one of the following is the entry level certification for an individual?
A. ABC Certified
B. ABC Foundation
C. ABC Professional
D. ABC Qualified
`,
`Q3: Which one of the following describes three principles of the ABC Essentials
certification program?
A. Characteristic1, Characteristic2, Characteristic3
B. Characteristic1, Characteristic2, Characteristic4
C. Characteristic2, Characteristic3, Characteristic4
D. Characteristic3, Characteristic4, Characteristic5
E. All of these
`
];
    
describe('Split raw input into a list of separate questions.', function() {

  it('Handling \\n = LF (Line Feed)', function() {
    t2j
      .splitRawTests(lfTests)
      .should
      .deep
      .equal(splitIntoUnitsOutput);
   });
   
  it('Handling \\r = CR (Carriage Return)', function() {
    t2j
      .splitRawTests(crTests)
      .should
      .deep
      .equal(splitIntoUnitsOutput);
   });
   
   it('Handling \\r\\n = CR + LF (windows)', function() {
    t2j
      .splitRawTests(crlfTests)
      .should
      .deep
      .equal(splitIntoUnitsOutput);
   });
   
  it('Handling ES6 Template Literals', function() {
    t2j
      .splitRawTests(rawTests)
      .should
      .deep
      .equal(splitIntoUnitsOutput);
  });
});