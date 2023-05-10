<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
        placeholder="搜索用户昵称"
        style="width: 400px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary">添加用户</a-button>
      <a-button type="danger"
                v-if="data.selectedRowKeys.length"
                @click="removeInBatches">批量删除</a-button>
    </div>
    <div class="gvb_tables">
       <a-table
           :rowKey="'id'"
           :row-selection="{
            selectedRowKeys: data.selectedRowKeys,
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

          <template v-else-if="column.key === 'avatar'">
            <img :src="record.avatar" class="gvb_user_list_avatar">
          </template>

          <template v-else-if="column.key === 'created_at'">
            <span>{{getNowFormatDate(record.created_at)}}</span>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-button type="primary" class="gvb_user_list_action update">编辑</a-button>
            <a-button type="danger" class="gvb_user_list_action delete">删除</a-button>
          </template>
        </template>
      </a-table>
     </div>
    <div class="gvb_pages">
      <a-pagination
        v-model:current="page.pageNum"
        v-model:page-size="page.pageSize"
        :total="85"
        :show-total="total => `共 ${total} 条`"
        :hideOnSinglePage = "true"
        :showSizeChanger = "false"
      />
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {getNowFormatDate} from "@/utils/date";

console.log(import.meta.env)

const page = reactive({
  pageNum: 1,
  pageSize: 10,
})
const data = reactive(
    {
      columns:[
        {name: 'ID', dataIndex: 'id', key: 'id'},
        {title: '昵称', dataIndex: 'nick_name', key: 'nick_name'},
        {title: '头像', dataIndex: 'avatar', key: 'avatar'},
        {title: '邮箱', dataIndex: 'email', key: 'email'},
        {title: '地址', dataIndex: 'addr', key: 'addr'},
        {title: 'ip', dataIndex: 'ip', key: 'ip'},
        {title: '角色', dataIndex: 'role', key: 'role'},
        {title: '注册来源', dataIndex: 'sign_status', key: 'sign_status'},
        {title: '注册时间', dataIndex: 'created_at', key: 'created_at'},
        {title: '操作', dataIndex: 'action', key: 'action'},
      ],
      list:[
        {
          "id": 1,
          "created_at": "2023-05-05T16:04:32+08:00",
          "nick_name": "管理员一号",
          "avatar": "/uploads/avatar/default.png",
          "email": "3****@qq.com",
          "addr": "内网地址",
          "ip": "127.0.0.1",
          "role": "管理员",
          "sign_status": "邮箱"
        },
        {
          "id": 2,
          "created_at": "2023-05-05T19:21:48+08:00",
          "nick_name": "企鹅1号",
          "avatar": "/uploads/avatar/default.png",
          "email": "",
          "addr": "内网地址",
          "ip": "127.0.0.1",
          "role": "用户",
          "sign_status": "邮箱"
        }
      ],
      selectedRowKeys: [],
    })

function onSelectChange(selectedKeys){
  data.selectedRowKeys = selectedKeys;
  console.log(data.selectedRowKeys)
}

// 批量删除
function removeInBatches(){

}
</script>

<style lang="scss">
.gvb_container {
  padding: 10px;
  background-color: var(--bg);

  .gvb_search{
    padding: 10px;
    border-bottom: 1px solid var(--card_boder);
  }

  .gvb_actions {
    padding: 10px;
    .ant-btn {
      margin-right: 10px;
    }

  //.gvb_pages {
  //  justify-content: center;
  //  padding-bottom: 10px;
  //}
  }
}

.gvb_user_list_avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.gvb_user_list_action.update {
  margin-right: 10px;
}

</style>