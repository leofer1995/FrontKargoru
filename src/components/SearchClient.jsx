import { useState } from "react";
import { getClient } from '../actions';
import { connect } from "react-redux";
import styles from './styles/SearchClient.module.css';

const SearchClient = ({getClient}) => {

    const [cedula, setCedula] = useState('');


    const handleChange = (e) => {
        setCedula(e.target.value)
    }


    const handleSearch = () => {
        getClient(cedula);
    }
    return(
        <div>
            <input 
                type="text"
                placeholder='Cedula' 
                value={cedula}
                onChange={handleChange}
                className={styles.input}
            />
            
            <button onClick={handleSearch} className={styles.btn}>Buscar</button>
        </div>
    )
}

export default connect(null, {getClient})(SearchClient);
