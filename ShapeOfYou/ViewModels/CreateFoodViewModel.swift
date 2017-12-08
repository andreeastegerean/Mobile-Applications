//
//  CreateFoodViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 29/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation

import UIKit
public class CreateFoodViewModel: NSObject{
    
    
    @IBOutlet var apiClient: ApiClient!
    var food : Food!
    let defaultValues = UserDefaults.standard
    let api =  ApiClient()
    
    func CreateFoodVM(name:String,kcal: Int, quantity: Int,userId:Int,completion: @escaping () -> Void){
        api.createFood(Name: name, Kcal: kcal, Quantity: quantity, UserId: userId) { (food) in
            DispatchQueue.main.async {
                self.food=food
                self.defaultValues.set(self.food.UserId, forKey: "currentId")
                completion()
            }
            
        }
    }
    
    func setFood(f: Food){
        self.food = f;
    }
}
