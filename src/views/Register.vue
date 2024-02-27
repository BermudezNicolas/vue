<template>
    
    <div>
        <h1>Register</h1>
        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="e-mail" v-model.trim="email">
            <input type="password" placeholder="********" v-model.trim="password">
            <button type="submit"  :disabled="userStore.loadingUser">Crear Usuario</button>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import {useUserStore} from '../stores/user'
 //   import { useRouter } from 'vue-router';
    //  const router = useRouter();
      const userStore = useUserStore()
      const email = ref('nicolasbermduez@gmail.com')
      const password = ref('rdzgzdrgzd')
      const handleSubmit  = async () => {
          if (!email.value || password.value.length < 6) {
            return alert('llena los campos')
          }
          await userStore.registerUser(email.value, password.value);
      //    router.push('/home')
      }
</script>