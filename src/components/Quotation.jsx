import { postQuotation, renderModal, resetStore, updateQuotation } from "../actions";
import SearchClient from "./SearchClient";
import styles from './styles/Quotation.module.css'
import { connect } from 'react-redux';
import Concepts from "./Concepts";
import { useEffect, useState } from "react";


const Quotation = ({renderModal, postQuotation, client, quotation, concepts, resetStore, updateQuotation}) => {

    const [total, setTotal] = useState(0)
    console.log(concepts, 'ueueueueueu')
    useEffect(()=>{
        console.log('entre al use effect')
        let totall = 0
        for(let i = 0 ; concepts.length > i; i++){
            totall += Number(concepts[i].price)
        }
        console.log(totall)
        setTotal(totall)
        updateQuotation({id:quotation.id, total:totall})

    },[concepts,quotation.id,updateQuotation])

    const createdQuotation = () => {
        postQuotation({
            client_id:client.id,
            total:0,
        });
    }

    const handleReset = () => {
        resetStore()
    }

    const handleModal = () => {
        renderModal('formConcept')
    }


    return(
        <div className={styles.container}>
            <SearchClient type='quotation'/>
            {client?.id &&
            <>
                <div className={styles.quotation}>

                    <div className={styles.datesClient}>{/* Datos cliente*/}
                        <div className={styles.dates}>
                            <span>Nombre: {client.name}</span>
                            <span>Cedula: {client.cedula}</span>
                            <span>Pais: {client.country}</span>
                            <span>Ciudad: {client.city}</span>
                        </div>
                        <div className={styles.dates}>

                            <span>Direccion: {client.address}</span>
                            <span>Telefono: {client.phone}</span>
                            <span>Correo: {client.email}</span>
                        </div>                       
                    </div> 

                    <div className={styles.concepts}>
                        {quotation.exist ?
                            <div className={styles.button} onClick={handleModal}>
                                <h1>Agregar Concepto</h1>
                            </div>:
                            <div className={styles.button} onClick={createdQuotation}>
                                <h1>Crear Cotizacion</h1>
                            </div>
                        }
                    </div>
                    <div className={styles.concept}>
                        <Concepts />
                    </div>
                    <div className={styles.total}>
                        <span>TOTAL: ${total}</span>
                    </div>
                </div>
                <button onClick={handleReset} className={styles.btnExit}>Salir</button>
            </>
            }
            
            
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        client:state.client,
        quotation: state.quotation,
        concepts:state.concepts,
        total:state.total,
    }
}

export default connect (mapStateToProps, {renderModal, postQuotation, resetStore, updateQuotation})(Quotation);