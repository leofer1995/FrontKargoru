import { connect } from "react-redux"
import { deleteQuotation, editQuotation } from "../actions";
import SearchClient from "./SearchClient"
import styles from './styles/SearchQuotations.module.css';
import {Link} from 'react-router-dom'

const SearchQuotations = ({client, deleteQuotation, editQuotation}) => {

    const handleEdit = (id) => {
        editQuotation(id)
    }

    const handleDelete = (id) => {
        deleteQuotation(id)
    }

    return(
        <div className={styles.container}>
            <SearchClient type='searchquotation'/>
            <div className={styles.quotations}>
                {client.quotations?.map(quotation => 
                    <div key={quotation.id} className={styles.quotation}>
                        <span>{client.name} </span>
                        <span>{quotation.createdAt.substring(0,10)} </span>
                        <span>Total:${quotation.total}</span>
                        <div className={styles.btnContainer}>
                            <Link to='/quotation'>
                                <button onClick={()=>handleEdit(quotation.id)} className={styles.btnEdit}></button>
                            </Link>
                            <button onClick={()=>handleDelete(quotation.id)} className={styles.btnDelete}></button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        client:state.client,
    }
}

export default connect(mapStateToProps,{deleteQuotation, editQuotation})(SearchQuotations)