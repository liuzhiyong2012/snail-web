<template>
  <div class="message-page">
    <van-sticky class="header-wrap">
      <message-title>
        <div
          :class="showChat == true ? 'header-chat' : 'header-chat-disable'"
          slot="left"
          @click="gotoChatMessage('chat')"
        >
          <span>chat</span>
        </div>
        <div
          slot="right"
          :class="
            showMessage == true ? 'header-message' : 'header-message-disable'
          "
        >
          <span class="message-mr" @click="gotoChatMessage('message')"
            >message</span
          >
          <span>
            <i class="icon icon-able3_1"></i>
            <!-- <i
              class="icon icon-able3_1"
              style="color: rgba(46, 46, 46, 0.3);"
            ></i> -->
          </span>
        </div>
      </message-title>
    </van-sticky>

    <section v-show="showChat" class="chat-wrap">
      <div class="chat-inner">
        <div class="talkshow">
          <div
            v-for="(item, index) in chatList"
            :key="index"
            :class="item.type == 1 ? 'right-talk' : 'left-talk'"
          >
            <section class="talk-item">
              <div class="talk-item-box">
                <div class="item-img" v-if="item.type != 1">
                  <img :src="item.profilePhoto" alt="" />
                </div>
                <div class="item-content">
                  <p class="item-content-name" v-if="item.type != 1">
                    {{ item.name }}
                  </p>
                  <span class="item-content-word">{{ item.content }}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div class="send-box">
        <input
          type="text"
          class="word-input"
          v-model="wordContent"
          @keyup.enter="sendMsgToManager"
        />
        <input
          type="button"
          value="Send"
          class="send-btn"
          @click="sendMsgToManager"
        />
      </div>
    </section>

    <section v-show="showMessage" class="message-wrap">
      <div class="message-inner">
        <div
          v-for="(item, index) in systemMsgList"
          :key="index"
          class="message-item"
        >
          <div class="message-icon">
            <i class="icon icon-unread1_1" v-if="item.read == 0"></i>
            <i
              class="icon icon-unread1_1"
              v-if="item.read == 1"
              style="color: rgba(46, 46, 46, 0.3);"
            ></i>
          </div>
          <p
            :class="
              item.read == 0 ? 'message-content' : 'message-content-readed'
            "
          >
            {{ item.content }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import MessageTitle from "./components/MessageTitle";
import MessageService from "../../service/message";
import { localStore } from "../../utils/data-management";

export default {
  components: { MessageTitle },
  data() {
    return {
      showChat: true,
      showMessage: false,
      chatList: [
        {
          name: "Air Hostess",
          profilePhoto: require("./images/vadarImg.png"),
          content: "Hello，what can I help U ?",
          airbus_id: null,
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 0,
          to_user_id: null,
          type: 2,
        },

        {
          name: "张三",
          profilePhoto: require("./images/vadarImg.png"),
          content: "I want a blanket",
          airbus_id: null,
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 0,
          to_user_id: null,
          type: 1,
        },

        {
          name: "Air Hostess",
          profilePhoto: require("./images/vadarImg.png"),
          content: "Ok，We'll send it soon",
          airbus_id: null,
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 0,
          to_user_id: null,
          type: 2,
        },
      ],
      wordContent: "", //用户输入的内容

      systemMsgList: [
        {
          airbus_id: null,
          content: "You meal is already",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 0,
          to_user_id: null,
          type: 1,
        },
        {
          airbus_id: null,
          content: "You meal is done",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 0,
          to_user_id: null,
          type: 1,
        },
        {
          airbus_id: null,
          content: "You meal is already",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 1,
          to_user_id: null,
          type: 1,
        },
        {
          airbus_id: null,
          content: "I want a blanket",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 1,
          to_user_id: null,
          type: 1,
        },
        {
          airbus_id: null,
          content: "Ok，We'll send it soon",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 1,
          to_user_id: null,
          type: 1,
        },
        {
          airbus_id: null,
          content:
            "Hello，what can I help U ?Hello，what can I help U ?Hello，what can I help U ?Hello，what can I help U ?",
          created_time: "2020-07-30 08:03:38",
          from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
          id: "455d21023f2035c188dea4585906542d",
          read: 1,
          to_user_id: null,
          type: 1,
        },
      ], //系统消息
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(localStore.get("userInfo"));
  },
  mounted() {
    this.getUserMsg();
    // this.sendToaAirGirl();
    // this.sendToUser();
    this.getSystemNoticeList();
  },
  destroyed() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    // 切换聊天与系统消息
    gotoChatMessage(type) {
      if (type == "chat") {
        this.showChat = true;
        this.showMessage = false;
      } else if (type == "message") {
        this.showChat = false;
        this.showMessage = true;
      }
    },

    // 发送消息给空乘
    sendMsgToManager() {
      if (!this.wordContent) return this.$toast("请输入内容");
      this.chatList.push({
        name: "张三",
        profilePhoto: require("./images/vadarImg.png"),
        content: this.wordContent,
        airbus_id: null,
        created_time: "2020-07-30 08:03:38",
        from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7",
        id: "455d21023f2035c188dea4585906542d",
        read: 0,
        to_user_id: null,
        type: 1,
      });
      this.wordContent = "";
    },

    // 获取用户当前航班的消息
    getUserMsg() {
      MessageService.getUserMessage({}).then((res) => {
        if (res.code == 200) {
          console.log("聊天记录", res);
        }
      });
    },

    // 发送给空姐
    sendToaAirGirl() {
      let req = {};
      MessageService.sendToManager(req).then((res) => {
        if (res.code == 200) {
          console.log("用户发", res);
        }
      });
    },

    // 空姐发送给客户
    sendToUser() {
      let req = {};
      MessageService.sendToUser(req).then((res) => {
        if (res.code == 200) {
          console.log("空姐发", res);
        }
      });
    },

    // 获取系统通知
    getSystemNoticeList() {
      MessageService.getSystemNoticeList({}).then((res) => {
        if (res.code == 200) {
          console.log("系统消息", res);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-wrap {
  .header-chat {
    margin-right: 0.3rem;
  }
  .header-chat-disable {
    margin-right: 0.3rem;
    color: rgba(46, 46, 46, 0.3);
  }
  .header-message {
    margin-left: 0.3rem;
  }
  .header-message-disable {
    margin-left: 0.3rem;
    color: rgba(46, 46, 46, 0.3);
  }
  .message-mr {
    display: inline-block;
    margin-right: 0.1rem;
  }
  .icon-able3_1,
  .icon-diasable_1 {
    width: 0.1rem;
  }
}

.chat-wrap {
  .chat-inner {
    position: absolute;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    top: 1rem;
    bottom: 0.9rem;
    background: #f7f7f7;

    .left-talk {
      margin: 0.3rem;
      width: 70%;
      .talk-item {
        display: inline-block;
        padding: 0.1rem;
        border-radius: 0.5rem 0.5rem 0.5rem 0;
        background: #fff;

        .talk-item-box {
          display: flex;
          align-items: center;
          justify-content: center;
          .item-img {
            margin-right: 0.2rem;
            img {
              border-radius: 50%;
              width: 0.8rem;
            }
          }
          .item-content {
            font-family: Helvetica;
            .item-content-name {
              font-size: 0.24rem;
              margin-bottom: 0.1rem;
              color: rgba(46, 46, 46, 0.3);
            }
            .item-content-word {
              font-size: 0.32rem;
              line-height: 0.4rem;
              margin-right: 0.2rem;
              font-weight: 600;
              color: rgba(46, 46, 46, 0.8);
            }
          }
        }
      }
    }

    .right-talk {
      width: 70%;
      margin: 0.3rem;
      float: right;
      text-align: right;
      .talk-item {
        display: inline-block;
        padding: 0.1rem;
        border-radius: 0.5rem 0.5rem 0 0.5rem;
        background: #001f5b;
        color: #fff;
        .talk-item-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: row-reverse;
          .item-img {
            margin-left: 0.2rem;
            img {
              border-radius: 50%;
              width: 0.8rem;
            }
          }
          .item-content {
            font-family: Helvetica;
            padding: 0.1rem 0.1rem 0.1rem 0.2rem;
            text-align: left;
            .item-content-name {
              font-size: 0.24rem;
              margin-bottom: 0.1rem;
            }
            .item-content-word {
              font-size: 0.32rem;
              line-height: 0.4rem;
            }
          }
        }
      }
    }
  }
  .div::-webkit-scrollbar {
    display: none;
  }

  .send-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.96rem;
    line-height: 0.96rem;
    font-size: 0.3rem;
    background: #fff;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .word-input {
      margin: auto 0.3rem;
      width: 80%;
      text-indent: 0.3rem;
      height: 0.56rem;
      background: #f2f4f7;
      border-radius: 0.28rem;
      color: #2e2e2e;
    }

    .send-btn {
      width: 1.12rem;
      height: 0.56rem;
      line-height: 0.56rem;
      border-radius: 0.28rem;
      background: #001f5b;
      margin-right: 0.3rem;

      font-family: Helvetica-Bold, Helvetica;
      font-weight: bold;
      font-size: 0.28rem;
      color: #fff;
    }
  }
}

.message-wrap {
  margin-top: 0.2rem;
  .message-inner {
    .message-item {
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      height: 1rem;
      padding-left: 0.3rem;
      border-bottom: 1px solid rgba(46, 46, 46, 0.1);
      .message-icon {
        margin-right: 0.3rem;
      }
      .message-content {
        font-size: 0.32rem;
        font-family: Helvetica;
        color: rgba(38, 64, 115, 1);
        line-height: 0.4rem;
        margin-right: 0.3rem;

        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .message-content-readed {
        font-size: 0.32rem;
        font-family: Helvetica;
        color: rgba(51, 51, 51, 0.4);
        line-height: 0.4rem;
        margin-right: 0.3rem;

        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
