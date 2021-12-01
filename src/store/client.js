import axios from "axios";

export default axios.create({
    baseURL: APIMAP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
