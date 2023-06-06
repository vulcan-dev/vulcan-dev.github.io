const state = {
    user: {
        // loggedIn: () => {
        //     if (typeof localStorage === 'undefined') {
        //         console.log('localStorage is not defined');
        //         return false;
        //     }
        //
        //     const token = localStorage.getItem('token');
        //     console.log('token: ' + token);
        //     return !!token;
        // },
        loggedIn: false,
        token: null,
        data: null
    }
}

const mutations = {
    setLoggedIn(state, value) {
        state.user.loggedIn = value;
    },

    setToken(state, value) {
        state.user.token = value;
        localStorage.setItem('token', value);
    },

    setUser(state, data) {
        state.user.data = data;
    },

    logout(state) {
        state.user.loggedIn = false;
        state.user.token = null;
        state.user.data = null;
        localStorage.removeItem('token');
    }
}

const actions = {
    async login({commit}, credentials) {
        const email = credentials.email;
        const password = credentials.password;
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/login', {
            method: 'POST',
            body: formData
        });

        const resp = await response.json();
        if (resp.data && resp.data.session) {
            commit('setLoggedIn', true);
            commit('setToken', resp.data.session.token);
            commit('setUser', resp.data.user);
        }

        return resp;
    },

    async checkAuth({commit}) {
        if (typeof localStorage === 'undefined') {
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(useRuntimeConfig().BACKEND_URL + '/api/v1/user', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        const resp = await response.json();
        if (resp.data) {
            commit('setLoggedIn', true);
            commit('setToken', resp.token);
            commit('setUser', resp.data);
        }
    },

    async logout({commit}) {
        commit('logout');
    },
}

const getters = {
    loggedIn: state => state.user.loggedIn,
}

export default {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
}
