import Questions from "../src/Questions";
import sequentialQuestions from "./data/questions/sequential";

beforeAll(() => {
  Questions.digest(sequentialQuestions);
});

describe("Questions", function() {

  test('should be able to digest a questions json file', () => {
    const {title, labels} = Questions.store && Questions.store.plantId_1;
    expect(Questions.store).not.toEqual(null);
    expect(title).toEqual("Which of the following is the name of this plant?");
    expect(labels).toContainEqual({"title":"Aloe aculeata", "qid":"105"});
  });

  // test("determine which of a question's predecessors was first in a conditional branch.", () => {
  //   const question = Questions.getFirstConditionalInPath();
  // });

  test("get the full answer object given an answer id", () => {
    const question = Questions.store.plantId_1;
    const answer = Questions.getAnswerById(question, "107");
    expect(answer).toEqual({"title":"Aloe africana", "qid":"107"});
  });

  test("get a question by it's id", () => {
    const question = Questions.getNodeById('plantId_2');
    expect(question.title).toEqual("Which of the following is the name of this plant?")
  })
});
