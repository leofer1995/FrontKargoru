export const validate = (form) => {

    let errors = {};
    if (!form.name) {//validacion nombre
        errors.name = 'Nombre es requerido';
    }

    if (!form.cedula) {//validacion cedula
        errors.cedula = 'Cedula es requerida';
    }

    if (!form.country) {
        errors.country = 'Pais es requerido';
    }

    if (!form.city) {
        errors.city = 'Ciudad es requerida';
    }

    if (!form.state) {
        errors.state = 'Estado es requerido';
    }

    if (!form.address) {
        errors.address = 'Direccion es requerida'
    }

    if (!form.phone) {
        errors.phone = 'Telefono es requerido'
    }

    if (!form.email) {
        errors.email = 'Email es requerido'
    }else if(!/\S+@\S+\.\S+/.test(form.email)) {
        errors.email = 'Email es invalido';
    }

    return errors;

}
