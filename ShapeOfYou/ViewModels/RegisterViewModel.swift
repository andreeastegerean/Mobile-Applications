//
//  RegisterViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 01/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation

public class RegisterViewModel: NSObject {
    @IBOutlet var apiClient: ApiClient!
    
    var Success: Bool?
    var Message: String?
    var Username: String?
    var Id: Int?
    
    func registerUser(fullname: String, email: String, username: String , password: String, completion: @escaping (Bool)-> Void){
        apiClient.register(Fullname: fullname, Email: email, Username: username, Password: password){
            (success, message,username,id) in
            DispatchQueue.main.async {
                self.Username = username;
                self.Message = message;
                self.Id = id;
                completion(success)
            }
        }
    }
    
}
