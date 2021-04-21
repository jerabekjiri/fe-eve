export const get = (key) => {
 return localStorage.getItem(key)
}

export const set = (key, data) => {
    localStorage.setItem(key, data)
}

export const remove = (key) => {
    localStorage.removeItem(key);
}