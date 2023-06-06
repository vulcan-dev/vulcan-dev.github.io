const state = {
    projects: [],
    stagedProjects: [],
    stagedCount: 0
}

// todo: actions
//   - an array of projects and a todo action (add, remove, update)

const mutations = {
    setProjects(state, projects) {
        state.projects = projects;
    },

    addStagedProject(state, project) {
        state.stagedProjects.push(project);
    },

    removeStagedProject(state, project) {
        state.stagedProjects.splice(state.stagedProjects.indexOf(project), 1);
    },

    setStagedProjects(state, projects) {
        state.stagedProjects = projects;
    },

    setStagedCount(state, count) {
        state.stagedCount = count;
    }
}

const actions = {
    async getProjects({commit}) {
        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resp = await response.json();
        if (resp.status !== "ok") {
            return;
        }

        commit('setProjects', resp.projects);
    },

    async createProject({commit}, project) {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(project)
        });

        const resp = await response.json();
        if (resp === null) {
            console.log('No projects found');
            return;
        }

        commit('setProjects', resp);
    },

    stageProject({commit}, project) {
        console.log('Staging project: ' + project.id)

        let existingProject = state.stagedProjects.find(p => p.id === project.id);
        if (existingProject) {
            existingProject = project;
            return;
        }

        let realProject = state.projects.find(p => p.id === project.id);
        if (!realProject) {
            console.log('No project found');
            return;
        }

        project.internal_name = realProject.internal_name;
        commit('addStagedProject', project);
        commit('setStagedCount', state.stagedProjects.length);
    },

    async addProject({commit}, project) {
        console.log('Adding project: ' + project.title)

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(project)
        });

        const resp = await response.json();
        if (resp === null || resp.status !== 'ok') {
            console.log('No projects found');
            return;
        }

        commit('setProjects', resp.projects);
    },

    unstageProject({commit}, project) {
        console.log('Unstaging project: ' + project.id)

        let existingProject = state.stagedProjects.find(p => p.id === project.id);
        if (!existingProject) {
            console.log('No project found');
            return;
        }

        commit('removeStagedProject', project);
        commit('setStagedCount', state.stagedProjects.length);
    },

    async deleteProject({commit}, project) {
        console.log('Deleting project: ' + project.id)

        let existingProject = state.projects.find(p => p.id === project.id);
        if (!existingProject) {
            console.log('No project found');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }

        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/projects/' + existingProject.internal_name, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        const resp = await response.json();
        if (resp === null || resp.status !== 'ok') {
            return;
        }

        commit('setProjects', resp.projects);
    },

    async saveProjects({commit}) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return;
        }

        const projects = state.stagedProjects.map(p => {
            return fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/projects/' + p.internal_name, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(p)
            });
        });

        await Promise.all(projects);

        commit('setStagedCount', 0);
        commit('setStagedProjects', []);

        await this.dispatch('projects/getProjects');
    },

    disregardAllStagedChanges({commit}) {
        commit('setStagedCount', 0);
        commit('setStagedProjects', []);
    }
}

const getters = {
    projects: state => state.projects,
    stagedCount: state => state.stagedCount
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
