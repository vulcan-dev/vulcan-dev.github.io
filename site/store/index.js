import { createStore } from "vuex";

import user from "~/store/modules/user";
import projects from "~/store/modules/projects";
import editing from "~/store/modules/editing";

const store = createStore({
    modules: {
        user: user,
        projects: projects,
        editing: editing,
    },
    getters: {
        user: state => state.user.user,
        projects: state => state.projects.projects,
        editing: state => state.editing.editing,
        creatingProject: state => state.editing.creatingProject,
    }
});

export default store;
