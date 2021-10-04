<template>
  <div class="home-page">
    <van-nav-bar title="登录" />
    <!-- <div class="login-box">
      <van-cell-group>
        <van-field v-model="user" label="手机号" placeholder="请输入手机号" />
      </van-cell-group>
      <van-cell-group>
        <van-field v-model="psw" label="密码" placeholder="请输入密码" />
      </van-cell-group>
   </div> -->
    <!-- 登录按钮 --><van-form>
      <van-cell-group inset>
        <van-field
          v-model="user"
          ref="inputuser"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="psw"
          type="password"
          ref="inputpsw"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="login">
          登录
        </van-button>
      </div>
      <div>
        没有账号？
        <router-link :to="{ path: 'registered' }">点击注册</router-link>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getApi } from "@/api/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 用户输入的账号密码
      user: "",
      psw: "",
      // localStorage中存储的账号密码
      local: JSON.parse(localStorage.getItem("login")) || [],
    };
  },
  computed: {
    // 使用state辅助函数,使用对象方式时，名称可以不一致
    ...mapState({
      personInfos: (state) => state.personInfos,
    }),
  },
  created() {
    this.getInfo();
  },
  mounted() {},
  methods: {
    login() {
      // eslint-disable-next-line no-console
      // console.log(local);
      // 登录判断-判空
      if (this.user == "" && this.psw == "") {
        this.$dialog
          .alert({
            message: "请输入账号和密码",
          })
          .then(() => {
            this.$refs.inputuser.focus();
          });
      } else if (this.user == "") {
        this.$dialog
          .alert({
            message: "请输入账号",
          })
          .then(() => {
            this.$refs.inputuser.focus();
          });
      } else if (this.psw == "") {
        this.$dialog
          .alert({
            message: "请输入密码",
          })
          .then(() => {
            this.$refs.inputpsw.focus();
          });
      }
      // 登陆判断-判断本地账密
      for (let i = 0; i < this.local.length; i++) {
        if (this.local[i].user == this.user && this.psw == this.local[i].psw) {
          this.$dialog.alert({
            message: "登录成功",
          });
          this.$router.push({ path: "/home" });
        } else if (
          this.user == this.local[i].user &&
          this.psw != this.local[i].psw
        ) {
          this.$dialog
            .alert({
              message: "密码错误",
            })
            .then(() => {
              this.$refs.inputpsw.focus();
            });
        } else {
          this.$dialog
            .alert({
              message: "账号不存在",
            })
            .then(() => {
              this.$refs.inputuser.focus();
            });
        }
      }
      // if (this.user == this.local.user && this.psw == this.local.psw) {
      //   this.$dialog.alert({
      //     message: "登录成功",
      //   });
      //   this.$router.push({ path: "/home" });
      // } else if (this.user == "" && this.psw == "") {
      //   this.$dialog.alert({
      //     message: "请输入账号和密码",
      //   });
      // } else if (this.user == "") {
      //   this.$dialog.alert({
      //     message: "请输入账号",
      //   });
      // } else if (this.psw == "") {
      //   this.$dialog.alert({
      //     message: "请输入密码",
      //   });
      // } else if (this.user == this.local.user && this.psw != this.local.psw) {
      //   this.$dialog.alert({
      //     message: "密码错误",
      //   });
      // } else {
      //   this.$dialog.alert({
      //     message: "账号不存在",
      //   });
      // }
    },

    getInfo() {
      let params = {
        id: "1",
      };
      getApi({
        url: "info/info",
        query: params,
      }).then((res) => {
        if (res.flag == "success") {
          this.$store.commit("CHANGEINFO", JSON.parse(res.data.data));
        }
      });
    },
    toMasterSkill() {
      this.$router.push({
        name: "masterskilledit",
        params: { data: this.personInfos.techology },
      }); //掌握技能
    },
    editEducational() {
      let name = { name: this.personInfos.educational };
      this.$router.push({ name: "educationaledit", params: name }); //教育背景
    },
    editMasteringSkills() {
      this.$router.push({
        name: "projectexperienceedit", //项目经验
      });
    },
    editJobIntention() {
      this.$router.push({ name: "jobIntentionedit" }); //求职意向
    },
    editInfo() {
      this.$router.push({ path: "/baseinfo" }); //个人信息
    },
    editTechnology() {
      this.$router.push({ path: "/editTechnology" });
    },
  },
  beforeRouteLeave(to, from, next) {
    // 确认离开初始化页面，离开后把用户填写的数据清空
    next();
    this.user = "";
    this.psw = "";
  },
  beforeDestroy() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.self-btn {
  width: 60%;
  margin: 20px auto;
}
.home-page {
  text-align: center;
}
</style>
