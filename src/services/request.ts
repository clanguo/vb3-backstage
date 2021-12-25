import axios from "axios";

const request = axios.create();

request.interceptors.response.use(response => response.data);

export default request;