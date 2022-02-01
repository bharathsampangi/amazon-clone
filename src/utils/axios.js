import axios from "axios"

const instance = axios.create({
    baseURL: 'https://us-central1-clone-b7fcb.cloudfunctions.net/api'
})

export default instance
// 'http://localhost:5001/clone-b7fcb/us-central1/api'