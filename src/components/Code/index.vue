<template>
  <div class="countdown">
    <div class="send-code" v-if="status" @click.prevent.stop="sendCode">发送验证码</div>
    <div class="send-code" v-else>{{count}}秒后重试</div>
    <div></div>
  </div>
</template>
<script>
import Notify from '~/components/common/Notify'
import apis from '~/utils/api'

export default {
  props: {
    time: {
      type: String,
      default: '60'
    },
    phone: {
      type: String
    },
    url: {
      type: String,
      default: apis.codeUrl
    },
    type: {
      type: Number,
      default: 0 // 0 登陆短信   1  首次手机验证 2找回密码时验证手机号
    },
    deviceNum: {
      type: Number,
      default: 0 // 双因子登录的设备数量上限
    }
  },
  data() {
    return {
      status: true,
      count: Number(this.time),
      text: ''
    }
  },
  mixins: [Notify],
  methods: {
    sendCode() {
      if (!this.status) {
        return false
      }

      let reg = /^(1[3-9][0-9])\d{8}$/
      if (!this.phone) {
        this.$message({
          message: '请输入手机号码！',
          type: 'error'
        })

        return false
      }

      if (!reg.test(this.phone)) {
        this.$message({
          showClose: true,
          message: '请输入正确的电话号码！',
          type: 'error'
        })

        return false
      }

      if (this.deviceNum) {
        this.$confirm(`设备数量已达${this.deviceNum}台上限，继续登录将解绑其他设备`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.doSend()
          })
          .catch(() => {})

      } else {

        this.doSend()
      }
    },
    async doSend() {
      if (!this.url) {
        return
      }

      var data = {
        phone: this.phone,
        type: this.type // 0 登陆短信   1  首次手机验证
      }

      let res = await this.$axios({ url: this.url, method: 'post', data })

      if (res.success) {
        this.status = false
        let timer = setInterval(() => {
          this.count--
          if (this.count <= 0) {
            this.status = true
            clearInterval(timer)
            timer = null;
            this.count = 60
          }
        }, 1000)
      } else {
        this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.send-code {
  width: 100%;
  height: 47px;
  background: #1b66e9;
  text-align: center;
  color: #fff;
  line-height: 47px;
  border-radius: 3px;
  cursor: pointer;
}

@media screen and (max-width: 640px) {
  .send-code {
    width: 335px;
  }
}
</style>
