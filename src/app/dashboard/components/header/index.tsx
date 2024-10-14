"use client"

import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

import { LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

import logoImg from '/public/logo-completa-white.png'

import styles from './styles.module.scss'

export function Header() {
    const router = useRouter();

    async function handlreLogout() {
        deleteCookie("session", { path: "/" })

        toast.success("Logout Feito com Sucesso!")

        router.replace('/')
    }

    return (
    <>
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image
                        alt='Logo Don Nápoli Pizzaria'
                        src={logoImg}
                        width={200}
                        height={60}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/category">
                        Categoria
                    </Link>
                    <Link href="/dashboard/product">
                        Produto
                    </Link>

                    <form action={handlreLogout}>
                        <button type='submit'>
                            <LogOutIcon
                                size={24}
                                color="#f2f2f2"
                            />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    </>
    );
}