import { countdown } from "../src/client/js/countdown";

//To Test that the function exist as suggested in Knowledge Udacity´s forum
//https://knowledge.udacity.com/questions/730235

describe("The countdown function", () => {
    test("The function is defined", () => { // the test case
      expect(countdown).toBeDefined();
    });
  });