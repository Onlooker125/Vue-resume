<template>
  <div>
    <van-nav-bar
      title="注册账号"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form>
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          ref="inputuser"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          ref="inputpsw"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          v-model="againPsw"
          type="password"
          ref="inputagain"
          name="确认密码"
          label="确认密码"
          placeholder="确认密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" @click="registered">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      againPsw: "",
      backConfirm: true,
      todos: JSON.parse(localStorage.getItem("login")) || [],
    };
  },
  methods: {
    //   注册
    registered() {
      // 登录判断
      if (this.username == "" && this.password == "") {
        Dialog.alert({
          message: "请输入账号和密码",
        })
        .then(()=>{
          this.$refs.inputuser.focus();
        })
      } else if (this.username == "") {
        this.$dialog.alert({
          message: "请输入账号",
        })
        .then(()=>{
          this.$refs.inputuser.focus();
        })
      } else if (this.password == "") {
        this.$dialog.alert({
          message: "请输入密码",
        })
        .then(()=>{
          this.$refs.inputpsw.focus();
        })
      } else if (this.againPsw == "") {
        this.$dialog.alert({
          message: "请输入再输入一次密码",
        })
        .then(()=>{
          this.$refs.inputagain.focus();
        })
      } else if (this.password != this.againPsw) {
        this.$dialog.alert({
          message: "两次输入的密码不一致，请重新输入",
        })
        .then(()=>{
          this.$refs.inputagain.focus();
        })
      } else {
        // 将用户输入的数据写进数组todos中
        this.todos.push({ user: this.username, psw: this.password });
        // 弹出提示框提示：注册成功，并返回到登录页面
        this.$dialog.alert({
          message: "注册成功！",
        });
        this.$router.push({ path: "/login" });
      }
    },

    // 标题栏navbar的返回
    onClickLeft() {
      Dialog.confirm({
        title: "确认要离开本页面吗？",
      })
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .then(() => {
          // this.$router.push({ path: "/" });
        });
    },
  },
  watch: {
    todos(value) {
      localStorage.setItem("login", JSON.stringify(value));
    },
  },
  // 离开路由守卫
  beforeRouteLeave(to, from, next) {
    next();
    // 确认离开初始化页面，离开后把用户填写的数据清空
    this.username = "";
    this.password = "";
    this.againPsw = "";
    this.$router.go(0);
  },
};
</script>

<style>
</style>