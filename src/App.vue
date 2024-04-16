<template>
  <div>
    <h1>App</h1>
    <nav v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link> |
      <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
      <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
      <button @click="userStore.logoutUser" v-if="userStore.userData">Logout</button>
    </nav>
    <div v-else>
      loading user...
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup>
    import { RouterLink, RouterView } from 'vue-router'
    import { onMounted } from 'vue';
    import { getAuth, onAuthStateChanged } from 'firebase/auth';
    import { useUserStore } from './stores/user';
    import { useDatabaseStore } from './stores/database';
    
    const userStore = useUserStore();

   /* const handleSingOut = () => {
      signOut(auth).then(() => {
         useRouter.router.push({path: '/'})
      })
    } */
        
    let auth;
    onMounted(() => {
      auth = getAuth()
      onAuthStateChanged(auth,(user) => {
        if(user){
          userStore.userData = user
          return;
        }
        else{
            const databaseStore = useDatabaseStore();  // doble seguridad 
            databaseStore.$reset();
        }
        })
      })
</script>
