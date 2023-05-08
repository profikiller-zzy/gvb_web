<template>
  <div class="gvb_container">
    <div class="gvb_search">
      <a-input-search
        v-model:value="value"
        placeholder="input search text"
        enter-button
        @search="onSearch"
        style="width: 400px"
      />
    </div>
    <div class="gvb_actions">
      <a-button type="primary">Primary Button</a-button>
      <a-button>Default Button</a-button>
    </div>
    <div class="gvb_tables">
       <a-table :pagination="false" :columns="data.columns" :data-source="data.list">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span>
              <smile-outlined />
              {{column.name}}
            </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
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

const page = reactive({
  pageNum: 1,
  pageSize: 10,
})
const data = reactive(
    {
      columns:[
        {
          name: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Hobby',
          dataIndex: 'hobby',
          key: 'hobby',
        },
      ],
      list:[
        {
          name : "周俊宇",
          age : "23",
          hobby : "打篮球",
        }
      ],
    }
)
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


</style>