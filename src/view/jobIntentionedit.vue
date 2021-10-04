<!--
 * @Author: your name
 * @Date: 2021-08-23 10:54:23
 * @LastEditTime: 2021-08-24 15:52:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\view\jobIntentionedit.vue
-->
<template>
  <div>
    <div class="jobIntention-editPage">
      <van-nav-bar title="求职意向" left-arrow @click-left="onClickLeft" />
      <div>
        <van-form @submit="onSubmit">
          <van-field
            clickable
            name="position"
            :value="jobIntention.position"
            label="职位"
            placeholder="点击选择职位"
            @click="showPicker_position = true"
          />
          <van-popup v-model="showPicker_position" position="bottom">
            <van-picker
              show-toolbar
              :columns="positionArr"
              @cancel="showPicker_position = false"
              @confirm="onConfirm_position"
            />
          </van-popup>

          <van-field
            clickable
            name="industry"
            :value="jobIntention.industry"
            label="行业"
            placeholder="点击选择行业"
            @click="showPicker_industry = true"
          />
          <van-popup v-model="showPicker_industry" position="bottom">
            <van-picker
              show-toolbar
              :columns="industryArr"
              @cancel="showPicker_industry = false"
              @confirm="onConfirm_industry"
            />
          </van-popup>
          <van-field
            clickable
            name="base"
            :value="jobIntention.base"
            label="城市"
            placeholder="点击选择就业城市"
            @click="showPicker_base = true"
          />
          <van-popup v-model="showPicker_base" position="bottom">
            <van-picker
              show-toolbar
              :columns="baseCityArr"
              @confirm="onConfirm"
              @cancel="showPicker_base = false"
            />
          </van-popup>
          <!-- <div class="flex-item">
            <span>月薪</span>
            <div>
            <input type="text" v-model="salary[0]">~<input type="text" v-model="salary[1]">
            </div>
          </div> -->
          <div style="display: flex">
            <van-field
              v-model="salary[0]"
              name="salary1"
              label="月薪"
              placeholder="最低月薪"
            />
            <div style="display: flex; align-items: center">
              <div>-</div>
            </div>
            <van-field
              v-model="salary[1]"
              name="salary2"
              label
              placeholder="最高月薪"
            />
          </div>

          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import index from "./activity/index/index.vue";
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { index },
  data() {
    return {
      // jobIntention: {
      //   position: '产品经理',
      //   industry: '互联网',
      //   base: '福州',
      //   salary: '5000-15000'
      // },
      jobIntention: null,
      salary: null,
      baseCityArr: ["福州", "莆田", "厦门", "泉州"],
      showPicker_industry: false,
      showPicker_base: false,
      showPicker_position: false,
      industryArr: ["互联网", "教育", "房地产"],
      positionArr: ["前端开发工程师", "java开发工程师", "产品经理", "项目经理"],
    };
  },
  computed: {
    // 使用state辅助函数,使用对象方式时，名称可以不一致
    ...mapState({
      personInfos: (state) => state.personInfos,
    }),
  },
  created() {
    this.jobIntention = this.personInfos.jobIntention;
    this.salary = this.jobIntention.salary.split("-");
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 求职意向编辑页，提交按钮
    onSubmit(data) {
      let obj = {
        jobIntention: {
          position: data.position,
          industry: data.industry,
          base: data.base,
          salary: `${this.salary[0]}-${this.salary[1]}`,
        },
      };
      this.$store.commit("CHANGEITEM", obj);
      //处理
      this.$router.push({ name: "home" });
    },
    // onSubmit_masterSkill(values) {
    //   // console.log("掌握技能:", values);
    // },
    onConfirm_position(value) {
      this.jobIntention.position = value;
      this.showPicker_position = false;
    },
    onConfirm_industry(value) {
      this.jobIntention.industry = value;
      this.showPicker_industry = false;
      // Toast(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirm(value) {
      this.jobIntention.base = value;
      this.showPicker_base = false;
    },
  },
};
</script>

<style lang="less" scoped>
.jobIntention-editPage {
  /* min-height: calc(100vh - 20px); */
  background-color: white;
}
.jobIntention-title {
  background-color: rgb(51, 102, 255);
  font-weight: bold;
  color: white;
  text-align: center;
  font-size: 18px;
  border-radius: 2px;
}
.flex-item {
  display: flex;
  span {
    flex: 1;
  }
}
input {
  width: 100px;
  border: none;
}
</style>
