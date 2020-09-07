export const state = () => ({
  dark_theme: false
})

export const getters = {
  dark_theme: state => {
    return state.dark_theme
  }
}

export const mutations = {
  toggleTheme: (state) => {
    state.dark_theme = !state.dark_theme
  }
}
