<template>
  <div>
    <div class="jobIntention-editPage">
      <van-nav-bar
        title="教育背景"
        right-text="完成"
        @click-right="toHome"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="form-section">
        <van-form @submit="onSubmit">
          <van-field
            v-model="stageEducationInfo.school"
            name="school"
            label="学校"
            placeholder="学校名称"
            :rules="[{ required: true, message: '请填写学校名称' }]"
          />
          <van-field
            clickable
            name="education"
            :value="stageEducationInfo.education"
            label="类型"
            placeholder="点击选择类型"
            @click="showPicker_education = true"
          />
          <van-popup v-model="showPicker_education" position="bottom">
            <van-picker
              show-toolbar
              :columns="educationArr"
              @cancel="showPicker_education = false"
              @confirm="onConfirm_education"
            />
          </van-popup>
          <!-- <van-field
            v-model="stageEducationInfo.startTime"
            name="startTime"
            label="开始时间"
            placeholder="开始时间"
          />-->
          <van-field
            clickable
            name="startTime"
            :value="stageEducationInfo.startTime"
            label="开始时间"
            placeholder="点击选择开始时间"
            @click="showPicker_startTime = true"
          />
          <van-popup v-model="showPicker_startTime" position="bottom">
            <van-datetime-picker
              type="year-month"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirm_startTime"
              @cancel="showPicker_startTime = false"
              :formatter="formatter"
            />
          </van-popup>

          <van-field
            clickable
            name="endTime"
            :value="stageEducationInfo.endTime"
            label="结束时间"
            placeholder="点击选择结束时间"
            @click="showPicker_endTime = true"
          />
          <van-popup v-model="showPicker_endTime" position="bottom">
            <van-datetime-picker
              type="year-month"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirm_endTime"
              @cancel="showPicker_endTime = false"
              :formatter="formatter"
            />
          </van-popup>

          <van-field
            v-model="stageEducationInfo.major"
            name="major"
            label="专业或课程"
            placeholder="大学专业或培训课程(可不填)"
            :rules="[{ required: false, message: '请填写大学专业或培训课程' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >添加</van-button
            >
          </div>
        </van-form>
        <van-steps
          direction="vertical"
          :active="999"
          inactive-color="black"
          active-color="rgb(90,175,235)"
        >
          <van-step
            v-for="(item, index) in educational"
            :key="index"
            class="step-flex"
          >
            <div>
              <p class="p-space flex-j">
                {{ item.time }}
                <span @click="deleteEdu(item, index)">删除</span>
              </p>
              <p class="p-space">
                {{ item.school }}
                <span class="education-margin">{{ item.education }}</span>
              </p>
              <p class="p-space">{{ item.major }}</p>
            </div>
          </van-step>
        </van-steps>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      showPicker_education: false,
      showPicker_startTime: false,
      showPicker_endTime: false,
      educational: [],
      stageEducationInfo: {
        school: "",
        education: "",
        major: "",
        startTime: "",
        endTime: "",
      },
      educationArr: ["博士", "硕士", "本科", "大专", "高中", "培训机构"],
    };
  },
  computed: {
    // 使用state辅助函数,使用对象方式时，名称可以不一致
    ...mapState({
      personInfos: (state) => state.personInfos,
    }),
  },
  mounted() {
    // eslint-disable-next-line no-console
    console.log("跳转过来携带的参数:", this.$route.params.name);
    this.educational = this.personInfos.educational;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toHome() {
      let obj = {
        educational: this.educational,
      };
      this.$store.commit("CHANGEITEM", obj);
      this.$router.push({ name: "home" });
    },
    deleteEdu(val, index) {
      this.educational.splice(index, 1);
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      }
      return val;
    },
    onConfirm_education(value) {
      this.stageEducationInfo.education = value;
      this.showPicker_education = false;
    },
    onConfirm_startTime(value) {
      let yearMonth =
        value.getFullYear() + "年" + (value.getMonth() + 1) + "月";
      this.stageEducationInfo.startTime = yearMonth;
      this.showPicker_startTime = false;
    },
    onConfirm_endTime(value) {
      let yearMonth =
        value.getFullYear() + "年" + (value.getMonth() + 1) + "月";
      this.stageEducationInfo.endTime = yearMonth;
      this.showPicker_endTime = false;
    },
    // 求职意向编辑页，提交按钮
    onSubmit(values) {
      let obj = {
        education: values.education,
        major: values.major,
        school: values.school,
        time: `${values.startTime} -- ${values.endTime}`,
      };
      // console.log("教育背景:", obj);
      this.educational.push(obj);
      // 清空用户输入数据内容
      this.stageEducationInfo.school = "";
      this.stageEducationInfo.education = "";
      this.stageEducationInfo.major = "";
      this.stageEducationInfo.startTime = "";
      this.stageEducationInfo.endTime = "";
    },
  },
};
</script>

<style scoped>
.p-space {
  margin-bottom: 4px;
}
.button {
  margin-top: 12px;
  background-color: rgb(60, 107, 211);
  color: white;
  text-align: center;
  font-size: 18px;
  padding: 10px 0;
}
.education-margin {
  margin-left: 5px;
}
.jobIntention-editPage {
  min-height: calc(100vh - 20px);
  background-color: white;
}
.jobIntention-title {
  background-color: rgb(51, 102, 255);
  color: white;
  font-size: 18px;
  padding: 10px 0;
  border-radius: 2px;
  display: flex;
  justify-content: center;
}
.button-finish {
  position: absolute;
  right: 20px;
  font-size: 14px;
  margin-top: 2.5px;
}
.flex-j {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
