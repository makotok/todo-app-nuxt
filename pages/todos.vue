<template>
  <div class="container">
    <a-input-search v-model="todoText" placeholder="input todo text" @search="addTodo">
      <a-button slot="enterButton" type="primary">
        Add
      </a-button>
    </a-input-search>
    <a-table :columns="columns" :data-source="todos">
      <span slot="action">
        <a-button type="danger">Remove</a-button>
      </span>
    </a-table>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      columns: [{
        title: 'ID',
        dataIndex: 'key'
      }, {
        title: 'Todo',
        dataIndex: 'text'
      }, {
        title: 'Action',
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
      this.$store.commit('todos/add', value)
      this.todoText = ''
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
