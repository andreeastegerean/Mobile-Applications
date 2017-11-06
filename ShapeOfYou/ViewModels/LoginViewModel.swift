//
//  LoginViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 03/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
public class LoginViewModel: NSObject{
    @IBOutlet weak var apiClient: ApiClient!
    var Success: Bool?
    var Message: String?
    var Username: String?
    var Id: Int?
    let defaultValues = UserDefaults.standard
    
    func loginUser(Username: String, Password: String, completion: @escaping (Bool)-> Void){
        apiClient.login(Username: Username, Password: Password){
            (success,message,username,id) in
            DispatchQueue.main.async {
                self.Username = username;
                self.Message = message;
                self.Id = id;
                self.defaultValues.set(self.Id, forKey: "currentId")
                completion(success)
            }
        }
    }
}
