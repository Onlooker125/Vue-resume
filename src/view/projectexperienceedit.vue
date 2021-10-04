<template>
  <div>
    <div class="jobIntention-editPage">
      <van-nav-bar
        title="项目经验"
        right-text="完成"
        @click-right="toHome"
        left-arrow
        @click-left="onClickLeft"
      />
      <div class="form-section">
        <van-form @submit="onSubmit">
          <van-field
            v-model="projectinfoObj.projectName"
            name="projectName"
            label="项目名称"
            placeholder="请输入项目名称"
            :rules="[{ required: true, message: '请输入项目名称' }]"
          />
          <van-popup v-model="showPicker_education" position="bottom">
            <van-picker
              show-toolbar
              :columns="educationArr"
              @cancel="showPicker_education = false"
              @confirm="onConfirm_education"
            />
          </van-popup>
          <van-field
            clickable
            name="startTime"
            :value="projectinfoObj.startTime"
            label="开始时间"
            placeholder="点击选择开始时间"
            @click="showPicker_startTime = true"
            :rules="[{ required: true, message: '请输入项目开始时间' }]"
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
            :value="projectinfoObj.endTime"
            label="结束时间"
            placeholder="点击选择结束时间"
            @click="showPicker_endTime = true"
            :rules="[{ required: true, message: '请输入项目结束时间' }]"
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
            v-model="projectinfoObj.usingTechnology"
            rows="3"
            name="usingTechnology"
            label="使用技术"
            type="textarea"
            maxlength="300"
            show-word-limit
            :rules="[{ required: true, message: '请输入项目使用技术' }]"
          />
          <van-field
            v-model="projectinfoObj.projectIntroduction"
            rows="6"
            name="projectIntroduction"
            label="项目介绍"
            type="textarea"
            maxlength="300"
            show-word-limit
            :rules="[{ required: true, message: '请输入项目介绍' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit"
              >添加</van-button
            >
          </div>
        </van-form>
        <div
          class="info-show"
          v-for="(item, index) in projectinfo"
          :key="index"
        >
          <div>
            <div class="p-margin">
              <span class="project-name">{{ item.projectName }}</span>
              <span class="project-time"
                >{{ item.startTime
                }}<span v-if="item.startTime && item.endTime">~</span
                >{{ item.endTime }}</span
              >
            </div>
            <div class="p-margin">
              <span v-if="item.usingTechnology">使用技术：</span>
              <span>{{ item.usingTechnology }}</span>
            </div>
            <div class="p-margin">
              <span v-if="item.projectIntroduction"> 项目介绍：</span>
              <span>{{ item.projectIntroduction }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      showPicker_education: false,
      showPicker_startTime: false,
      showPicker_endTime: false,
      projectinfoObj: {
        endTime: "",
        projectIntroduction: "",
        projectName: "",
        startTime: "",
        usingTechnology: "",
      },
      projectinfo: null,
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
    this.projectinfo = this.personInfos.projectinfo_new;
    // console.log(this.projectinfo);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toHome() {
      //获取赋值
      let projectinfo_new = {
        projectinfo_new: this.projectinfo,
      };
      this.$store.commit("CHANGEITEM", projectinfo_new);
      this.$router.push({ name: "home" });
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
      this.projectinfoObj.education = value;
      this.showPicker_education = false;
    },
    onConfirm_startTime(value) {
      let yearMonth = value.getFullYear() + "." + (value.getMonth() + 1);
      this.projectinfoObj.startTime = yearMonth;
      this.showPicker_startTime = false;
    },
    onConfirm_endTime(value) {
      let yearMonth = value.getFullYear() + "." + (value.getMonth() + 1);
      this.projectinfoObj.endTime = yearMonth;
      this.showPicker_endTime = false;
    },
    editEducational() {
      this.$router.push({ path: "/educationaledit" });
    },

    // 求职意向编辑页，提交按钮
    onSubmit(values) {
      // console.log("项目经验:", values);
      this.projectinfo.push(values);
      // 提交成功后清除用户输入的数据
      this.projectinfoObj.endTime = "";
      this.projectinfoObj.projectIntroduction = "";
      this.projectinfoObj.projectName = "";
      this.projectinfoObj.startTime = "";
      this.projectinfoObj.usingTechnology = "";
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
.project-time {
  margin-left: 30px;
}
.project-name {
  min-width: 100px;
}
.info-show {
  font-size: 0.28rem;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px dashed #efefef;
}
.p-margin {
  margin: 3px 0;
}
</style>
