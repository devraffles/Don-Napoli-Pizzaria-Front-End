import style from "./page.module.scss";
import logoimg from '/public/logo-Nome-white.svg'

import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "@/services/api";
import { cookies } from "next/headers";

export default function Page() {

  async function handleLogin(formData: FormData){
    "use server"

    const email = formData.get("email")
    const password = formData.get("password")

    if(email === "" || password === ""){
      return;
    }

    try {
      const response = await api.post("/session", {
        email,
        password
      })

      if(!response.data.token){
        return;
      }

      const expressTime = 60 * 60 * 24 * 30 * 1000
      cookies().set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })


    } catch (error) {
      return;
    }

    redirect("/dashboard")
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
        <form action={handleLogin}>
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
            Acessar
          </button>

          
        </form>
        <Link href="/singup" className={style.text}>
            Não possui uma conta? <br/> Cadastre-se
        </Link>
      </section>
    </div>
   </>
 );
}