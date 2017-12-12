import { AsyncStorage } from "react-native";
export const URL = "http://192.168.100.28:8080/api/";
export const GETFOODS = URL + "Foods/GetAllFoods/";
export const ADD_FOOD_URL = URL + "Foods/CreateFood";
export const UPDATE_FOOD_URL = URL+ "Foods/UpdateFood/"
export const DELETE_FOOD_URL = URL+ "Foods/DeleteFood/"

export default class ApiClient {


     static fetchFoods = async () =>{

        var response = await fetch(GETFOODS, {
            method: "GET"
        });
        if (response.status >= 200 && response.status < 300) {
            console.log("response-ul e bun")
            var jsonRes = await response.json();
        }
        else{
            console.log("response-ul nu e ok")
        }
        return jsonRes;
    }


    static addFood = async (name, kcal,quantity) => {
          var userid = 18
          var params = {
            Name: name,
            Kcal: kcal,
            Quantity: quantity,
            UserId: userid
          };
          var formBody = [];
          for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
    
          var response = await fetch(ADD_FOOD_URL, {
            method: "POST",
            body: formBody
          });
    
          if (response.status >= 200 && response.status < 300) {
            var jsonRes = await response.json();
            if (jsonRes) {
              console.log("response addFood nu e gol")
              console.log(jsonRes.food);
              //return { ok: true, res: jsonRes.food, message: jsonRes.message };
            } else {
              //return { ok: false, res: null, message: jsonRes.message };
              console.log("jsonRes does not exist")
            }
          } else {
            console.log(response.status);
            console.log("am intrat in else la api add");
            //return { ok: false, res: null, message: "Error" };
          }
        }
      

        static updateFood = async (foodId, name, kcal,quantity) => {
            var userId =18
              var params = {
                Id: foodId,
                Name: name,
                Kcal: kcal,
                Quantity: quantity,
                UserId: userId
              };
        
              console.log(params);
              var formBody = [];
              for (var property in params) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(params[property]);
                formBody.push(encodedKey + "=" + encodedValue);
              }
              formBody = formBody.join("&");

              var response = await fetch(UPDATE_FOOD_URL+foodId.toString(), {
                method: "PUT",
                body: formBody
              });
              
              if (response.status >= 200 && response.status < 300) {
                var jsonRes = await response.json();
                console.log(jsonRes);
                //return { ok: true, res: jsonRes };
              } else {
                console.log(response.status);
                //return { ok: false, res: null };
              }
            }
          
}