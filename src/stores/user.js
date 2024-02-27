import {defineStore} from 'pinia'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import router from '../router'
export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
    }),

    actions: {
        async registerUser(email, password){
             try{
                this.loadingUser = true;
                const {user} = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user);
                this.userData = {email: user.email, uid: user.uid};
                router.push('/home');
             } catch (error) {
                console.log(error)
             }
             finally{
                this.loadingUser = false;
             }
        },

        async loginUser(email, password){
            try{
               this.loadingUser = true;
               const {user} = await signInWithEmailAndPassword(auth, email, password);
               console.log(user);
               this.userData = {email: user.email, uid: user.uid};
               router.push('/home');
            } catch (error) {
               console.log(error)
            }
            finally{
                this.loadingUser = false;
             }
        },

        async  logoutUser(){
            try{
                await signOut(auth);
                this.userData = null;
                router.push('/login')
            }
            catch(error){
                console.log(error);
            }
            
        },


        currentUser() {
            return new Promise((resolve, reject) => {
                const unsubcribe = onAuthStateChanged(
                    auth,
                    (user) => {
                        if (user) {
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                            };
                        }
                        resolve(user);
                    },
                    (e) => reject(e)
                );
                // Según la documentación, la función onAuthStateChanged() devuelve
                // La función de cancelación de suscripción para el observador
                unsubcribe();
            });
        },
    }
 

        

});



