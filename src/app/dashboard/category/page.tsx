import styles from './styles.module.scss'

import { redirect } from 'next/navigation';

import { Button } from '@/app/dashboard/components/button';

import { api } from '@/services/api';
import { getCookiesSever } from '@/lib/cookieServer';

export default function Category() {
    async function handleRegistroCategory(formData: FormData) {
        "use server"

        const name = formData.get("name")
        
        if(name === ""){
            return;
        } 

        const data = {
            name
        }

        const token = getCookiesSever();

        await api.post("/category", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }) 
        .catch((error) => {
            console.log(error);
            return;
        })

        redirect("/dashboard")
    }

    return (
    <main className={styles.container}>
            <h1>Nova Categorria</h1>

            <form className={styles.form} action={handleRegistroCategory}>
                <input 
                    type="text" 
                    name='name'
                    placeholder='Nome da Categoria, ex: Pizza'
                    required
                    className={styles.input}
                />

                <Button
                    name='Cadastrar'
                />
            </form>
    </main>
    );
}