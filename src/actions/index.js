import axios from 'axios';


export const renderModal = (type, info) => {
    return {
        type: 'RENDER_MODAL',
        payload: {type, info}
    }
}

export const getClient = (cedula) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/clients/${cedula}`);

        dispatch({
            type:'GET_CLIENT',
            payload:response.data,
        });
    }
}

export const postQuotation = (quotation) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/quotation', quotation);
        dispatch({
            type:'POST_QUOTATION',
            payload:response.data,
        });
    }
}

export const postConcept = (concept) => {
    return async function (dispatch) {
        const response = await axios.post('http://localhost:3001/concept', concept);
        dispatch({
            type:'POST_CONCEPT',
            payload:response.data,
        });
    }    
}

export const deleteConcept = (concept) => {
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/concept/delete/${concept.id}`);
        dispatch({
            type:'DELETE_CONCEPT',
            payload:concept,
        });
    }
}

export const updateConcept = (concept, id) => {
    return async function (dispatch) {
        await axios.put(`http://localhost:3001/concept/update/${id}`, {...concept, id});
        dispatch({
            type:'UPDATE_CONCEPT',
            payload:{...concept,id},
        });
    }
}

export const updateQuotation = (quotation) => {
    return async function (dispatch) {
        await axios.put(`http://localhost:3001/quotation/update/${quotation.id}`, quotation);
        dispatch({
            type:'UPDATE_QUOTATION',
            payload:quotation,
        });
    }
}

export const deleteQuotation = (id) => {
    console.log(id)
    return async function (dispatch) {
        await axios.delete(`http://localhost:3001/quotation/delete/${id}`)
        dispatch({
            type:'DELETE_QUOTATION',
            payload: id,
        })
    }
}

export const editQuotation = (id) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/quotation/${id}`);
        console.log(response.data,'la respuesta oficial')
        dispatch({
            type:'EDIT_QUOTATION',
            payload: response.data,
        })
    }
}



export const resetStore = () => {
    return {
        type:'RESET',
    }
}






