//
//  Food.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 01/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
import SwiftyJSON

public class Food{
    var Id: Int;
    var Name: String;
    var Kcal: Int;
    var Quantity: Int;
    var UserId: Int;
    
    init(Id:Int ,Name:String,Kcal: Int,Quantity: Int,UserId: Int){
        self.Id=Id;
        self.Name=Name;
        self.Kcal=Kcal;
        self.Quantity=Quantity;
        self.UserId=UserId;
    }
    
    

}
