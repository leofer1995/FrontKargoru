
import styles from './styles/Menu.module.css';
import {Link} from 'react-router-dom'
const Menu = () => {

    return(
        <div className={styles.container}>
            <div className={styles.welcome}>{/*contenedor bienvenida*/}
                <h1>BIENVENIDO</h1>
            </div>
            <div className={styles.butons}>{/*contenedor menu*/}
                <Link to='/newclient'>
                    <button>Nuevo Cliente</button>
                </Link>

                <Link to='/quotation'>
                    <button>Crear Cotización</button>
                </Link>

                <Link to='/searchquotation'>
                    <button>Buscar</button>
                </Link>
            </div>
        </div>
    )
}

export default Menu;