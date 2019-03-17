<template lang="pug">

  #full.valign-wrapper.white-text
    .container
      h3.center-align {{ msg }}

</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      msg: 'hola mundo'
    }
  }
}
</script>

<style scoped>
</style>
