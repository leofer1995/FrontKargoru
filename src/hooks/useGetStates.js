import { State }  from 'country-state-city';
import { useEffect, useState } from "react";


const useGetStates = (countryCode) => {

    const [states, setStates] = useState([]);

    useEffect(() => {

        setStates(State.getStatesOfCountry(countryCode));
  
    },[countryCode]);

    
    return states;
}

export default useGetStates;