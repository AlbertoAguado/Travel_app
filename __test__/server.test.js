import { getData } from "../src/server/server";

//To Test that the function exist as suggeested in Knowledge Udacity´s forum
//https://knowledge.udacity.com/questions/730235

describe("The getData function", () => {
    test("The function is defined", () => { // the test case
      expect(getData).toBeDefined();
    });
  });