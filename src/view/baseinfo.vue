<template>
  <div class="hello animated bounceInDown">
    <van-nav-bar title="基本信息" left-arrow @click-left="onClickLeft" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="personMsg.name"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="personMsg.age"
        type="number"
        name="年龄"
        label="年龄"
        placeholder="年龄"
        :rules="[{ required: true, message: '请填写年龄' }]"
      />
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="personMsg.sex" direction="horizontal">
            <van-radio :name="1">男</van-radio>
            <van-radio :name="0">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="personMsg.telephone"
        type="number"
        name="电话"
        label="电话"
        placeholder="电话"
        :rules="[{ required: true, message: '请填写电话' }]"
      />
      <van-field
        label="出生日期："
        readonly
        clickable
        input-align="left"
        name="picker"
        :value="item.manufactureDate | formatter"
        placeholder="年/月/日"
        @click="
          () => {
            showCalendar = true;
          }
        "
        :rules="[{ message: '请选择出生日期' }]"
      />
      <van-popup v-model="showCalendar" position="bottom">
        <van-datetime-picker
          type="date"
          @confirm="onConfirmManufactureDate"
          v-model="currentDate"
          @change="changeFn()"
          @cancel="cancelFn()"
          :minDate="minDate"
        />
      </van-popup>

      <van-field
        v-model="personMsg.userAddress"
        type="text"
        name="籍贯"
        label="籍贯"
        placeholder="籍贯"
        :rules="[{ required: true, message: '请填写籍贯' }]"
      />
      <van-field
        v-model="personMsg.userEmail"
        type="mail"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
      />
      <van-field
        readonly
        clickable
        name="picker"
        :value="personMsg.workAgeValue"
        label="工作经验"
        placeholder="点击选择工作经验"
        @click="workAgeshowPicker = true"
      />
      <van-popup v-model="workAgeshowPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="workAgeColumns"
          @confirm="onWorkAgeConfirm"
          @cancel="workAgeshowPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="personMsg.educationValue"
        label="学历"
        placeholder="点击选择学历"
        @click="educationPicker = true"
      />
      <van-popup v-model="educationPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="educationColumns"
          @confirm="oneducationConfirm"
          @cancel="educationPicker = false"
        />
      </van-popup>
      <van-field
        readonly
        clickable
        name="picker"
        :value="personMsg.nowStateValue"
        label="求职状态"
        placeholder="点击选择求职状态"
        @click="nowStatePicker = true"
      />
      <van-popup v-model="nowStatePicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="nowStateColumns"
          @confirm="onnowStateConfirm"
          @cancel="nowStatePicker = false"
        />
      </van-popup>
      <van-field
        v-model="personMsg.userSuperiority"
        rows="2"
        autosize
        label="我的优势"
        type="textarea"
        maxlength="200"
        placeholder="请输入我的优势"
        show-word-limit
      />
      <div style="margin: 16px; bottom: 0px; position: absoult">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      personMsg: {
        age: "",
        base: "",
        name: "",
        sex: "",
        telephone: "",
        userEmail: "",
        userAddress: "",
        userSuperiority: "",
        nowStateValue: "",
        educationValue: "",
        workAgeValue: "",
        userBirDate: "",
      },
      showCalendar: false,
      workAgeColumns: ["实习", "1年", "2年", "3年", "4年", "5年"],
      workAgeshowPicker: false,
      educationColumns: ["大专", "本科", "硕士", "博士"],
      educationPicker: false,
      nowStatePicker: false,
      nowStateColumns: ["应届生", "正在职，准备换个环境", "已离职，随时可入职"],
      showPicker: false, //出厂日期
      minDate: new Date(1970, 0, 1), //定义一个最小时间
      currentDate: new Date(), //时间日期初始化
      changeDate: new Date(), //时间日期初始化
      item: {
        manufactureDate: "", //出厂日期
      },
    };
  },
  computed: {
    // 使用state辅助函数,使用对象方式时，名称可以不一致
    ...mapState({
      personInfos: (state) => state.personInfos,
    }),
  },
  created() {
    //赋值
    Object.keys(this.personMsg).forEach((key) => {
      this.personMsg[key] = this.personInfos.info[key];
    });
  },
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      let obj = {
        info: {
          ...this.personMsg,
        },
      };
      this.$store.commit("CHANGEITEM", obj);
      this.$router.go(-1);
    },
    onConfirm(date) {
      this.personMsg.userBirDate = `${date.getYear() + 1}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      this.showCalendar = false;
    },
    onWorkAgeConfirm(value) {
      this.personMsg.workAgeValue = value;
      this.workAgeshowPicker = false;
    },
    oneducationConfirm(value) {
      this.personMsg.educationValue = value;
      this.educationPicker = false;
    },
    onnowStateConfirm(value) {
      this.personMsg.nowStateValue = value;
      this.nowStatePicker = false;
    },
    changeFn() {
      // 值变化时触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
      this.item.manufactureDate = this.currentDate;
    },

    cancelFn() {
      this.showCalendar = false; //弹框取消事件
    },
    //点击输入框确认选择时间
    onConfirmManufactureDate(date) {
      this.item.manufactureDate = date;
      this.personMsg.userBirDate = date;
      this.showCalendar = false; //弹框取消事件
    },
  },
  filters: {
    formatter(date) {
      if (date == "" || date == null) {
        return;
      } else {
        date = new Date(date);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`; //精确到具体时间的在后面继续拼加
      }
    },
  },
  beforeDestroy() {},
};
</script>
<style scoped>
.headBack {
  color: #fff;
  background: #1989fa;
}
.navigation {
  background-color: #1989fa;
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 10px 0;
}
</style>