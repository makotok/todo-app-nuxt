export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      key: state.list.length + 1,
      text: text,
      status: 'Not Done'
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  done(state, todo) {
    todo.status = 'Done'
  }
}
