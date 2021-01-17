export default class CellModel {
  private fixNumber: number;
  private availNumbers: Array<boolean>;

  constructor() {
    this.fixNumber = 0;
    this.availNumbers = [true, true, true, true, true, true, true, true, true];
  }

  getFixNumber(): number {
    return this.fixNumber;
  }

  setNumber(number: number) {
    // 0 が設定されている場合は、処理をスキップする。
    if (number === 0) {
      return;
    }

    if (!this.availNumbers[number - 1]) {
      throw new Error("cannot set the number.");
    }

    if (this.fixNumber > 0) {
      throw new Error("alredy fix some number.");
    }

    this.fixNumber = number;
    this.availNumbers = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
  }

  isAvail(number: number) {
    return this.availNumbers[number - 1];
  }

  setUnavail(number: number) {
    this.availNumbers[number - 1] = false;
  }

  getAvailNumbers(): Array<number> {
    const availNumbers: Array<number> = [];
    for (let i = 0; i < 9; i++) {
      if (this.availNumbers[i]) {
        availNumbers.push(i + 1);
      }
    }

    return availNumbers;
  }
}
