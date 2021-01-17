import QuestionModel from "./model/QuestionModel";

export default class SolveLogic {
  public static solve(original: Array<Array<number>>) {
    const question = new QuestionModel(original);

    for (;;) {
      let count = 0;
      count += this.solve1(question);

      if (count === 0) {
        break;
      }
    }

    return question.getAnswer();
  }

  private static solve1(question: QuestionModel): number {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const availNumbers = question.getAvailNumbers(i, j);
        if (availNumbers.length === 1) {
          question.setNumber(i, j, availNumbers[0]);
          count++;
        }
      }
    }
    return count;
  }
}
