import { Country }  from 'country-state-city';
import { useEffect, useState } from "react"


const useGetCoutries = () => {

    const [countries, setCountries] = useState([]);

    useEffect(()=>{
        setCountries(Country.getAllCountries());
    },[]);

    return countries;

}

export default useGetCoutries;