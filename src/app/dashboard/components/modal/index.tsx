"use cliente"

import styles from './styles.module.scss'

import { use } from 'react'
import { OrderContext } from '@/providers/order';

import { calculateTotalOrder } from '@/lib/helper';

import { X } from 'lucide-react';

export function Modalorder() {
    const { onRequestClose, finishOrder, order } = use(OrderContext);

    async function handleFinishOrder() {
        await finishOrder(order[0].order.id)
    }

    return (
    <dialog className={styles.dialogContainer}>
        <section className={styles.dialogContent}>
            <button className={styles.dialogBack} onClick={onRequestClose}>
                <X
                    size={40}
                    color="#FF3f4b"
                />
            </button>

            <article className={styles.container}>
                <h2>Detalhes do Peido</h2>

                <div className={styles.tableContent}>
                    <span className={styles.table}>
                        Mesa: <b>{order[0].order.table}</b>
                    </span>

                    {order[0].order?.name && (
                        <span className={styles.name}>
                        Nome da Mesa: <b>{order[0].order.name}</b>
                        </span>
                    )}
                </div>

                <div className={styles.itemContainer}>
                    {order && order.map( item => (
                    <section className={styles.item} key={item.id}>
                        <span>
                            Qtd: {item.amount} - <b>{item.product.name}</b> - R${parseFloat(item.product.price) * item.amount}
                        </span>
                        <span className={styles.description}>
                        {item.product.description}
                        </span>
                    </section>  
                    ))} 
                </div>
                
                <h3 className={styles.total}>Valor Total: <b>R${calculateTotalOrder(order)}</b></h3>

                <button className={styles.buttonOrder} onClick={handleFinishOrder}>
                    Concluir pedido
                </button>
            </article>
        </section>
    </dialog>
    );
}