const initialState = {
    modal:{
        render:false,
        type:'',
        info:'',
    },
    client: {},
    quotation: {
        exist:false
    },
    concepts: [],
    total:0,
    
};

const rootReducer = (state = initialState, action) => {
    if(action.type === 'RENDER_MODAL') {
        return {
            ...state,
            modal:{
                type:action.payload.type,
                render:!state.modal.render,
                info:action.payload.info
                }
        }
    }

    if(action.type === 'GET_CLIENT') {

        return {
            ...state,
            client: action.payload
        }
    }

    if(action.type === 'POST_QUOTATION') {
        return {
            ...state,
            quotation:{
                exist:true,
                ...action.payload.quotation
            }
        }
    }

    if(action.type === 'POST_CONCEPT') {
        return {
            ...state,
            total: state.total + Number(action.payload.concept.price), 
            concepts:[...state.concepts,action.payload.concept]
        }
    }

    if(action.type === 'DELETE_CONCEPT') {
        return {
            ...state,
            concepts: state.concepts.filter(con => con.id !==action.payload.id)
        }
    }

    if(action.type === 'UPDATE_CONCEPT') {
        let copy = [...state.concepts]
        let update = state.concepts.findIndex(con => con.id === action.payload.id);
        console.log(update)
        copy[update] = action.payload
        return {
            ...state,
            concepts:copy,
        }
    }

    if(action.type === 'UPDATE_QUOTATION') {
        return {
            ...state,
            quotation:{
                ...state.quotation,
                total:state.total,
            }
        }
    }

    if(action.type === 'DELETE_QUOTATION') {

        const update = state.client.quotations.filter((quo)=>quo.id !== action.payload);
        return{
            ...state,
            client: {
                        ...state.client,
                        quotations:update,
                    }
        }
    }

    if(action.type === 'EDIT_QUOTATION') {
        return{
            ...state,
            quotation:{
                exist:true,
                ...action.payload
            },
            concepts:[...action.payload.concepts]

        }
    }

    if(action.type === 'RESET') {
        return{  
            ...state,         
            modal:{
                render:false,
                type:'',
                info:'',
            },
            client: {},
            quotation: {
                exist:false
            },
            concepts: [],
            total:0,            
        }
    }

    return state;

};

export default rootReducer;