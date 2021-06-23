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
  name: 'TestPage',

  data () {
    return {
      sections: ['blue', 'green', 'black', 'pink', 'red', 'black']
    }
  }
}
</script>
