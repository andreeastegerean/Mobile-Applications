//
//  UpdateFoodViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 04/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
import UIKit
public class UpdateFoodViewModel: NSObject{
    @IBOutlet var api : ApiClient!
    var food : Food!
    let defaultValues = UserDefaults.standard
    let myApi =  ApiClient()
    func UpdateFoodVM(name:String,kcal: Int, quantity: Int,userId:Int,completion: @escaping () -> Void){
        myApi.updateFood(ID: self.food.Id, Name: name, Kcal: kcal, Quantity: quantity, UserId: userId) { (food) in
            DispatchQueue.main.async {
                self.food=food
                self.defaultValues.set(self.food.Id, forKey: "currentFoodId")
                completion()
            }
            
        }
    }
    
    
    func setFood(f: Food){
        self.food = f;
    }
    
    func getId()-> Int{
        return self.food.Id ?? 0
    }
    
    func getName () -> String {
        return self.food?.Name ?? ""
    }
    
    func getKcal () -> Int {
        return self.food?.Kcal ?? 0
    }

    func getQuantity () -> Int {
        return self.food?.Quantity ?? 0
    }

}
