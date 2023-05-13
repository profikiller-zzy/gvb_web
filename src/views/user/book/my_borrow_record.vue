<template>
  <div class="gvb_container">
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

          <template v-else-if="column.key === 'return_at'">
            <span v-if="record.return_at.Valid===true">{{getNowFormatDate(record.return_at.Time)}}</span>
            <span v-else>未归还</span>
          </template>

          <template v-else-if="column.key === 'expire_at'">
            <span>{{getNowFormatDate(record.expire_at)}}</span>
          </template>

          <template v-else-if="column.key === 'action'">
            <span>
              <a-divider type="vertical" />
                <a-button v-if="record.status==='被借阅' && record.return_at.Valid===false" @click="returnBook(record.id)">归还</a-button>
                <a-button v-if="record.status==='被借阅' && record.return_at.Valid===false" @click="renewBook(record.id)">续借</a-button>
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
        :total="data.count"
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
import {myBorrowRecordApi, renewBookApi, returnBookApi} from "@/api/user_api";
import {message} from "ant-design-vue";

console.log(import.meta.env)

const page = reactive({
  pageNum: 1,
  pageSize: 10,
})
const data = reactive(
    {
      columns:[
        {name: 'ID', dataIndex: 'id', key: 'id'},
        {title: '封面', dataIndex: 'avatar', key: 'avatar'},
        {title: '书名', dataIndex: 'book_name', key: 'book_name'},
        {title: 'ISBN', dataIndex: 'isbn', key: 'isbn'},
        {title: '作者', dataIndex: 'author', key: 'author'},
        {title: '出版社', dataIndex: 'press', key: 'press'},
        {title: '价格', dataIndex: 'price', key: 'price'},
        {title: '状态', dataIndex: 'status', key: 'status'},
        {title: '借阅时间', dataIndex: 'created_at', key: 'created_at'},
        {title: '归还时间', dataIndex: 'return_at', key: 'return_at'},
        {title: '到期时间', dataIndex: 'expire_at', key: 'expire_at'},
        {title: '操作', dataIndex: 'action', key: 'action'},
      ],
      list:[],
      selectedRowKeys: [],
      count: 0,
    })

function onSelectChange(selectedKeys){
  data.selectedRowKeys = selectedKeys
}

async function getBorrowRecord() {
  let res = await myBorrowRecordApi({
    page_num: data.pageNum,
    page_size: data.pageSize,
  })
  data.list = res.data.data_list
  data.count = res.data.count
  message.success("获取我的借阅记录成功")
}

async function returnBook(book_id) {
  let res = await returnBookApi(book_id)
  if (res.data.code) { // 归还失败
    message.error(res.msg)
    return
  }
  message.success(res.msg)
}

async function renewBook(book_id) {
  let res = await renewBookApi(book_id)
  if (res.data.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
}

getBorrowRecord()

// 借阅图书
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