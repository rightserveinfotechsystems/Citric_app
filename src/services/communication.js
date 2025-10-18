import axios from "axios";
import { Alert } from "react-native";


// const serverUrl = "http://192.168.0.121:3017"
const serverUrl = "https://citricbackend.rsinfotechsys.com"


export const communication = {

    submitForm: async function (dataToSend) {
        try {
            return axios.post(`${serverUrl}/application/createIncubationForm`, dataToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    },
    getAllAnnouncement: async () => {
        try {
            return axios.get(`${serverUrl}/application/getAnnouncementList`, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
        } catch (error) {
            Alert.alert(error.message);
        }
    },
}