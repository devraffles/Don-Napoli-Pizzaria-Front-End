import style from "../page.module.scss";
import logoimg from '/public/logo-Nome-white.svg'

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "@/services/api";

export default function Singup() {

  async function handleRegister(formData: FormData){
    "use server"

    const name = formData.get("name")
    const email = formData.get("email")
    const password = formData.get("password")

    if(name === "" || email === "" || password === ""){
      return;
    }

    try {
      await api.post("/users", {
        name,
        email,
        password
      })
    } catch (error) {
      console.log("erro")
      console.log(error)
    }

    redirect("/")
  }

 return (
   <>
    <div className={style.containerCenter}>
      <Image
        src={logoimg}
        alt="Logo da Pizzaria"
        className={style.logo}
      />

      <section className={style.login}>
        <h1>Criando sua Conta</h1>
        <form action={handleRegister}>
          <input 
            type="text" 
            required
            name="name"
            placeholder="Digite seu nome..."
            className={style.input}
          />

          <input 
            type="email" 
            required
            name="email"
            placeholder="Digite seu email..."
            className={style.input}
          />

          <input 
            type="password" 
            required
            name="password"
            placeholder="*******************"
            className={style.input}
          />

          <button type="submit" className={style.button}>
            Cadastrar
          </button>

          
        </form>
        <Link href="/" className={style.text}>
            Já possui uma conta? Faça o Login
        </Link>
      </section>
    </div>
   </>
 );
}