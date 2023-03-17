const state = {
    editing: false,
    creatingProject: false
}

const mutations = {
    setEditing(state, value) {
        state.editing = value;
    },

    setCreatingProject(state, value) {
        state.creatingProject = value;
    }
}

const actions = {
    setEditing({commit}, value) {
        commit('setEditing', value);
    },

    setCreatingProject({commit}, value) {
        commit('setCreatingProject', value);
    }
}

const getters = {
    editing: state => state.editing,
    creatingProject: state => state.creatingProject
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
