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

var result = {
   "tests":[
      {
         "order":0,
         "id":"Q1",
         "question":"How many certification levels are there in the ABC Essentials certification?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"1"
            },
            {
               "order":1,
               "id":"B",
               "text":"2"
            },
            {
               "order":2,
               "id":"C",
               "text":"3"
            },
            {
               "order":3,
               "id":"D",
               "text":"4"
            }
         ]
      },
      {
         "order":1,
         "id":"Q2",
         "question":"Which one of the following is the entry level certification for an individual?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"ABC Certified"
            },
            {
               "order":1,
               "id":"B",
               "text":"ABC Foundation"
            },
            {
               "order":2,
               "id":"C",
               "text":"ABC Professional"
            },
            {
               "order":3,
               "id":"D",
               "text":"ABC Qualified"
            }
         ]
      },
      {
         "order":2,
         "id":"Q3",
         "question":"Which one of the following describes three principles of the ABC Essentials certification program?",
         "options":[
            {
               "order":0,
               "id":"A",
               "text":"Characteristic1, Characteristic2, Characteristic3"
            },
            {
               "order":1,
               "id":"B",
               "text":"Characteristic1, Characteristic2, Characteristic4"
            },
            {
               "order":2,
               "id":"C",
               "text":"Characteristic2, Characteristic3, Characteristic4"
            },
            {
               "order":3,
               "id":"D",
               "text":"Characteristic3, Characteristic4, Characteristic5"
            },
            {
               "order":4,
               "id":"E",
               "text":"All of these"
            }
         ]
      }
   ]
}

describe('Testing support for different ways of handling newlines', function() {
  // http://stackoverflow.com/questions/15433188/r-n-r-n-what-is-the-difference-between-them

  it('Handling \\n = LF (Line Feed)', function() {
    t2j
      .convert(rawTests)
      .should
      .deep
      .equal(result);
   });
   
  it('Handling \\r = CR (Carriage Return)', function() {
    t2j
      .convert(crTests)
      .should
      .deep
      .equal(result);
   });
   
   it('Handling \\r\\n = CR + LF (windows)', function() {
    t2j
      .convert(crlfTests)
      .should
      .deep
      .equal(result);
   });   
});