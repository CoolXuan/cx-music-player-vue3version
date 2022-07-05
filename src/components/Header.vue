<template>
  <div>
    <div
      class="header"
      style="background:url('../assets/bi1.png') 2 2;background-size:2rem;"
    >
      <!-- <img class="header_bg"  alt="" /> -->
      <div class="shujuji">
        shujuji
      </div>
      <ul class="ul_link">
        <li class="link">
          <router-link to="/"> <i class="el-icon-s-home" />首页 </router-link
          >&nbsp;&nbsp;|
        </li>
        <li class="link">
          <router-link to="/discuss">
            <i class="el-icon-s-comment" />论坛 </router-link
          >&nbsp;&nbsp;|
        </li>
        <li class="link">
          <router-link to="/idea">
            <i class="el-icon-question" />心得
          </router-link>
          &nbsp;&nbsp;|
        </li>
        <li class="link">
          <router-link to="/back"
            ><i class="el-icon-info" />反馈意见</router-link
          >
        </li>
      </ul>
      <div class="mid_search">
        <input
          type="text"
          class="search_box"
          @keyup.enter="search"
          v-model="query"
          placeholder="请输入搜索内容..."
        />
        <button class="btn search_btn" @click="search">
          搜索
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from '@vue/runtime-core'
import router from '@/router/index.ts'
export default defineComponent({
  name: 'Header',
  setup() {
    const query = ref('')
    function search() {
      if (query.value === '') {
        alert('请输入内容')
      } else {
        router.push('/result?query=' + query.value)
      }
    }
    return {
      query,
      search
    }
  }
})
</script>

<style scoped></style>
