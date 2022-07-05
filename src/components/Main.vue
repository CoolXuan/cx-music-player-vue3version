<template>
  <div class="main_content">
    <button class="btn login_btn" @click="denglu">
      登录
    </button>
    <div class="box" v-if="active">
      <h2>
        <span @click="change1">登录</span>|<span @click="change2">注册</span>
      </h2>
      <form class="login" v-if="exchange1" method="GET">
        <div class="inputBox">
          <label>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
          <input
            type="text"
            placeholder="请输入电话号码/Email"
            v-model="email"
            class="login_input"
          />
        </div>
        <div class="inputBox">
          <label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
          <input class="login_input" type="password" name="" v-model="pwd" />
        </div>
        <input type="submit" class="submit" value="登录" @click="login" />
      </form>
      <form class="register" v-if="exchange2">
        <div class="inputBox">
          <label>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label>
          <input
            type="text"
            class="login_input"
            placeholder="请输入电话号码/Email"
            v-model="email"
          />
        </div>
        <div class="inputBox">
          <label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码</label>
          <input
            class="login_input"
            type="password"
            name=""
            v-model="pwd"
          /><br />
        </div>
        <div class="inputBox">
          <label>确认密码</label>
          <input class="login_input" type="text" name="" v-model="repwd" />
        </div>
        <div class="inputBox">
          <label>验&nbsp;&nbsp;证&nbsp;&nbsp;码</label>
          <input
            class="login_input"
            type="text"
            name=""
            style="width:4rem;"
            v-model="code"
          />
          <input
            class="send_email"
            type="submit"
            style="height:1.5rem;line-heigth:1.5rem;font-weight:400;"
            value="发送邮件"
            @click="get_code"
          />
        </div>
        <div class="ok" v-if="check">{{ warning_msg }}</div>
        <input type="submit" class="submit" value="注册" @click="zhuce" />
      </form>
    </div>
    <!-- <div class="bg">
      <img src="/shujuji/src/assets/bg.jpg" alt="" />
    </div> -->
    <video class="bg" loop muted autoplay :style="style1">
      <source src="../assets/vm2.mp4" />
    </video>
    <div class="main">
      <router-view />
    </div>
    <div class="recomand_box">
      <div class="author_info">
        <div class="head_img">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div class="usr_id">{{ user_name }}</div>
      </div>
      <div class="nav_author">
        <ul>
          <li class="author_link">
            <router-link to="/author">
              &nbsp;&nbsp;<i class="el-icon-s-custom" />个人中心</router-link
            >
          </li>
          <li class="author_link">
            <router-link to="/changedata">
              &nbsp;&nbsp;
              <i class="el-icon-postcard" />修改信息</router-link
            >
          </li>
          <li class="author_link">
            <router-link to="/sendtext">
              &nbsp;&nbsp;<i class="el-icon-edit" />发布文章</router-link
            >
          </li>
        </ul>
      </div>
      <div class="others_recommand">
        <div class="nav">
          <div class="others_recommand_title">
            <h3>🥰<i>聆听心声</i>🥰</h3>
          </div>
          <ul>
            <li class="author_link">
              <router-link to="/discovery">
                &nbsp;&nbsp; <span class="iconfont icon-find-music" />
                发现音乐
              </router-link>
            </li>
            <li class="author_link">
              <router-link to="/playlists">
                &nbsp;&nbsp; <span class="iconfont icon-music-list" />
                推荐歌单
              </router-link>
            </li>
            <li class="author_link">
              <router-link to="/songs">
                &nbsp;&nbsp; <span class="iconfont icon-music" />
                最新音乐
              </router-link>
            </li>
            <li class="author_link">
              <router-link to="/mvs">
                &nbsp;&nbsp; <span class="iconfont icon-mv" />
                最新MV
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { defineComponent, ref, watch } from 'vue'
// import router from '@/router/index.ts'
// import axios from 'axios'
export default defineComponent({
  name: 'HelloWorld',
  props: {},
  setup() {
    const active = ref(false)
    const check = ref(false)
    // const ok = ref(false)
    const warning = ref(false)
    const exchange1 = ref(true)
    const exchange2 = ref(false)
    const style1 = ref({})
    const query = ref('')
    const warning_msg = ref('')
    // const id= ref('')
    const pwd = ref('')
    const repwd = ref('')
    const email = ref('')
    const code = ref('')
    const user_name = ref('未登录账号')
    function initmsg() {
      // msg数据初始化
      // id = ''
      email.value = ''
      pwd.value = ''
      repwd.value = ''
    }
    function login() {
      if (email.value.match(/.+@.+\..+/)) {
        const url = '/apis/login/' + email.value + '&' + pwd.value
        axios.post(url).then(res => {
          user_name.value = res.data
          console.log(res.data)
          if (user_name.value !== 'login_error') {
            active.value = !active.value
            alert('登录成功，欢迎' + user_name.value)
            initmsg()
          } else {
            alert('登录失败，可能此账号未注册！')
          }
        })
      } else {
        alert('邮箱格式不匹配！')
      }
    }
    function change1() {
      exchange1.value = true
      exchange2.value = false
      initmsg()
    }
    function change2() {
      exchange1.value = false
      exchange2.value = true
      initmsg()
    }
    function denglu() {
      initmsg()
      active.value = !active.value
      if (active.value) {
        style1.value = { filter: 'blur(15px)' }
      } else {
        style1.value = {}
      }
    }
    watch(repwd, () => {
      if (pwd.value !== repwd.value) {
        warning_msg.value = '确认密码不一致！'
        check.value = true
      } else if (pwd.value === repwd.value) {
        if (!pwd.value.match(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{8,12}$/)) {
          warning_msg.value = '密码必须是8-12位且包含数值和字母！'
        } else {
          check.value = false
        }
      }
    })
    function get_code() {
      console.log('get-code')
      if (email.value.match(/.+@.+\..+/)) {
        const url = '/apis/ecode/' + email.value
        axios.post(url).then(data => {
          data = data.data
          if (data === 'email-invalid') {
            alert('邮箱地址格式不正确.')
            return false
          }
          if (data === 'send-pass') {
            alert('邮箱验证码已成功发送，请查收.')
            return false
          }
          if (data === 'user-repeated') {
            email.value = ''
            pwd.value = ''
            repwd.value = ''
            alert('邮箱已注册，请重新输入其他邮箱！')
            return false
          }
          if (data === 'send-fail') {
            alert('邮箱验证码未发送成功.')
            return false
          }
        })
      } else {
        alert('邮箱地址格式不正确.')
      }
    }
    function zhuce() {
      if (email.value === '' || pwd.value === '' || code.value) {
        alert('请填写全所有信息！')
      }
      const url =
        '/apis/user/' + email.value + '&' + pwd.value + '&' + code.value
      axios.post(url).then(data => {
        data = data.data
        if (data === 'ecode-error') {
          alert('验证码输入错误！')
        }
        if (data === 'reg-pass') {
          alert('注册并登录成功')
          user_name.value = data.data.user_name
          active.value = false
        }
      })
    }
    return {
      active, // 模糊背景
      exchange1,
      query,
      exchange2, // 登录注册窗口控制值
      login, // 打开登录窗口
      change1, // 打开登录界面
      change2, // 打开注册页面
      style1, // 页面模糊css
      pwd,
      repwd,
      warning_msg,
      get_code,
      email,
      check,
      user_name,
      code, // 表中消息
      denglu, // 函数
      zhuce, // 注册
      warning // 警告
    }
  }
})
</script>

<style></style>
