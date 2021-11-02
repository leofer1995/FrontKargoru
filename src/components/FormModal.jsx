
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postConcept, renderModal, updateConcept } from "../actions";
import styles from './styles/FormModal.module.css';


const FormModal = ({postConcept, quotation,renderModal, client, concept, updateConcept}) => {
    const [inputs, setInputs] = useState({
        origin: concept ? concept.origin:'',
        destiny:concept ?concept.destiny:'',
        description:concept ?concept.description:'',
        price:concept ?concept.price:'',
        quotation_id:concept ?concept.quotationId:''
    });

    useEffect(()=> {
        setInputs((inputs)=>{
            return{
            ...inputs,
            quotation_id:quotation.id,
            client_id:client.id,
            }
        })
    },[quotation, client]);

    const handleInputChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpdate = () => {
        updateConcept(inputs, concept.id)
        renderModal()
    }

    const handleSubmit = () => {
        postConcept(inputs);
        renderModal()
    }

    return(
        <>
            <h1>Agregar Concepto</h1>
            <div className={styles.points}>
                <div className={styles.point}>
                    <label>
                        Origen
                        <input 
                            type="text" 
                            name='origin'
                            value={inputs.origin}
                            onChange={handleInputChange}
                            placeholder='origen'
                        />
                    </label>
                </div>
                <div className={styles.point}>
                    <label>
                        Destino
                        <input 
                            type="text"
                            name='destiny'
                            value={inputs.destiny}
                            onChange={handleInputChange}
                            placeholder='destino' 
                        />
                    </label>
                </div>
            </div>
            <div className={styles.contInputs}>
                <h3>Descripción</h3>
                <textarea
                    name='description'
                    value={inputs.description}  
                    onChange={handleInputChange}  
                />
                <label>
                    Precio:
                    <input 
                        type="number" 
                        name='price'
                        value={inputs.price}
                        placeholder='Precio'
                        onChange={handleInputChange}  
                    />
                </label>
                {concept ? 
                <button onClick={handleUpdate}>Actualizar</button>:
                <button onClick={handleSubmit}>Agregar</button>}
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return{
        quotation:state.quotation,
        client:state.client,
    }
}
export default connect(mapStateToProps,{postConcept, renderModal, updateConcept})(FormModal);