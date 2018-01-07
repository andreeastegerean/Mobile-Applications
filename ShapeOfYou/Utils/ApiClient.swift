//
//  ApiClient.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 01/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
import Alamofire
import SwiftyJSON
public class ApiClient: NSObject{
    var URL : String = "http://192.168.100.28:8080/api/v1/"
    func register(Fullname: String, Email: String, Username: String, Password: String,Role: Int, completion: @escaping (Bool, String, String, Int)-> Void){
        let parameters: Parameters = [ "Fullname": Fullname,
                                       "Email": Email,
                                       "Username": Username,
                                       "Password": Password,
                                       "Role": Role
                                       ]
        Alamofire.request(URL+"Users/Register",method:.post,parameters:parameters).validate().responseJSON{
            (response) in
            switch response.result{
            case.success(let value):
                let json = JSON(value)
                let Success = json["Success"].boolValue
                if Success{
                    let Username = json["Username"].stringValue
                    let UserId = json["Id"].intValue
                    completion(Success,"",Username,UserId)
                }
                else{
                    let message = json["Message"].stringValue
                    completion(false,message,"",0)
                }
            case .failure(let error):
                print(error.localizedDescription)
                completion(false,"Server error","",0)
            }
            
        }
    }
    
    func login(Username: String, Password: String , completion: @escaping (Bool, String, String, Int,Int)-> Void){
        let parameters: Parameters = [
        "Username": Username,
        "Password": Password,
        ]
        Alamofire.request(URL+"Users/Login",method:.post,parameters:parameters).validate().responseJSON{
            (response) in
            switch response.result{
            case .success(let value):
                let json = JSON(value)
                let Success = json["Success"].boolValue
                if Success{
                    let json = JSON(value);
                    let Username = json["Username"].stringValue
                    let UserId = json["Id"].intValue
                    let userRole = json["Role"].intValue
                    print(userRole)
                    completion(Success,"",Username,UserId,userRole)
                }
                else{
                    let Message = json["Message"].stringValue
                    completion(false,Message,"",0,0)
                }

            case .failure(_):
                print("aaa")
            }
            
        }
    }
    
    func fetchFoods(completion: @escaping ([Food]?)->Void)
    {
        Alamofire.request(URL+"Foods/GetAllFoods").validate()
            .responseJSON { (response) in
                switch response.result{
                case .success(let value):
                    let json = JSON(value)
                    var foods = Array<Food>()
                    for(_,subJson):(String,JSON) in json
                    {
                        let Id = subJson["Id"].intValue
                        let Name = subJson["Name"].stringValue
                        let Kcal =  subJson["Kcal"].intValue
                        let Quantity = subJson["Quantity"].intValue
                        let UserId = subJson["UserId"].intValue
                        foods.append(Food(Id: Id,Name: Name,Kcal: Kcal,Quantity: Quantity,UserId: UserId))
                    }
                    completion(foods)
                case .failure( _):
                    completion(nil)
                }
        }
    }
    
    func fetchFoodsForUser(ID: Int,completion: @escaping ([Food]?)->Void){
        Alamofire.request(URL+"Foods/GetFoodsForUser/"+String(ID)).validate()
            .responseJSON { (response) in
                switch response.result{
                case .success(let value):
                    let json = JSON(value)
                    var foods = Array<Food>()
                    for(_,subJson):(String,JSON) in json
                    {
                        let Id = subJson["Id"].intValue
                        let Name = subJson["Name"].stringValue
                        let Kcal =  subJson["Kcal"].intValue
                        let Quantity = subJson["Quantity"].intValue
                        let UserId = subJson["UserId"].intValue
                        foods.append(Food(Id: Id,Name: Name,Kcal: Kcal,Quantity: Quantity,UserId: UserId))
                    }
                    completion(foods)
                case .failure( _):
                    completion(nil)
                }
        }
    }
    
    func updateFood(ID: Int,Name: String,Kcal: Int, Quantity: Int,UserId: Int,completion: @escaping (Food?)-> Void){
        let parameters: Parameters = [
            "Id" : String(ID),
            "Name" : Name,
            "Kcal" : Kcal,
            "Quantity" : Quantity,
            "UserId" : String(UserId)
        ]
        Alamofire.request(URL+"Foods/UpdateFood/"+String(ID),method:.put,parameters:parameters).validate().responseJSON{
            (response) in
            switch response.result
            {
            case .success(let value):
                let json = JSON(value)
                let Id = json["Id"].intValue
                let Name = json["Name"].stringValue
                let Kcal =  json["Kcal"].intValue
                let Quantity = json["Quantity"].intValue
                let UserId = json["UserId"].intValue
                completion(Food(Id: Id,Name: Name,Kcal: Kcal,Quantity: Quantity,UserId: UserId))
            case .failure( _):
                completion(nil)
            }
        }
    }
    
    func createFood(Name: String, Kcal: Int, Quantity: Int,UserId: Int,completion: @escaping (Food?)-> Void){
        let parameters: Parameters = [
            "Name" : Name,
            "Kcal": Kcal,
            "Quantity": Quantity,
            "UserId": UserId
        ]
        Alamofire.request(URL+"Foods/CreateFood",method:.post,parameters:parameters).validate().responseJSON{
            (response) in
            switch response.result
            {
            case .success(let value):
                let json = JSON(value)
                let Id=json["Id"].intValue
                let Name = json["Name"].stringValue
                let Kcal =  json["Kcal"].intValue
                let Quantity = json["Quantity"].intValue
                let UserId = json["UserId"].intValue
                completion(Food(Id: Id,Name: Name,Kcal: Kcal,Quantity: Quantity,UserId: UserId))
            case .failure( _):
                completion(nil)
            }
        }
    }
    
    func deleteFood(ID:Int,completion: @escaping (Bool)-> Void){
        let parameters: Parameters=[
            "Id" : ID
        ]
        Alamofire.request(URL+"Foods/DeleteFood/"+String(ID),method:.delete,parameters:parameters).validate().responseJSON{
            (response) in
            switch response.result{
            case .success(let value):
                let json = JSON(value)
                let Success = json["Success"].boolValue
                completion(Success)
            case .failure(_):
                completion(false)
            }
        }
    }
    
    
}
