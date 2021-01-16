<template>
  <div class="question">
    <div
      class="block-row border-top border-bottom"
      v-for="blockX in 3"
      :key="blockX"
    >
      <div class="border-right border-left" v-for="blockY in 3" :key="blockY">
        <div class="q-row" v-for="x in 3" :key="x">
          <div v-for="y in 3" :key="y">
            <cell
              :cell="
                question[(blockX - 1) * 3 + x - 1][(blockY - 1) * 3 + y - 1]
              "
              :x="x"
              :y="y"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Cell, { CellType } from "./Cell.vue";

@Component({
  components: {
    Cell
  }
})
export default class Question extends Vue {
  @Prop() question!: Array<Array<CellType>>;
}
</script>
<style lang="scss" scoped>
.question {
  border: black solid 2px;
  width: 370px;
  margin: auto;
}

.block-row {
  display: flex;
}

.q-row {
  display: flex;
}

.border-right {
  border-right: black solid 1px;
}
.border-bottom {
  border-bottom: black solid 1px;
}
.border-left {
  border-left: black solid 1px;
}
.border-top {
  border-top: black solid 1px;
}
</style>
