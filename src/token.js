export const getToken = () => {
    if (typeof sessionStorage.getItem('token') !== 'undefined') {
        return sessionStorage.getItem('token')
    } else {
        return ''
    }
}

export const setToken = (token) => {
    if (typeof sessionStorage.getItem('token') !== 'undefined') {
        sessionStorage.setItem('token', token)
        return token
    } else {
        return token
    }
}