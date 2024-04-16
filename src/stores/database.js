import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { db } from "../main";
import { auth} from "../main"
import { nanoid } from "nanoid";
import router from "../router";
export const useDatabaseStore = defineStore('database', {
    state: () => ({     // ({}) -> retorna un objeto, {} -> empieza la logica de una funcion y usa el return normal 
        documents: [],
        loadingDocs: false

    }),
    actions: {
        
        async getUrls(){
            if(this.documents.length != 0){
                return;
            }
            this.loadingDocs = true;
            try {
              const q = query(collection(db,'urls'), where("user", "==", auth.currentUser.uid));
              const querySnapshot =  await getDocs(q);
              querySnapshot.forEach(doc => {
                console.log(doc.id, doc.data());
                this.documents.push({
                    id:doc.id,
                    ...doc.data()
                });
              })
            } catch (error) {
                console.log(error);
            }
            finally{
                this.loadingDocs = false;

            }
        },

        async addUrl(name){
           try {
             const newDoc = {
                 name,
                 short: nanoid(6), // devuelve string aleatorio de 6 caracteres
                 user: auth.currentUser.uid

             }
             const docRef = await addDoc(collection(db,"urls"), newDoc )
             console.log(docRef)
             this.documents.push({
               id: docRef.id,
               ...newDoc
             })
           } catch (error) {
              console.log(error);
           } finally{

           }
        },

        async readUrl(docId){
           try {
            this.loadingDocs = true
            const docRef = doc(db,"urls", docId);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
              throw new Error("no existe ese documento")
            }
            if(docSnap.data().user !== auth.currentUser.uid){
              throw new Error("ese documento no le pertenece")
            }
            console.log(docSnap.data().name)
            return docSnap.data().name
           } catch (error) {
             console.log(Error.message)
           }
           finally{
            this.loadingDocs = false
           }
        },

        async updateUrl(docId, name){
          try {
            this.loadingDocs = true
            const docRef = doc(db,"urls", docId);  // Hago referencia al doc de DOCID
            const docSnap = await getDoc(docRef);  // Me traigo el documento
            if(!docSnap.exists()){                // si no existe
              throw new Error("no existe ese documento")
            }
            if(docSnap.data().user !== auth.currentUser.uid){ // si el user del documento (uid) no es la del usuario actual o auntenticado
              throw new Error("ese documento no le pertenece")
            }
            await updateDoc(docRef, { // update del doc
              name
            })

            this.documents = this.documents.map((item) => item.id === docId ? {...item, name: name} : item) // Mapea todos los documentos (urls) si es el que busco lo modifica (destructuracion del objeto y update) sino me quedo con lo mismo
            router.push("/")          
          } catch (error) {
            console.log(error.message)
          }
          finally{
            this.loadingDocs = false

          }
        },

        async deleteUrl(docId){
          try {
            const docRef = doc(db,"urls", docId);
            const docSnap = await getDoc(docRef);
            if(!docSnap.exists()){
              throw new Error("no existe ese documento")
            }
            if(docSnap.data().user !== auth.currentUser.uid){
              throw new Error("ese documento no le pertenece")
            }
            await deleteDoc(docRef)
            this.documents = this.documents.filter(item => item.id !== docId)
          } catch (error) {
            console.log(error.message)
          }
          finally {
            
          }
        }
    }
})