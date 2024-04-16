<template>
    <div>
        <h1>Home</h1>
        <p>{{userStore.userData?.email}}</p>
        <p>{{userStore.userData?.uid}}</p>
        <br>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese url" v-model="url">
            <button type="submit">Agregar</button>
        </form>
        <p v-if="databaseStore.loadingDocs"> loading documents...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
                {{ item.id }} - {{ item.short }} - {{ item.name }}
                <br>
                <button @click="databaseStore.deleteUrl(item.id)">Eliminar</button>
                <button @click="router.push(`/Edit/${item.id}`)">Editar</button>
                
                         
            </li>
        </ul>

    </div>
</template>

<script setup>
import {useUserStore} from '../stores/user'
const userStore = useUserStore()
import { useDatabaseStore } from '../stores/database';
import {ref} from "vue"
import {useRouter} from "vue-router"

const databaseStore = useDatabaseStore();
databaseStore.getUrls()
const url = ref('')
const router = useRouter()

const handleSubmit = () => {
     // se valida el url, coon una libreria
     databaseStore.addUrl(url.value);
}
</script>