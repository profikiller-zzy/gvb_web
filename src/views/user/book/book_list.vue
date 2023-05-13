<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
          v-model:value="data.selectText"
          placeholder="input search text"
          enter-button
          @search="onSearch"
      />
      <a-select
        ref="select"
        v-model:value="data.selectType"
        style="width: 120px"
        @focus="focus"
      >
        <a-select-option value="">显示全部图书</a-select-option>
        <a-select-option value="book_name_type">按书名查找</a-select-option>
        <a-select-option value="author_type">按作者查找</a-select-option>
        <a-select-option value="press_type">按出版社查找</a-select-option>
      </a-select>
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
            <span>
              <a-divider type="vertical" />
                <a-button v-if="record.status!=='被借阅'" @click="borrowBook(record.id)">借阅</a-button>
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
import {borrowBookApi, bookListApi, queryByBookNameApi, queryByAuthorApi, queryByPressApi} from "@/api/user_api";
import {message} from "ant-design-vue";

console.log(import.meta.env)

const page = reactive({
  pageNum: 1,
  pageSize: 10,
})
const book_name_query = reactive({
  book_name: ""
})
const author_query = reactive({
  author: ""
})
const press_query = reactive({
  press: ""
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
        {title: '操作', dataIndex: 'action', key: 'action'},
      ],
      list:[],
      selectedRowKeys: [],
      count: 0,
      selectType: "",
      selectText: "",
      book_name_type: false,
      author_type: false,
      press_type: false,
    })

function onSelectChange(selectedKeys){
  data.selectedRowKeys = selectedKeys
}

async function getBookList() {
  let res = await bookListApi({
    page_num: data.pageNum,
    page_size: data.pageSize,
  })
  data.list = res.data.data_list
  data.count = res.data.count
  message.success("获取书籍列表成功")
}

// export default {
//   data() {
//     return {
//       searchText: ''
//     }
//   },
//   methods: {
//     onSearch(value) {
//       console.log('User searched for:', value)
//       // Do something with the search value here
//       this.searchText = value // Update the searchText data property if needed
//     }
//   }
// }

async function onSearch() {
  switch (data.selectType) {
    case "" : {
      console.log(data.selectType)
      console.log(data.selectText)
      getBookList();
    }
    case "book_name_type" : {
      book_name_query.book_name = data.selectText
      let res = await queryByBookNameApi(book_name_query)
      if (data.count === 0) {
        message.warn("没有查询到信息")
        return
      } else {
        data.list = res.data.data_list
        data.count = res.data.count
        message.success("获取书籍列表成功")
        return
      }
    }

    case "author_type" : {
      author_query.author = data.selectText
      let res = await queryByAuthorApi(author_query)
      if (data.count === 0) {
        message.warn("没有查询到信息")
        return
      } else {
        data.list = res.data.data_list
        data.count = res.data.count
        message.success("获取书籍列表成功")
        return
      }
    }

    case "press_type" : {
      press_query.press = data.selectText
      let res = await queryByPressApi(press_query)
      if (data.count === 0) {
        message.warn("没有查询到信息")
        return
      } else {
        data.list = res.data.data_list
        data.count = res.data.count
        message.success("获取书籍列表成功")
        return
      }
    }
  }
}

async function borrowBook(book_id) {
  let res = await borrowBookApi(book_id)
  if (res.code) { // 借阅失败
    message.error(res.msg)
    return
  }
  message.success(res.msg)
}
getBookList()

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