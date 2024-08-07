import { getAxios } from "./services.config"

const getParts = ()=> {
    getAxios().get("/parts")
}