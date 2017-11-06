//
//  User.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 25/10/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
import SwiftyJSON

public class User {
    var Id : Int;
    var Username: String;
    var Fullname: String;
    var Email: String;
    var Password: String;
    
    init(Id:Int ,Username:String,Password: String,Email: String,Fullname: String){
        self.Id=Id;
        self.Fullname=Fullname;
        self.Username=Username;
        self.Email=Email;
        self.Password=Password;
    }
    
    
}
