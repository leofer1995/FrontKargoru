
import { connect } from "react-redux"
import { deleteConcept, renderModal } from "../actions"
import styles from './styles/Concepts.module.css'

const Concepts = ({concepts, renderModal, deleteConcept}) => {

    const handleDescription = (description) => {      
        renderModal('description', description)
    }

    const handleDelete = (concept) => {
        deleteConcept(concept)
    }

    const handleEdit = (concept) => {
        renderModal('formUpdate',concept)
    }

    return(
        <>
            {concepts.map(concept => 
                <div className={styles.container} key={concept.id}>
                    <div>{concept.origin}➡{concept.destiny}</div>
                    <div onClick={()=>handleDescription(concept.description)}>
                        Descripción
                    </div>
                    <div>Total: ${concept.price}</div>
                    <div className={styles.btnContainer}>
                        <button  onClick={()=>handleEdit(concept)} className={styles.btnEdit}></button>
                        <button  onClick={()=>handleDelete(concept)} className={styles.btnDelete}></button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        concepts: state.concepts
    }
}

export default connect(mapStateToProps, {renderModal, deleteConcept})(Concepts)