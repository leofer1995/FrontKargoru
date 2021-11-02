import { City }  from 'country-state-city';
import { useEffect, useState } from "react";


const useGetCities = (countryCode,stateCode) => {

    const [cities, setCities] = useState([]);

    useEffect(() => {

        setCities(City.getCitiesOfState(countryCode,stateCode));
    
    },[stateCode, countryCode]);

    return cities;
}

export default useGetCities;