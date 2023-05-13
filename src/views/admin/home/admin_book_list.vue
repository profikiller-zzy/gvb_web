<template>
  <div class="container">
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
    <div class="actions">
      <a-button type="danger" @click="removeBook">批量删除</a-button>
      <a-button type="primary" @click="openCreateBook">添加图书</a-button>
      <a-modal v-model:visible="CreateBookVisible" title="添加图书" @ok="createBook">
        <div class="adminInputItem">
          <span class="adminInputItem-span">书名</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.book_name" show-count :maxlength="36" />
        </div>
        <div class="adminInputItem">
          <span class="adminInputItem-span">ISBN</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.isbn" show-count :maxlength="36" />
        </div>
        <div class="adminInputItem">
          <span class="adminInputItem-span">作者</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.author" show-count :maxlength="36" />
        </div>
        <div class="adminInputItem">
          <span class="adminInputItem-span">出版社</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.press" show-count :maxlength="36" />
        </div>
        <div class="adminInputItem">
          <span class="adminInputItem-span">出版日期</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.publication_date" show-count :maxlength="36" />
        </div>
        <div class="adminInputItem">
          <span class="adminInputItem-span">价格</span>
          <a-input class="adminInputItem-text" v-model:value="bookInfo.price" show-count :maxlength="36" />
        </div>
      </a-modal>
    </div>
    <div class="gvb_tables">
     <a-table
         :rowKey="'id'"
         :row-selection="{
          selectedRowKeys: data.id_list,
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

        <template v-else-if="column.key === 'publication_date'">
          <span>{{getNowFormatDate(record.publication_date)}}</span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a-divider type="vertical" />
              <a-button v-if="record.status!=='被借阅'" @click="openUpdateBookView(record)">更新书籍信息</a-button>
              <a-modal v-model:visible="UpdateBookVisible" title="更新图书信息"
                       @ok="updateBook()">
                <div class="adminInputItem">
                  <span class="adminInputItem-span">书名</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.book_name" show-count :maxlength="36" />
                </div>
                <div class="adminInputItem">
                  <span class="adminInputItem-span">ISBN</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.isbn" show-count :maxlength="36" />
                </div>
                <div class="adminInputItem">
                  <span class="adminInputItem-span">作者</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.author" show-count :maxlength="36" />
                </div>
                <div class="adminInputItem">
                  <span class="adminInputItem-span">出版社</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.press" show-count :maxlength="36" />
                </div>
                <div class="adminInputItem">
                  <span class="adminInputItem-span">出版日期</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.publication_date" show-count :maxlength="36" />
                </div>
                <div class="adminInputItem">
                  <span class="adminInputItem-span">价格</span>
                  <a-input class="adminInputItem-text" v-model:value="bookInfo.price" show-count :maxlength="36" />
                </div>
              </a-modal>
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
        @change="getBookList"
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
import {getNowFormatDate} from "@/utils/date";
import {
  bookListApi, queryByAuthorApi, queryByBookNameApi, removeBookApi,
  createBookApi, queryByPressApi, updateBookApi
} from "@/api/api";
import {message} from "ant-design-vue";

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
        {title: '出版日期', dataIndex: 'publication_date', key: 'publication_date'},
        {title: '价格', dataIndex: 'price', key: 'price'},
        {title: '状态', dataIndex: 'status', key: 'status'},
        {title: '操作', dataIndex: 'action', key: 'action'},
      ],
      list:[],
      id_list: [],
      count: 0,
      selectType: "",
      selectText: "",
      book_name_type: false,
      author_type: false,
      press_type: false,
    })
const bookIdList = reactive({
  id_list: []
    })
const UpdateBookVisible = ref(false)
const CreateBookVisible = ref(false)
const bookInfo = reactive({
  book_name:"",
  isbn:"",
  author:"",
  press:"",
  publication_date:"",
  price:"",
})
const bookId = ref(0)
const page = reactive({
  pageNum: 1,
  pageSize: 10,
})

async function getBookList() {
  let res = await bookListApi({
    page_num: page.pageNum,
    page_size: page.pageSize,
  })
  data.list = res.data.data_list
  data.count = res.data.count
  message.success("获取书籍列表成功")
}
async function onSearch() {
  switch (data.selectType) {
    case "" : {
      let res = await bookListApi()
      data.list = res.data.data_list
      data.count = res.data.count
      message.success("获取书籍列表成功")
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
function openUpdateBookView(record) {
  bookInfo.book_name = record.book_name
  bookInfo.isbn = record.isbn
  bookInfo.author = record.author
  bookInfo.press = record.press
  bookInfo.publication_date = getNowFormatDate(record.publication_date)
  bookInfo.price = record.price
  bookId.value = record.id
  console.log(bookId)
  UpdateBookVisible.value = true
}
async function updateBook() {
  let res = await updateBookApi(bookId.value, bookInfo)
  if (res.code) {
    message.error(res.msg)
    UpdateBookVisible.value = false
    return
  }
  message.success(res.msg)
  UpdateBookVisible.value = false
  return
}
async function removeBook(){
  bookIdList.id_list = []
  let i
  for (i in data.id_list) {
    bookIdList.id_list.push(data.id_list[i])
  }
  console.log(bookIdList)
  let res = await removeBookApi(bookIdList)
  if (res.code) {
    message.error(res.msg)
    return
  }
  message.success(res.msg)
  return
}
function openCreateBook() {
  bookInfo.book_name = ""
  bookInfo.isbn = ""
  bookInfo.author = ""
  bookInfo.press = ""
  bookInfo.publication_date = ""
  bookInfo.price = ""
  CreateBookVisible.value = true
}
async function createBook() {
  let res = createBookApi(bookInfo)
  console.log(res)
  if (res.code) {
    message.error(res.msg)
    CreateBookVisible.value = false
    return
  }
  message.success(res.msg)
  CreateBookVisible.value = false
  getBookList()
  return
}
getBookList()

function onSelectChange(selectedKeys){
  data.id_list = selectedKeys
}

</script>

<style lang="scss">
.container {
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