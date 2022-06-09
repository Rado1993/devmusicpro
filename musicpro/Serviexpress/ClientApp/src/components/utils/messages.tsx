import Swal from 'sweetalert2'

export const DeleteConfirm = (mensaje: string) => {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: '¿Esta seguro de la eliminación?',
            text: mensaje,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result: any) => {
            resolve(result.isConfirmed);
        })
    });
}

export const SuccessMessage = (mensaje: string) => {
    Swal.fire({
        title: 'Operación exitosa',
        text: mensaje,
        icon: 'success',        
        confirmButtonColor: '#3085d6',
    });
}


export const ErrorMessage = (title: string, mensaje: string) => {
    Swal.fire({
        title: title,
        text: mensaje,
        icon: 'info',        
        confirmButtonColor: '#3085d6',
    });
}

export const errorReglas = (mensaje: string, form:any, onSubmit:any) => {
    Swal.fire({
        title: 'Error en reglas de envio',
        text: mensaje,
        icon: 'info',
        confirmButtonColor: '#3085d6',
    }).then((result: any) => {
        if (result.isConfirmed) {
            onSubmit(form.getValues())
        }
    })
}

export const CorreoMessage = (opc:any,mensaje: string, form:any,onSubmit:any) => {
    Swal.fire({
        title: opc ? 'Se envia correo masivo a:':'Se envia correo masivo a:',
        text: mensaje,
        icon: 'info',
        confirmButtonColor: '#3085d6',
    }).then((result: any) => {
        if (result.isConfirmed) {
          onSubmit(form.getValues())
        }
    })
}

