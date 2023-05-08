<template>
  <div>
    <div class="gvb_data_preview">
      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-yonghu"></i>
        </div>

        <div class="text flex">
          <span>用户总数</span>
          <span>16</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {reactive} from "vue";

const data = reactive({
  sum_data_dict: {
    user_count: {
      label: "用户总数",
      value: 0,
      icon: "icon-chengyuanshuliang",
    },
    article_count: {
      label: "文章总数",
      value: 0,
      icon: "icon-shuliangtongji",
    },
    message_count: {
      label: "消息总数",
      value: 0,
      icon: "icon-xiaoxi",
    },
    chat_group_count: {
      label: "群聊消息",
      value: 0,
      icon: "icon-shuyi_qunliao",
    },
    now_login_count: {
      label: "今日登录",
      value: 0,
      icon: "icon-denglu",
    },
    now_sign_count: {
      label: "今日注册",
      value: 0,
      icon: "icon-zhucetianjiahaoyou",
    },
  },
})

</script>

<style lang="scss">

.gvb_data_preview {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 20px;


  .preview_item {
    display: flex;
    background-color: var(--card_bg);
    border-radius: 5px;
    border: 1px solid var(--card_boder);
    padding: 20px;


    .icon {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: center;

      i {
        font-size: 40px;
        color: var(--active);
      }
    }

    .text {
      width: 40%;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: var(--tetx);

      .data_sum {
        font-size: 18px;
      }

      .data_title {
        font-weight: 600;
      }
    }
  }
}


.preview_item{
  display: flex;

}
</style>