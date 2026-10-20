
export const errorMessageMapperAuth = (error: number) => {
    switch (error) {
        case 0:
            return "Ocurrió un error de conexión";
        case 400:
            return "Bad Request";
        case 401:
            return "Contraseña incorrecta";
        case 403:
            return "Forbidden";
        case 404:
            return "Este usuario no está registrado";
        case 409:
            return "Este email ya está en uso";
        case 422:
            return "Unprocessable Entity";
        case 429:
            return "Too Many Requests";
        case 500:
            return "Internal Server Error";
        case 502:
            return "Bad Gateway";
        case 500:
            return "Internal Server Error";
    }
    return "Unknown Error";
}