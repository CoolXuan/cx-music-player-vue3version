<template>
  <div>
    <Main />
    <Header />
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Main from '@/components/Main.vue'
export default defineComponent({
  name: 'Home',
  components: {
    Header,
    Main,
    Footer
  }
})
</script>
<style scoped></style>
