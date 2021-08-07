<template>
  <ul id="dynamic-links">
    <li v-for="link of dynamicLinks">
      <a :href="link.href">{{link.text}}</a>
    </li>
    <li v-for="div of dynamicDivs">
      <div :id="div.cssId">{{div.text}}</div>
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
                for (let i = 0; i < 5; i++) {
                    this.dynamicLinks.push(Object.assign<LinkModel, LinkModel>(new LinkModel(), {
                        text: `dynamic-link-${i + 1}`,
                        href: `https://localhost/dynamic-link-${i + 1}.torrent`
                    }));
                }
            }, 5000);

            // Divs
            setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                    this.dynamicDivs.push(Object.assign<DivModel, DivModel>(new DivModel(), {
                        text: `dynamic-div-${i + 1}`,
                        cssId: `dynamic-div-${i + 1}`
                    }));
                }
            }, 10000);

        }
    }
</script>

<style lang="css">
  #dynamic-links {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
