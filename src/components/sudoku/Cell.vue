<template>
  <input
    type="text"
    maxlength="1"
    pattern="[1-9]"
    class="cell"
    v-model="cell.value"
    :class="cellBorder"
    :disabled="cell.fixed"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type CellType = {
  value: number | null;
  fixed: boolean;
};

@Component({})
export default class Cell extends Vue {
  @Prop() cell!: CellType;
  @Prop() x!: number;
  @Prop() y!: number;

  get cellBorder() {
    return {
      "border-right-none": this.y === 3,
      "border-bottom-none": this.x === 3
    };
  }
}
</script>
<style lang="scss" scoped>
.cell {
  background: white;
  text-align: center;
  border-bottom: gray solid 1px;
  border-right: gray solid 1px;

  font-size: 24px;
  width: 40px;
  height: 40px;
}

input[type="text"][disabled] {
  background: lightgray;
  cursor: not-allowed; /* 禁止カーソル */
}

.border-right-none {
  border-right: none;
}
.border-bottom-none {
  border-bottom: none;
}
</style>
