<template>
  <div class="home-page">
    <!-- navbar -->
    <van-nav-bar
      title="我的简历"
      left-text="退出登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="wrap">
      <div class="introduction" @click="toPage('baseinfo')">
        <div class="detail">
          <p>
            <span>{{ this.personInfos.info.name }}</span>
            <span>{{ this.personInfos.info.sex == 1 ? "男" : "女" }}</span>
            <span>{{ this.personInfos.info.age }}岁</span>
          </p>
          <p>
            <van-icon class="icon-space" name="phone-o" />
            {{ this.personInfos.info.telephone }}
          </p>
          <p>
            <van-icon class="icon-space" name="location-o" />
            {{ this.personInfos.info.base }}
          </p>
        </div>
        <div class="head">
          <van-image :src="zspicurl" round></van-image>
        </div>
      </div>
      <div class="experience">
        <!-- 求职意向 -->
        <div class="com-card">
          <div class="com-card-title" @click="toPage('jobIntentionedit')">
            <van-icon
              class="card-icon"
              color="rgb(112,94,237)"
              name="manager"
            />求职意向
            <van-icon style="margin-left: auto" name="arrow" />
          </div>
          <div class="com-card-content">
            <div class="intention">
              <p>
                职位：
                <span>{{ this.personInfos.jobIntention.position }}</span>
              </p>
              <p></p>
              <p>
                行业：
                <span>{{ this.personInfos.jobIntention.industry }}</span>
              </p>
              <p>
                城市：
                <span>{{ this.personInfos.jobIntention.base }}</span>
              </p>
              <p>
                月薪：
                <span>
                  {{ this.personInfos.jobIntention.salary }}
                  元
                </span>
              </p>
            </div>
          </div>
        </div>
        <!-- 教育背景 -->
        <div class="com-card">
          <div class="com-card-title" @click="toPage('educationaledit')">
            <van-icon
              class="card-icon"
              color="rgb(71,188,100)"
              name="bookmark"
            />教育背景
            <van-icon style="margin-left: auto" name="arrow" />
          </div>
          <div class="com-card-content">
            <van-steps
              v-if="this.personInfos.educational"
              direction="vertical"
              :active="999"
              inactive-color="black"
              active-color="rgb(90,175,235)"
            >
              <van-step
                v-for="(item, index) in this.personInfos.educational"
                :key="index"
              >
                <p class="p-space">{{ item.time }}</p>
                <p class="p-space">
                  {{ item.school }}
                  <span class="education-margin">{{ item.education }}</span>
                </p>
                <p class="p-space">{{ item.major }}</p>
              </van-step>
            </van-steps>
            <div v-else @click="toPage('educationaledit')">
              <div class="blank-border">
                <div>点击编辑</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 掌握技能 -->
        <div class="com-card">
          <div class="com-card-title" @click="toPage('masterskilledit')">
            <van-icon
              class="card-icon"
              color="rgb(112,94,237)"
              name="manager"
            />掌握技能
            <van-icon style="margin-left: auto" name="arrow" />
          </div>
          <div class="com-card-content">
            <div class="skill" v-if="this.personInfos.techology">
              <div>{{ this.personInfos.techology }}</div>
            </div>
            <div v-else @click="toPage('masterskilledit')">
              <div class="blank-border">
                <div>点击编辑</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 项目经验 -->
        <div class="com-card">
          <div class="com-card-title" @click="toPage('projectexperienceedit')">
            <van-icon
              class="card-icon"
              color="rgb(71,188,100)"
              name="bookmark"
            />项目经验
            <van-icon style="margin-left: auto" name="arrow" />
          </div>
          <div class="com-card-content">
            <div class="project" v-if="this.personInfos.projectinfo_new">
              <div
                v-for="(item, index) in this.personInfos.projectinfo_new"
                :key="index"
              >
                <p>
                  <span class="project-name">{{ item.projectName }}</span>
                  <span class="project-time">
                    {{ item.startTime }}
                    <span v-if="item.startTime && item.endTime">~</span>
                    {{ item.endTime }}
                  </span>
                </p>
                <p>
                  <span v-if="item.usingTechnology">使用技术：</span>
                  <span>{{ item.usingTechnology }}</span>
                </p>
                <p>
                  <span v-if="item.projectIntroduction">项目介绍：</span>
                  <span>{{ item.projectIntroduction }}</span>
                </p>
                <p></p>
              </div>
            </div>
            <div v-else @click="toPage('projectexperienceedit')">
              <div class="blank-border">
                <div>点击编辑</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="button" @click="editInfos">保存</div>
    </div>
  </div>
</template>

<script>
import { getApi, postApi } from "@/api/index";
import { mapState } from "vuex";
import { Dialog } from "vant";
export default {
  data() {
    return {
      zspicurl: require("../assets/image/002.jpeg"),
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
    editInfos() {
      let params = {
        id: "1",
        data: JSON.stringify(this.personInfos),
      };
      postApi({
        url: "/info/info",
        query: params,
      }).then((res) => {
        if (res.flag == "success") {
          this.$toast("保存成功");
        }
      });
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
    toPage(val) {
      this.$router.push({
        name: val,
      });
    },
    // 退出登录
    onClickLeft() {
      Dialog.confirm({
        title: "确认要离开本页面吗？",
      })
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .then(() => {});
    },
  },
  beforeDestroy() {},
};
</script>

<style lang="less" scoped>
@colorBlue: #1989fa;
.wrap {
  padding-bottom: 2rem;
}
.introduction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #4370d0;
  color: #fff;
  padding: 0.25rem;
  .detail {
    line-height: 0.6rem;
    span {
      margin-right: 0.35rem;
    }
    span:first-child {
      font-size: 0.36rem;
    }
    .icon-space {
      margin-right: 0.16rem;
    }
  }
  .head {
    .van-image {
      width: 2rem;
      height: 2rem;
    }
  }
}
.experience {
  width: 90%;
  margin: auto;
}
.com-card {
  &-title {
    font-weight: bold;
    margin-bottom: 0.2rem;
    border-bottom: 1px solid rgb(232 224 224);
    padding: 0.25rem 0;
    display: flex;
    align-items: center;
    i {
      margin-right: 0.15rem;
    }
  }
  &-content {
    font-size: 0.28rem;
    line-height: 0.35rem;
  }
}
.intention {
  p {
    margin: 0.22rem 0;
  }
}
.project {
  div {
    border-bottom: 1px dashed @colorBlue;
  }
  div:last-child {
    border-bottom: none;
  }
  p {
    margin: 0.22rem 0;
  }
  .project-name {
    font-size: 0.28rem;
    font-weight: bold;
  }
  .project-time {
    margin-left: 1rem;
  }
}
.skill {
  padding: 0.25rem 0;
}
//

.text-space {
  margin-bottom: 0.2rem;
}

.footer {
  position: fixed;
  width: 100%;
  background: #fff;
  bottom: 0;
  z-index: 999;
  box-shadow: 5px 5px 12px #888888;
}
.button {
  background-color: #1989fa;
  color: white;
  text-align: center;
  font-size: 0.32rem;
  padding: 10px 0;
  border-radius: 30px;
  width: 70vw;
  margin: 20px auto;
}
</style>
