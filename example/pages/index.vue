<template>
  <div class="LazyLoad">
    <section
      v-for="(section, index) in sections"
      :key="index"
      class="LazyLoad__section"
      :style="{ backgroundColor: section }"
    />
  </div>
</template>

<script>
export default {
  name: 'Example',

  data () {
    return {
      sections: ['red', 'blue', 'green', 'black', 'pink']
    }
  }
}
</script>

<style>
.LazyLoad__section {
  height: 100vh;
  background: grey;
}
</style>
