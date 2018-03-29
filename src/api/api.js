import axios from 'axios'

const api ={}
api.myGet =(url, params) => {
    let apiUrl = "http://jsonplaceholder.typicode.com/"
    let _url = apiUrl + url
    return new Promise((resolve, reject) => {
        axios.get(_url, {params})
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (err) {
                reject(err)
            })
        })
}

api.myPost = (url, params) => {
    let apiUrl = "http://jsonplaceholder.typicode.com/"
  let _url = apiUrl + url
    return new Promise((resolve, reject) => {
        axios.post(_url, {params})
        .then(function (response) {
            resolve(response.data)
        })
        .catch(function (err) {
            reject(err)
        })
    })
}
export default api;







