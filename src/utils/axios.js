import axios from "axios";

export default axios.create({
  baseURL: 'http://192.168.1.64:8090/api/v2'
});