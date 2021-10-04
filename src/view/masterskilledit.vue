<!--
 * @Author: your name
 * @Date: 2021-08-23 10:54:23
 * @LastEditTime: 2021-08-24 14:35:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\view\techologyedit.vue
-->
<template>
       <!-- 掌握技能编辑页面 -->
    <div class="jobIntention-editPage">
        <van-nav-bar title="掌握技能" left-arrow @click-left="onClickLeft" />
      <div>
        <van-form @submit="onSubmit_techology">
          <van-field
            v-model="techology"
            clickable
            rows="6"
            type="textarea"
            maxlength="300"
            show-word-limit
            name="techology"
            label="专业技能"
            placeholder="点击输入专业技能"
          />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data () {
    return {
      techology: ''
    }
  },
  computed: {
    // 使用state辅助函数,使用对象方式时，名称可以不一致
    ...mapState({
      personInfos: (state) => state.personInfos,
    }),
  },
  mounted () {
    this.techology = this.personInfos.techology
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    onSubmit_techology (values) {
      this.$store.commit("CHANGEITEM",values)  
      this.$router.push({ name: 'home'})
    }
  }
}
</script>

<style scope>
.jobIntention-editPage {
  /* min-height: calc(100vh - 20px); */
  background-color:white;
}
.jobIntention-title{
  background-color:rgb(51,102,255);
  font-weight: bold;
  color:white;
  text-align:center;
  font-size:18px;
  padding: 10px 0;
  border-radius: 2px;
}
</style>
