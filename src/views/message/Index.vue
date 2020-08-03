<template>
  <div class="message-page">
    <van-sticky class="header-wrap">
      <message-title>
        <div
          :class="showChat == true ? 'header-chat' : 'header-chat-disable'"
          slot="left"
          @click="gotoChatMessage('message')"
        >
          <span>chat</span>
        </div>
        <div
          slot="right"
          :class="
            showMessage == true ? 'header-message' : 'header-message-disable'
          "
        >
          <span class="message-mr" @click="gotoChatMessage('notice')"
            >message</span
          >
          <span>
            <i
              class="icon icon-able3_1"
              v-show="showDelete == false"
              @click="deleteMsgShow"
            ></i>
            <i
              class="icon icon-able3_1"
              style="color: rgba(46, 46, 46, 0.3);"
              v-show="showDelete == true"
            ></i>
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
                  <img src="./images/vadarImg.png" alt="" />
                </div>
                <div class="item-content">
                  <p class="item-content-name" v-if="item.type != 1">
                    Air Hostess
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
          @click="changeReadStatus(item)"
        >
          <div class="message-icon">
            <i class="icon icon-unread1_1" v-if="item.Read == 0"></i>
            <i
              class="icon icon-unread1_1"
              v-if="item.Read == 1"
              style="color: rgba(46, 46, 46, 0.3);"
            ></i>
          </div>
          <p
            :class="
              item.Read == 0 ? 'message-content' : 'message-content-readed'
            "
          >
            {{ item.Title }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import MessageTitle from "./components/MessageTitle.vue";
import MessageService from "../../service/message";
import { localStore } from "../../utils/data-management";
@Component({
  name: "messageIndex",
  components: {
    MessageTitle,
  },
})
export default class messageIndex extends Vue {
  private showChat: boolean = true;
  private showMessage: boolean = false;
  private showDelete: boolean = true; // 系统消息是否显示清除按钮: true是不清除 false是要清除
  private uInfo: any = {};
  private chatList: Array<any> = [
    // {
    //   id: "455d21023f2035c188dea4585906542d", //消息id
    //   from_user_id: "3a03a40ac79b4f0d6eef58fcd99271d7", //发送人id
    //   to_user_id: null, //接收人id
    //   content: "Hello，what can I help U ?", //发送的消息
    //   created_time: "2020-07-30 08:03:38", // 发送时间
    //   airbus_id: null, //航班id
    //   read: 0, // 已读  0未读 1已读
    //   type: 2, // 1 发送给空乘   2 发送给用户
    // },
  ];

  private wordContent: string = "";
  private systemMsgList: Array<any> = [
    // {
    //   CreatedAt: "2020-07-31 09:17:21",
    //   Id: "3",
    //   Mark: "你的流量套餐订单已完成",
    //   Read: 1,
    //   Title: "Your netFlow order has been completed",
    // },
  ]; //系统消息

  private created() {
    this.uInfo = localStore.get("userInfo");
    this.initWebSocket();
  }
  private mounted() {
    this.getChatMessage(); // 获取聊天记录
    this.getSysNoticeList(); //获取系统通知列表
  }

  public goBack() {
    this.$router.go(-1);
  }

  // 切换聊天与系统消息
  public gotoChatMessage(type) {
    if (type == "message") {
      this.showChat = true;
      this.showMessage = false;
    } else if (type == "notice") {
      this.showChat = false;
      this.showMessage = true;

      this.showDelete = this.systemMsgList.every((item) => {
        return item.Read == 1;
      });
    }
  }

  // 清理系统通知为已读
  public deleteMsgShow() {
    this.systemMsgList.forEach((item) => {
      item.read = 1;
    });
    this.showDelete = this.systemMsgList.every((item) => {
      return item.read == 1;
    });
  }

  // 初始化websocket
  public initWebSocket() {
    const _this = this;
    // 连接服务端，workerman.net:2120换成实际部署web-msg-sender服务的域名或者ip
    let socket = io("http://172.16.8.69:2120");
    // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
    let uid = _this.uInfo.uid;

    // socket连接后以uid登录
    socket.on("connect", function() {
      socket.emit("login", uid);
    });
    // 后端推送来消息时
    socket.on("new_msg", function(msg) {
      let midMsg = msg.replace(/&quot;/g, `"`);
      let endMsg = JSON.parse(midMsg);

      // {type: "message", content: "Your netFlow order has been completed", mark: "你的流量套餐订单已完成"}

      if (endMsg.type == "system") {
        // 系统通知
        _this.systemMsgList.push({
          CreatedAt: "",
          Id: "",
          Mark: endMsg.mark,
          Read: 0,
          Title: endMsg.content,
        });
        _this.$store.dispatch("saveNoticeList", _this.systemMsgList);
      } else if (endMsg.type == "message") {
        // 聊天
        _this.chatList.push({
          id: "", //消息id
          from_user_id: "", //发送人id
          to_user_id: "", //接收人id
          content: endMsg.content, //发送的消息
          created_time: "", // 发送时间
          airbus_id: "", //航班id
          read: 0, // 已读  0未读 1已读
          type: 2, // 1 发送给空乘   2 发送给用户
        });
        _this.$store.dispatch("saveChatList", _this.chatList);
      }
    });
    // 后端推送来在线数据时
    socket.on("update_online_count", function(online_stat) {
      console.log("后端推送来在线数据时", online_stat);
    });
  }

  // 获取聊天记录 1已读  0未读
  public getChatMessage() {
    const _this = this;
    let messageList = [];
    if (localStore.get("chatList")) {
      messageList = localStore.get("chatList");
    }
    MessageService.getUserMessage({ read: 0 }).then((res) => {
      if (res.code == 200) {
        console.log("聊天记录", res);
        res.data = res.data.reverse();
        _this.chatList = [...messageList, ...res.data];
        _this.$store.dispatch("saveChatList", _this.chatList);
      }
    });
  }

  // 发送消息给空乘
  public sendMsgToManager() {
    const _this = this;
    if (!this.wordContent) return this.$toast("请输入内容");
    let req = {
      id: "", //消息id
      from_user_id: this.uInfo.uid, //发送人id
      to_user_id: "", //接收人id
      content: this.wordContent, //发送的消息
      created_time: "", // 发送时间
      airbus_id: this.uInfo.airbusId, //航班id
      read: 0, // 已读  0未读 1已读
      type: 1, // 1 发送给空乘  2发送给用户
    };
    let reqUser = {
      content: this.wordContent,
    };
    MessageService.sendToManager(reqUser).then((res) => {
      if (res.code == 200) {
        _this.chatList.push(req);
        _this.$store.dispatch("saveChatList", _this.chatList);
        _this.wordContent = "";
      }
    });
    this.wordContent = "";
  }

  // 获取系统消息 1已读 0未读
  public getSysNoticeList() {
    const _this = this;
    MessageService.getSystemNoticeList({ read: 1 }).then((res) => {
      if (res.code == 200) {
        res.data.notice = res.data.notice.reverse();
        _this.systemMsgList = [...res.data.notice];

        MessageService.getSystemNoticeList({ read: 0 }).then((res) => {
          if (res.code == 200) {
            res.data.notice = res.data.notice.reverse();
            _this.systemMsgList = [..._this.systemMsgList, ...res.data.notice];
            // _this.systemMsgList.forEach((item) => {
            //   item.read = 1;
            // });

            _this.showDelete = _this.systemMsgList.every((item) => {
              return item.Read == 1;
            });
            _this.$store.dispatch("saveNoticeList", _this.systemMsgList);
          }
        });
      }
    });
  }

  // 点击某条系统通知
  public changeReadStatus(item) {
    console.log("某条系统通知", item);
  }
}
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
