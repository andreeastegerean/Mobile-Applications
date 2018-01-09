import { AsyncStorage } from "react-native";
export const URL = "http://192.168.100.28:8080/api/v1/";
export const GETFOODS = URL + "Foods/GetAllFoods/";
export const GETFOODS_USER = URL + "Foods/GetFoodsForUser/"
export const ADD_FOOD_URL = URL + "Foods/CreateFood";
export const UPDATE_FOOD_URL = URL + "Foods/UpdateFood/"
export const DELETE_FOOD_URL = URL + "Foods/DeleteFood/"
export const REGISTER_URL = URL + "Users/Register"
export const LOGIN_URL = URL + "Users/Login"

export default class ApiClient {


  static fetchFoods = async () => {

    var response = await fetch(GETFOODS, {
      method: "GET"
    });
    if (response.status >= 200 && response.status < 300) {
      console.log("response-ul e bun")
      var jsonRes = await response.json();
    }
    else {
      console.log("response-ul nu e ok")
    }
    return jsonRes;
  }


  static fetchFoodsForUser = async (userId) => {

    var response = await fetch(GETFOODS_USER+userId.toString(), {
      method: "GET"
    });
    if (response.status >= 200 && response.status < 300) {
      var jsonRes = await response.json();
    }
    else {
      console.log("response-ul nu e ok")
    }
    return jsonRes;
  }


  static addFood = async (name, kcal, quantity) => {
    var userid = 18
    var n1 = name;
    var n2 = parseInt(kcal);
    var n3 = parseInt(quantity);
    console.log(n1 + n2 + n3);
    var params = {
      Name: n1,
      Kcal: n2,
      Quantity: n3,
      UserId: userid
    };
    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody);

    var response = await fetch(ADD_FOOD_URL, {
      method: "POST",
      body: formBody,
      headers: { "Content-Type": 'application/x-www-form-urlencoded' }
    });

    if (response.status >= 200 && response.status < 300) {
      var jsonRes = await response.json();
      if (jsonRes) {
        console.log(jsonRes.food);
      } else {
        console.log("jsonRes does not exist")
      }
    } else {
      console.log("Statusul de la response este " + response.status);
      console.log("Error response status not between [220,300)");
    }
  }


  static updateFood = async (foodId, name, kcal, quantity) => {
    var userId = 1
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

    var response = await fetch(UPDATE_FOOD_URL + foodId.toString(), {
      method: "PUT",
      body: formBody,
      headers: { "Content-Type": 'application/x-www-form-urlencoded' }
    });

    if (response.status >= 200 && response.status < 300) {
      var jsonRes = await response.json();
      console.log(jsonRes);
    } else {
      console.log(response.status);
    }
  }

  static deleteFood = async id => {

    var token = await AsyncStorage.getItem("token");

    var response = await fetch(DELETE_FOOD_URL + id, {
      method: "DELETE"
    });

    if (response.status >= 200 && response.status < 300) {
      var jsonRes = await response.json();
      if (jsonRes.Success === true) {
        return { Success: true };
      }
    }
    return { Success: false };
  };

  static async register(fullname, email, username, password, role) {
    var params = {
      fullname: fullname,
      email: email,
      username: username,
      password: password,
      role: role
    };
    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };

    var response = await fetch(REGISTER_URL, {
      method: "POST",
      headers: headers,
      body: formBody
    });

    if (response.status >= 200 && response.status < 300) {
      var jsonRes = await response.json();
      if (jsonRes.ok == true) {
        return "OK";
      } else {
        return jsonRes.message;
      }
    } else {
      return "Something went wrong ans user cannot be registered";
    }
  }

  static async login(username, password) {
    var params = {
      username: username,
      password: password
    };
    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    console.log(formBody.toString())
    var headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    var request = {
      method: "POST",
      headers: headers,
      body: formBody
    };
    var response = await fetch(LOGIN_URL, request);
    console.log(response.toString())

    if (response.status >= 200 && response.status < 300) {
      console.log("response status code = 200");
    } else if (response.status === 401) {
      return "Username or password not correct";
    } else {
      return "Something went wrong!";
    }

    var jsonRes = await response.json();
    var id = jsonRes.Id;
    var username = jsonRes.Username;
    var role = jsonRes.Role;
    
    await AsyncStorage.setItem("userId", String(id));
    await AsyncStorage.setItem("username", String(username));
    await AsyncStorage.setItem("userRole", String(role));

    
    console.log("The user role fetched is "+role.toString()+" !!!!")

    return "OK";
  }

}