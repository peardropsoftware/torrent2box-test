<template>
  <div id="static-links">
    <a href="https://localhost/static-link-001.torrent">static-link-001</a><br />
    <a href="https://localhost/static-link-002.torrent">static-link-002</a><br />
    <a href="https://localhost/static-link-003.torrent">static-link-003</a><br />
    <div>
      <div>
        <div>
          <div>
            <a href="https://localhost/static-link-004.torrent">static-link-004</a><br />
            <a href="https://localhost/static-link-005.torrent">static-link-005</a><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";

    @Component({
        name: "static-links"
    })
    export default class StaticLinks extends Vue {
        // Empty
    }
</script>
