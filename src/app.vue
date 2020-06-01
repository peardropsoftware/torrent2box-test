<template>
  <div id="app2">
    <static-links></static-links>
    <dynamic-links></dynamic-links>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import StaticLinks from "./components/static-links.vue";
    import DynamicLinks from "./components/dynamic-links.vue";

    @Component({
        name: "app",
        components: {
            StaticLinks,
            DynamicLinks
        }
    })
    export default class App extends Vue {
        // Empty
    }
</script>
