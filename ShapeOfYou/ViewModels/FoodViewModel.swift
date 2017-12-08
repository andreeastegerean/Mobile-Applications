//
//  FoodViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 03/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
public class FoodViewModel : NSObject{
    @IBOutlet var apiClient : ApiClient!
    var foods: [Food]?
    
    func getFoods(completion: @escaping ()-> Void){
        apiClient.fetchFoods{ (arrayOfFoods) in
            DispatchQueue.main.async {
                self.foods = arrayOfFoods
                completion()
            }
            
        }
    }
    
    func NumberOfItemsToDisplay(in section: Int)->Int
    {
        return foods?.count ?? 0;
    }
    
    func FoodNameToDisplay(for indexPath: IndexPath)->String
    {
        return foods?[indexPath.row].Name ?? "";
    }
    
    func FoodKcalToDisplay(for indexPath: IndexPath)->Int{
        return foods?[indexPath.row].Kcal ?? 0;
    }
    
    func FoodQuantityToDisplay(for indexPath: IndexPath)->Int{
        return foods?[indexPath.row].Quantity ?? 0;
    }
    
    func getDetailForFood(for indexPath : IndexPath) -> UpdateFoodViewModel? {
        if let food = foods?[indexPath.row]
        {
            let viewModel = UpdateFoodViewModel()
            viewModel.setFood(f: food)
            return viewModel
        }
        return nil
    }
    
    func DeleteFoodVM(for indexPath: IndexPath,completion: @escaping (Bool) -> Void){
        let food = (self.foods?[indexPath.row])!
        self.foods?.remove(at: indexPath.row)
        apiClient.deleteFood(ID: food.Id) { (Ok) in
            DispatchQueue.main.async {
                completion(Ok)
            }
            
        }
    }
}
