import Graph from "../src/Graph";
import sequentialGraphPath from "./data/graph/sequential";

beforeAll(() => {
  Graph.digest(sequentialGraphPath);
});

describe("Graph", function() {

  test('should be able to digest a graph json file', () => {
    const {title, questions, next} = Graph.store && Graph.store.module_plantId;

    expect(Graph.store).not.toEqual(null);
    expect(title).toEqual('Plant Identification');
    expect(next).toEqual('module_final');
    expect(questions).toContainEqual({"id":"plantId_1", "next":"plantId_2"});
    expect(Graph.modules).toEqual(['module_plantId', 'module_final']);
  });

  test('should be able to get first question in a given module', () => {
    const question = Graph.getFirstQuestionInModule('module_plantId');
    expect(question.id).toEqual('plantId_1');
  });

  test('should be able to get first question in a given module', () => {
    const question = Graph.getFirstQuestionInModule('module_plantId');
    expect(question.id).toEqual('plantId_1');
  });

  test('get a module id given a question id', () => {
    const modId = Graph.getModuleIdByQid('plantId_2');
    expect(modId).toEqual('module_plantId');
  });

  test("get index of question id in it's module of associated questions", () => {
    const idx = Graph.getIdxOfQidInModule('plantId_2');
    expect(idx).toEqual(1);
    const noIdx = Graph.getIdxOfQidInModule('plantId_faux');
    expect(noIdx).toEqual(-1);
  });

  test("determine if question id is the last in a module's 'basepath'", () => {
    const shouldNotBeLast = Graph.getQidIsLastInModuleBasePath('plantId_2');
    const shouldBeLast = Graph.getQidIsLastInModuleBasePath('plantId_4');
    expect(shouldNotBeLast).toBe(false);
    expect(shouldBeLast).toBe(true);
  });

  test("get the module title given a module id", () => {
    const title = Graph.getModuleTitleById('module_plantId');
    expect(title).toEqual('Plant Identification');
    const titleNone = Graph.getModuleTitleById('module_faux');
    expect(titleNone).toBeNull();
  });

  test("get the next module after a given module id", () => {
    const nextModId = Graph.getNextModuleId('module_plantId');
    expect(nextModId).toEqual('module_final');
    const noNextModId = Graph.getNextModuleId('module_final');
    expect(noNextModId).toBeUndefined();
  });

  test("get the question entry given a module id and question id", () => {
    const question = Graph.getModuleQuestion('module_plantId','plantId_3');
    expect(question).toEqual({"id":"plantId_3", "next":"plantId_4"});
    const fauxQuestion = Graph.getModuleQuestion('module_plantId','plantId_faux');
    expect(fauxQuestion).toBeUndefined();
  });

  test("determine the next question given a module id and question id ", () => {
    const question = Graph.getNextModuleQuestion('module_plantId','plantId_2');
    expect(question).toEqual({"id":"plantId_3", "next":"plantId_4"});
    const fauxQuestion = Graph.getNextModuleQuestion('module_plantId','plantId_faux');
    expect(fauxQuestion).toBeUndefined()
  });

  test("determine the total number of questions in the graph", () => {
    const modTotal = Graph.getBasePathLength();
    expect(modTotal).toEqual(5);
  });

  test("determine if question id is part of the graph's 'base path'", () => {
    const isInBasePath = Graph.getIsQidInBasePath('plantId_3');
    expect(isInBasePath).toBe(true);
    const isInBasePath2 = Graph.getIsQidInBasePath('plantId_faux');
    expect(isInBasePath2).toBe(false);
  });

  // test("get the squential path end node given a start point node for a conditional path", () => {
  //   const question = Graph.getSequentialEndPoint()
  //   expect(question).toEqual();
  // });
});
