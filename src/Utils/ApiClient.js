import { AsyncStorage } from "react-native";
export const URL = "http://172.20.10.7:8080/api/";
export const GETFOODS = URL + "Foods/GetAllFoods/";

export default class ApiClient {


    static fetchFoods = async () =>{

        var response = await fetch(GETFOODS, {
            method: "GET"
        });
        if (response.status >= 200 && response.status < 300) {
            console.log("response-ul e bun")
            var jsonRes = await response.json();
            await AsyncStorage.setItem("foods", JSON.stringify(jsonRes));
    
        }
        else{
            console.log("response nu e ok")
        }
        return jsonRes;
    }
/*
    static getFoods = () =>{
        return fetch(GETFOODS)
        .then(function(response){
          return response.json();
        })
        .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
         // ADD THIS THROW error
          throw error;
        });
    }*/

}