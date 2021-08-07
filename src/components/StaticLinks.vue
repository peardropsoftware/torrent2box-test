<template>
  <div id="static-links">
    <a href="https://localhost/static-file-001.torrent">static-file-001</a><br />
    <a href="https://localhost/static-file-002.torrent">static-file-002</a><br />
    <a href="https://localhost/static-file-003.torrent">static-file-003</a><br />
    <div>
      <div>
        <div>
          <div>
            <a href="https://localhost/static-file-004.torrent">static-file-004</a><br />
            <a href="https://localhost/static-file-005.torrent">static-file-005</a><br />
            <a href="https://localhost/static-file-006.torrent">static-file-006</a><br />
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
