<template>
  <div class="user_list_container">
    <div class="gvb_tables">
     <a-table
         :rowKey="'id'"
         :row-selection="{
          onChange: onSelectChange }"
         :pagination="false" :columns="data.columns" :data-source="data.list">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span>
            <smile-outlined />
            {{column.name}}
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <a>{{ record.id }}</a>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a-divider type="vertical" />
              <a-button type="danger" @click="deleteUser(record.id)">删除用户</a-button>
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
     </div>
    <div class="gvb_pages">
      <a-pagination
        v-model:current="page.pageNum"
        v-model:page-size="page.pageSize"
        @change="getUserList"
        :total="data.count"
        :show-total="total => `共 ${total} 条`"
        :hideOnSinglePage = "true"
        :showSizeChanger = "false"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive, ref} from "vue";
import {userListApi, deleteUserApi} from "@/api/api";
import {message} from "ant-design-vue";

const UpdateUserVisible = ref(false)
const data = reactive(
    {
      columns:[
        {name: 'ID', dataIndex: 'id', key: 'id'},
        {title: '用户名', dataIndex: 'user_name', key: 'user_name'},
        {title: '昵称', dataIndex: 'nick_name', key: 'nick_name'},
        {title: '电话号码', dataIndex: 'telephone_number', key: 'telephone_number'},
        {title: '性别', dataIndex: 'gender', key: 'gender'},
        {title: '年龄', dataIndex: 'age', key: 'age'},
        {title: '操作', dataIndex: 'action', key: 'action'},
      ],
      list:[],
      count: 0,
    })
const page = reactive({
  pageNum: 1,
  pageSize: 10,
})

async function getUserList() {
  let res = await userListApi({
    page_num: page.pageNum,
    page_size: page.pageSize,
  })
  data.list = res.data.data_list
  data.count = res.data.count
  message.success(res.msg)
}

getUserList()

async function deleteUser(user_id) {
  let res = await deleteUserApi(user_id)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
}

function onSelectChange(selectedKeys){
  data.id_list = selectedKeys
}

</script>

<style lang="scss">
.user_list_container {
  padding: 10px;
  background-color: var(--bg);

  .search{
    padding: 10px;
    border-bottom: 1px solid var(--card_boder);
  }

  .gvb_actions {
    padding: 10px;
    .ant-btn {
      margin-right: 10px;
    }
  }
}


.gvb_user_list_action.update {
  margin-right: 10px;
}


.adminInputItem {
  display: flex;
  .adminInputItem-span {
    display: flex;
    justify-content: center;
    width: 80px;
  }
  .adminInputItem-text {

  }
}
</style>