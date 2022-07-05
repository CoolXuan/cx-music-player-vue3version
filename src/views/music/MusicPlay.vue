<template>
  <div>
    <audio :src="songurl" autoplay controls class="player" />
  </div>
</template>

<script>
import { defineComponent, inject } from 'vue'
export default defineComponent({
  name: 'Main',
  setup() {
    const songurl = inject('song_url')
    return {
      songurl
    }
  }
})
</script>

<style></style>
