import CellModel from "./CellModel";

export type BlockType = {
  x: number;
  y: number;
  value: CellModel;
};

export default class QuestionModel {
  private question: Array<Array<CellModel>>;

  constructor(question: Array<Array<number>>) {
    this.question = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(new CellModel());
      }
      this.question.push(row);
    }

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.setNumber(i, j, question[i][j]);
      }
    }
  }

  setNumber(x: number, y: number, number: number) {
    this.question[x][y].setNumber(number);
    const block = this.getBlcok(x, y);

    for (let i = 0; i < 9; i++) {
      if (x !== i) {
        this.question[i][y].setUnavail(number);
      }
      if (y != 1) {
        this.question[x][i].setUnavail(number);
      }

      const blockCell = block[i];
      if (blockCell.x !== x && blockCell.y !== y) {
        blockCell.value.setUnavail(number);
      }
    }
  }

  getBlcok(x: number, y: number): Array<BlockType> {
    const rowX = Math.floor(x / 3);
    const rowY = Math.floor(y / 3);

    const ans: Array<{
      x: number;
      y: number;
      value: CellModel;
    }> = [];
    for (let i = 0; i < 9; i++) {
      const tx = rowX * 3 + Math.floor(i / 3);
      const ty = rowY * 3 + (i % 3);
      ans.push({
        x: tx,
        y: ty,
        value: this.question[tx][ty]
      });
    }
    return ans;
  }

  getAvailNumbers(x: number, y: number): Array<number> {
    return this.question[x][y].getAvailNumbers();
  }

  getAnswer(): Array<Array<number>> {
    const ans: Array<Array<number>> = [];
    for (const row of this.question) {
      const ansRow: Array<number> = [];
      for (const cell of row) {
        ansRow.push(cell.getFixNumber());
      }
      ans.push(ansRow);
    }

    return ans;
  }
}
