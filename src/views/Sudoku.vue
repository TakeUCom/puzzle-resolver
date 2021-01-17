<template>
  <div class="sudoku">
    <v-container>
      <v-row>
        <v-col>
          <question :question="question" />
        </v-col>
        <v-col>
          <div class="btn-row">
            <v-btn @click="reset()" width="100%" :color="resetColor">
              リセット
            </v-btn>
          </div>
          <div class="btn-row">
            <v-btn @click="fix()" width="100%" :color="fixColor">
              問題を確定
            </v-btn>
          </div>
          <div class="btn-row">
            <v-btn @click="solve" width="100%" :color="solveColor">
              解く
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Question from "@/components/sudoku/Question.vue";
import { CellType } from "@/components/sudoku/Cell.vue";
import SolveLogic from "@/logic/sudoku/SolveLogic";

export enum Status {
  RESET = 1,
  FIX,
  SOLVE
}

@Component({
  components: {
    Question
  }
})
export default class Sudoku extends Vue {
  private question: Array<Array<CellType>> = [];
  private status: Status = Status.RESET;

  created() {
    this.reset();
  }

  fix() {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (this.question[x][y].value) {
          this.question[x][y].fixed = true;
        }
      }
    }
    this.status = Status.FIX;
  }

  reset() {
    this.question = [];
    for (let x = 0; x < 9; x++) {
      const row = new Array<CellType>();
      for (let y = 0; y < 9; y++) {
        row.push({
          value: null,
          fixed: false
        });
      }
      this.question.push(row);
    }
    this.status = Status.RESET;
  }

  solve() {
    const question = this.convertQuestionToArray();
    const ans = SolveLogic.solve(question);
    this.reflectAnswer(ans);
  }

  private convertQuestionToArray(): Array<Array<number>> {
    const arrayQuestion = [];
    for (const row of this.question) {
      const rowQuestion = [];
      for (const cell of row) {
        rowQuestion.push(
          cell.value !== null && cell.value > 0 ? cell.value : 0
        );
      }
      arrayQuestion.push(rowQuestion);
    }

    return arrayQuestion;
  }

  private reflectAnswer(ans: Array<Array<number>>): void {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (ans[i][j] > 0) {
          this.question[i][j].value = ans[i][j];
        }
      }
    }
  }

  get resetColor(): string {
    return "normal";
  }
  get fixColor(): string {
    if (this.status === Status.RESET) {
      return "primary";
    }
    return "normal";
  }
  get solveColor(): string {
    if (this.status === Status.FIX) {
      return "primary";
    }

    return "normal";
  }
}
</script>
<style lang="scss" scoped>
.sudoku {
  margin-top: 30px;
  margin-bottom: 30px;
}
.btn-row {
  margin: auto;
  margin-bottom: 20px;
  width: 80%;
}
</style>
