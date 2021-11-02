
import { useState } from 'react';
import axios from 'axios'
import { Country, State }  from 'country-state-city';
import useGetCities from '../hooks/useGetCities';
import useGetCoutries from '../hooks/useGetCountries';
import useGetStates from '../hooks/useGetStates';
import {validate} from '../functions/validate'
import styles from './styles/FormClient.module.css'


const FormClient = () => {

    const [errors, setErrors] = useState({});//estado de errores
    const [inputs, setInputs] = useState({
        name:'',
        cedula:'',
        country:'',
        city:'',
        state:'',
        address:'',
        phone:'',
        email:''
    });//inputs formulario
    
    const [countryCode, setCountryCode] = useState('');//codigo del pais seleccionado
    const [stateCode, setStateCode] = useState('');//codigo del estado seleccionado

    const countries = useGetCoutries();//costom hook, trae lista de paises
    let states = useGetStates(countryCode);//coustom hook, trae lista de estados por pais
    let cities = useGetCities(countryCode,stateCode);//custom hook, trae lista de ciudades por estado

    const handleChangeCountry = (e) => {   
        setCountryCode(e.target.value);
        setInputs({//actualizo inputs
            ...inputs,
            country:Country.getCountryByCode(e.target.value).name,
            state:'',
            city:'',
        });   
        
        setErrors(validate({//actualizo errores
            ...inputs,
            country:Country.getCountryByCode(e.target.value).name,
            state:'',
            city:'',
        }));
    }

    const handleChangeState = (e) => {
        setStateCode(e.target.value);
        setInputs({//actualizo inputs
            ...inputs,
            state:State.getStateByCodeAndCountry(e.target.value, countryCode).name,
            city:'',
        });    
        
        setErrors(validate({//actualizo errores
            ...inputs,
            state:State.getStateByCodeAndCountry(e.target.value, countryCode).name,
            city:'',
        }));
    }

    const handleInputChange = (e) => {
        setInputs({//actualizo inputs
            ...inputs,
            [e.target.name]:e.target.value,
        });

        setErrors(validate({//actualizo errores
            ...inputs,
            [e.target.name]:e.target.value,
        }));
    }

    const handleSubmit = async (e) => {//submit form
        e.preventDefault();
        setErrors(validate(inputs));
        
        if(!Object.values(errors).length){//si no existen errores
            try{

                const post = await axios.post('http://localhost:3001/clients', inputs);
                if(post.data.error){
                    alert('ha ocurrido un error, intentalo mas tarde');
                }else if (!post.data.created){ 
                    alert('Ya existe cliente con numero de cedula');
                }else{
                    alert('El cliente ha sido creado con exito');
                }

            }catch(err){

                alert('ha ocurrido un error, intentalo mas tarde');

            }
        }else{//si existen errores

            alert('Ingrese todos los campos correctamente');

        }
    }

    return(
        
        <form className={styles.container} onSubmit={handleSubmit}>
            <h1>Nuevo Cliente</h1>
            {/**input name */}
            <label className={styles.rowText}>
                Nombre
                <input 
                    type='text' 
                    name='name'
                    value={inputs.name}
                    onChange={handleInputChange}
                    placeholder="Fulanito Perez" 
                />
            </label>
            {errors.name && <span className={styles.errors}>* {errors.name}</span>}

            {/**input cedula */}
            <label className={styles.rowText}>
                Identificación
                <input 
                    type='text'
                    name='cedula' 
                    value={inputs.cedula}
                    onChange={handleInputChange}
                    placeholder="10258889966" 
                />
            </label>
            {errors.cedula && <span className={styles.errors}>* {errors.cedula}</span>}

            {/**input pais */}
            <label className={styles.rowSelect}>
                País
                <select onChange={handleChangeCountry} name="country">
                    <option disabled selected={true}>Seleccione</option>
                    {countries.map(country =>                       
                        <option key={country.isoCode} label={country.name} value={country.isoCode}></option>
                    )}
                </select>
            </label>
            {errors.country && <span className={styles.errors}>* {errors.country}</span>}

            {/**input state */}
            {states.length?
                <>
                    <label className={styles.rowSelect}>
                    Estado
                        <select onChange={handleChangeState} name="state" >
                        <option disabled selected={true}>Seleccione</option>
                            {states.map(state =>
                                <option key={state.isoCode} label={state.name} value={state.isoCode}></option>
                            )}
                        </select>
                    </label>
                    {errors.state && <span className={styles.errors}>* {errors.state}</span>}
                </>
                :null
            }
            
            {/**input ciudad */}
            {cities.length?
            <>
                <label className={styles.rowSelect}>
                Ciudad
                    <select  name="city" onChange={handleInputChange}>
                    <option disabled selected={true}>Seleccione</option>
                        {cities.map((city,i) =>
                            <option key={city.name + i} label={city.name} value={city.name}></option>
                        )}
                    </select>
                </label>
                {errors.city && <span className={styles.errors}>* {errors.city}</span>}
            </>:null
            }
            
            {/**input direccion */}
            <label className={styles.rowText}>
                Dirección
                <input 
                    type='text'
                    name='address' 
                    value={inputs.address}
                    onChange={handleInputChange}
                    placeholder="Avenida siempre viva 123" 
                />
            </label>
            {errors.address && <span className={styles.errors}>* {errors.address}</span>}

            {/**input telefono */}
            <label className={styles.rowText}>
                Telefono
                <input 
                    type='text'
                    name='phone'
                    value={inputs.phone}
                    onChange={handleInputChange} 
                    placeholder="3123111518" 
                />
            </label>
            {errors.phone && <span className={styles.errors}>* {errors.phone}</span>}

            {/**input email */}
            <label className={styles.rowText}>
                Email
                <input 
                    type="email" 
                    name='email'
                    value={inputs.email}
                    onChange={handleInputChange}
                    placeholder="correo@mail.com" 
                />
            </label>
            {errors.email && <span className={styles.errors}>* {errors.email}</span>}

            <input 
                className={styles.submit}
                type="submit"                      
            />
        </form>
    
    )

}

export default FormClient;