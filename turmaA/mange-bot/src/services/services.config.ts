import axios, {type AxiosResponse} from "axios";

export const getAxios = ()=> {
    const createdAxios = axios.create({
        baseURL: "https://mange-make-bot.azurewebsites.net",
        timeout: 40000, //40 segundos
        headers: {
            "Content-Type": "application/json",
            credentials: "include",
            Authorization: `Bearer meuToken...`
        }
    });

    createdAxios.interceptors.response.use(getAxiosResponse);

    return createdAxios;
}

export const getAxiosResponse = (response: AxiosResponse) =>{
    return response.data;
}

