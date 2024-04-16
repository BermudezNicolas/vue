<template>
    <div>
        <h1>Edit Doc</h1>
        <h2>{{ url }}</h2>
        <p v-if=databaseStore.loadingDocs>Loading Document...</p>
        <form v-else @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese url" v-model="url">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router' 
import { ref, onMounted } from 'vue'
import { useDatabaseStore } from '../stores/database'

const route = useRoute()
const url = ref('')
const databaseStore = useDatabaseStore()

onMounted(async () => {
    url.value = await databaseStore.readUrl(route.params.id)
})

const handleSubmit = () => {
    // Aquí puedes agregar la lógica para actualizar la URL en la base de datos si es necesario
    databaseStore.updateUrl(route.params.id, url.value)
}
</script>