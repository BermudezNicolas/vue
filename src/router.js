import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "./stores/user";
import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue"
import { onAuthStateChanged, getAuth } from "firebase/auth";





const routes = [
    { path: "/", component: Home, meta: {requiresAuth: true}},
    { path: "/edit/:id", component: Edit, meta: {requiresAuth: true}},
    { path: "/login", name: 'login', component: () => import('./views/Login.vue') },
    { path: "/register", name: 'register', component: () => import('./views/Register.vue') },]

const router = createRouter({
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
});


const getCurrentUser = () => {
  return new Promise((resolve,reject) => {
    const removeListener = onAuthStateChanged(getAuth(),(user) => {
      removeListener();
      resolve(user);
      },
      reject
    );
 })
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const userStore = useUserStore()
    userStore.loadingSession = true;
    if ( await getCurrentUser()) {
      userStore.loadingSession = false
      next();
    } else {
      userStore.loadingSession = false
      next('/login');
    }
  } else {
    next();
  }
})
export default router;


