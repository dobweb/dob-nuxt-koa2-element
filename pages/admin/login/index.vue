<template>
  <section class="login">
    <el-card class="box-card login-block">
      <el-form ref="form" size="small" :model="form" label-width="90px">
        <h3 class="tit">用户登录</h3>
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password" style="width:220px"></el-input>
        </el-form-item>
        <el-form-item label="记住我">
          <el-switch v-model="form.remember"></el-switch>
        </el-form-item>
        <el-form-item style="text-align: center; width: 80%;">
          <el-button>取消</el-button>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script>
import '@/plugins/element-ui'
import { loginByUsername } from '@/api/login'
import { setToken } from '@/utils/authorization'
export default {
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456',
        remember: false
      }
    }
  },
  created () {
  },
  methods: {
    onSubmit () {
      loginByUsername(this.form).then(res => {
        if (res.token) {
          setToken(res.token)
          this.$router.push({path: '/admin'})
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.login {
  width:100%; height: 100vh;

  background: linear-gradient(155deg, rgba(0,98,132,1), rgba(15,37,64,1)); /* 标准的语法 */
}
.tit {
  text-align: center; margin-bottom: 30px;
}
.login-block {
  position: absolute; top: 50%; left: 50%;
  width: 420px; box-shadow: 2px 2px 30px rgba(0,0,0,0.2);
  -webkit-transform: translate(-50%, -60%);
  -o-transform: translate(-50%, -60%);
  -moz-transform: translate(-50%, -60%);
  transform: translate(-50%, -60%);
}
</style>
