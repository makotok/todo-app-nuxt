<template>
  <div class="container">
    <a-input-search v-model="todoText" placeholder="input todo text" @search="addTodo">
      <a-button slot="enterButton" type="primary">
        Add
      </a-button>
    </a-input-search>
    <a-table :columns="columns" :data-source="todos">
      <template slot="done" slot-scope="text, record">
        <a-icon v-if="record.status == 'Done'" type="check" />
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button v-if="record.status != 'Done'" type="primary" shape="circle" icon="check" @click="onDoneTodo(record)" />
        <a-button type="danger" shape="circle" icon="delete" @click="onRemoveTodo(record)" />
      </template>
    </a-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      columns: [{
        title: 'Done',
        width: '10%',
        dataIndex: 'status',
        filters: [
          { text: 'Done', value: 'Done' },
          { text: 'Not Done', value: 'Not Done' }
        ],
        scopedSlots: { customRender: 'done' },
        onFilter: (value, record) => record.status === value
      }, {
        title: 'ID',
        width: '10%',
        dataIndex: 'key'
      }, {
        title: 'Todo',
        width: '60%',
        dataIndex: 'text'
      }, {
        title: 'Action',
        width: '20%',
        scopedSlots: { customRender: 'action' }
      }],
      todoText: ''
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  },
  methods: {
    addTodo(value) {
      if (value) {
        this.$store.commit('todos/add', value)
        this.todoText = ''
      }
    },
    onDoneTodo(record) {
      this.$store.commit('todos/done', record)
    },
    onRemoveTodo(record) {
      this.$store.commit('todos/remove', record)
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.container {
  padding: 12px;
}

.done {
  text-decoration: line-through;
}
</style>
