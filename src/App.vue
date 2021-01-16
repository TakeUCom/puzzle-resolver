<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link.name" :to="link.path" text>
          {{ link.name }}
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col v-if="listItems" cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="listItem in listItems"
                  :key="listItem.name"
                  :to="listItem.path"
                  link
                >
                  <v-list-item-content>
                    <v-list-item-title> {{ listItem.name }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <div class="q-title">
                <p>{{ title }}</p>
              </div>
              <router-view />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

export type LinkType = {
  name: string;
  path: string;
  listItems: Array<ListItemType>;
};

export type ListItemType = {
  name: string;
  path: string;
};

@Component({})
export default class App extends Vue {
  links: Array<LinkType> = [
    {
      name: "数独",
      path: "/sudoku",
      listItems: [
        {
          name: "通常",
          path: "/sudoku"
        }
      ]
    }
  ];

  get listItems(): Array<ListItemType> {
    const basePath = this.$route.path.split("/")[1];

    for (const link of this.links) {
      if (link.path === "/" + basePath) {
        return link.listItems;
      }
    }

    return new Array<ListItemType>();
  }

  get title(): string {
    return this.$route.meta.title;
  }
}
</script>
<style lang="scss" scoped>
.q-title {
  height: 50px;
  width: 100%;
  background-color: lightskyblue;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  line-height: 50px;
}
</style>
