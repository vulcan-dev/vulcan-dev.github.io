import { createStore } from "vuex";

import user from "~/store/modules/user";
import projects from "~/store/modules/projects";
import editing from "~/store/modules/editing";

let titleModule = {
    namespaced: true,
    state: {
        title: 'My Title'
    },
    mutations: {
        setTitle(state, title) {
            state.title = title;
        }
    },
    getters: {
        title: state => state.title
    }
}

const store = createStore({
    modules: {
        user: user,
        projects: projects,
        editing: editing,
        title: titleModule
    },
    getters: {
        user: state => state.user.user,
        projects: state => state.projects.projects,
        editing: state => state.editing.editing,
        creatingProject: state => state.editing.creatingProject,
        title: state => state.title.title
    }
});

export default store;
