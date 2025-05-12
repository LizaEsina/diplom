import { createStore } from 'vuex';

const getTokenFromCookies = () => {
  const match = document.cookie.match(/token=([^;]+)/);
  return match ? match[1] : null;
};

export default createStore({
  state: {
    token: getTokenFromCookies() || localStorage.getItem('token'), 
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      document.cookie = `token=${token}; max-age=${24 * 60 * 60}; path=/; SameSite=Lax`;
      localStorage.setItem('token', token); 
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      state.user = null;
      document.cookie = 'token=; max-age=0; path=/';
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
    },
    SET_USER(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user)); 
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    isAdmin: state => state.user?.role === 'admin'
  }
});