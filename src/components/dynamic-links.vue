<template>
  <ul id="dynamic-links">
    <li v-for="link of dynamicLinks">
      <a :href="link.href">{{link.label}}</a>
    </li>
    <li v-for="div of dynamicDivs">
      <div :id="div.cssId">{{div.label}}</div>
    </li>
  </ul>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {LinkModel} from "../models/link-model";
    import {DivModel} from "../models/div-model";

    @Component({
        name: "dynamic-links"
    })
    export default class DynamicLinks extends Vue {
        dynamicLinks: LinkModel[] = [];
        dynamicDivs: DivModel[] = [];

        mounted(): void {
            // Links
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.dynamicLinks.push(Object.assign<LinkModel, LinkModel>(new LinkModel(), {
                        label: `dynamic-file-${i}`,
                        href: `https://localhost/dynamic-file-${i}.torrent`
                    }));
                }
            }, 5000);

            // Divs
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.dynamicDivs.push(Object.assign<DivModel, DivModel>(new DivModel(), {
                        label: `div-${i}`,
                        cssId: `div-${i}`
                    }));
                }
            }, 10000);

        }
    }
</script>

<style lang="scss">
  #dynamic-links {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
