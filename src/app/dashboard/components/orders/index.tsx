"use client"

import styles from './styles.module.scss'

import { OrderProps } from '@/lib/order.type';
import { Modalorder } from '@/app/dashboard/components/modal';

import { use } from 'react';
import { OrderContext } from '@/providers/order';
import { useRouter } from 'next/navigation';

import { RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface Props{
    orders: OrderProps[]
}

export default function Orders({ orders }: Props) {

    const router = useRouter();

    const { isOpen, onRequestOpen } = use(OrderContext);

    async function handleDatailOrder(order_id: string){
        await onRequestOpen(order_id);
    }
    
    function handleRefresh(){
        router.refresh();
        toast.success("Pedidos Atualizados")
    }

    return (
        <>
            <main className={styles.cotainer}>
                    <section className={styles.cotainerHeader}>
                        <h1>Últimos Pedidos</h1>
                        <button 
                            className={styles.button}
                            onClick={handleRefresh}
                        >
                            <RefreshCw
                                size={24}
                                color='#3fffa3'
                            />
                        </button>
                    </section>
                    <section className={styles.listOrders}>

                        {orders.length === 0 && (
                            <span className={styles.listOrdersNull}>
                                Nenhum pedido aberto no momento
                            </span>
                        )}

                        {orders.map( order => (
                            <button 
                                key={order.id} 
                                className={styles.orderItem}
                                onClick={ () => handleDatailOrder(order.id) }
                            >
                                <div className={styles.tag}></div>
                                <span>Mesa {order.table}</span>
                            </button>
                        ))}
                    </section>
            </main>

            { isOpen && <Modalorder/> }
    </>
    );
}