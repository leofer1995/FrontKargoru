import ReactDOM from "react-dom";
import { connect } from "react-redux";
import FormModal from "./FormModal";

import styles from './styles/Modal.module.css';

const Modal = ({modal, concepts}) => {
    console.log(modal,'esteeeeeee')
    return ReactDOM.createPortal(
        <div className={styles.container}>
            <div className={styles.modalCont}>
                <div className={styles.contBtn}>
                    <button className={styles.x} ></button>
                </div>
                {modal.type === 'formConcept' && <FormModal />}
                {modal.type === 'formUpdate' && <FormModal concept={modal.info}/>}
                {modal.type === 'description' && 
                    <div className={styles.containerDescription}>
                        {modal.info}
                    </div>
                }
                
            </div>           
        </div>,
        document.getElementById('modal')
    )  
}
const mapStateToProps = (state) => {
    return{
        modal:state.modal,
        concepts:state.concepts
    }
}
export default connect(mapStateToProps) (Modal);