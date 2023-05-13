<template>
  <div>
    <div class="gvb_data_preview">
      <div class="action">
        <div>
          <a-button type="primary" @click="showModal">更新个人信息</a-button>
          <a-modal v-model:visible="visible" title="Update UserInfo" @ok="updateUserInfoView">
            <div class="inputItem">
              <span class="inputItem-span">昵称</span>
              <a-input class="inputItem-input" v-model:value="data.nick_name" show-count :maxlength="20" />
            </div>
            <div class="inputItem">
              <span class="inputItem-span">电话号码</span>
              <a-input class="inputItem-input" v-model:value="data.telephone_number" show-count :maxlength="20" />
            </div>
            <div class="inputItem">
              <span class="inputItem-span">性别</span>
              <a-select
                ref="select"
                v-model:value="data.gender"
                style="width: 120px"
                @focus="focus"
              >
                <a-select-option value="男性">男性</a-select-option>
                <a-select-option value="女性">女性</a-select-option>
              </a-select>
            </div>
            <div class="inputItem">
              <span class="inputItem-span">年龄</span>
              <a-input class="inputItem-input" v-model:value="data.age" show-count :maxlength="20" />
            </div>
          </a-modal>
        </div>

        <div>
          <a-button type="primary" @click="showChangeModal">更改密码</a-button>
          <a-modal v-model:visible="ChangeVisible" title="Change password" @ok="changePassword">
            <div class="inputItem">
              <span class="inputItem-span">旧密码</span>
              <a-input class="inputItem-input" v-model:value="password.old_pwd" show-count :maxlength="36" />
            </div>
            <div class="inputItem">
              <span class="inputItem-span">新密码</span>
              <a-input class="inputItem-input" v-model:value="password.pwd" show-count :maxlength="36" />
            </div>
          </a-modal>
        </div>

      </div>

      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-dianhuahaoma"></i>
        </div>
        <div class="text flex">
          <span>电话号码</span>
          <span v-if="data.telephone_number!==''">{{data.telephone_number}}</span>
          <span v-else>暂无</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-xingbie"></i>
        </div>
        <div class="text flex">
          <span>性别</span>
          <span>{{data.gender}}</span>
        </div>
      </div>


      <div class="preview_item flex">
        <div class="icon">
          <i class="iconfont icon-nianling"></i>
        </div>
        <div class="text flex">
          <span>年龄</span>
          <span v-if="data.age!==0">{{data.telephone_number}}</span>
          <span v-else>暂无</span>
        </div>
      </div>
      </div>

  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {useGlobalStore} from "@/stores/global_store";
import {updateMyInformationApi, getMyInformationApi, updatePasswordApi} from "@/api/user_api";
import {message} from "ant-design-vue";

const visible = ref(false)
const ChangeVisible = ref(false)
const data = reactive({
  nick_name: "",
  telephone_number: "",
  gender: "",
  age: 0,
})

const password = reactive({
  old_pwd: "",
  pwd: "",
})

function showModal() {
  visible.value = true;
}

function showChangeModal() {
  ChangeVisible.value = true
  password.old_pwd = ""
  password.pwd = ""
}

async function loadUserInfo() {
  let res = await getMyInformationApi()
  if (res.code){
    message.error(res.msg)
  } else {
    message.success(res.msg)
    data.telephone_number = res.data.telephone_number
    data.nick_name = res.data.nick_name
    data.gender = res.data.gender
    data.age = res.data.age
  }
}

async function updateUserInfoView() {
  let res = await updateMyInformationApi(data)
  if (res.code){
    message.error(res.msg)
  } else {
    message.success(res.msg)
    loadUserInfo()
    visible.value = false
  }
}

async function changePassword() {
  let res = await updatePasswordApi(password)
  if (res.code){
    message.error(res.msg)
  } else {
    message.success(res.msg)
    ChangeVisible.value = false
  }
}
loadUserInfo()
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
      width: 100%;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: var(--tetx);
    }
  }
}

.preview_item{
  display: flex;
}

.inputItem {
  display: flex;
  .inputItem-span {
    display: flex;
    justify-content: center;
    width: 80px;
  }
}
</style>