export const state = () => ({
  list: []
})

export const mutations = {
  add(state, text) {
    state.list.push({
      key: state.list.length + 1,
      text: text,
      done: false
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
