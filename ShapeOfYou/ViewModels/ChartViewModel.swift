//
//  ChartViewModel.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 06/12/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import Foundation
public class ChartViewModel: NSObject {
    
    let apiClient = ApiClient()
    
    func fetchDataForChart(completion: @escaping ([String],[Int])->Void){
        apiClient.fetchFoods { (foods) in
            DispatchQueue.main.async{
                var names = [String]()
                var qs = [Int]()
                for f in foods!{
                    names.append(f.Name);
                    qs.append(f.Quantity)
                }
                completion(names,qs)
            }
        }
    }
    
    func fetchNames(completion: @escaping ([String])->Void){
        apiClient.fetchFoods { (foods) in
            DispatchQueue.main.async{
                var names = [String]()
                for f in foods!{
                    names.append(f.Name);
                }
                completion(names)
            }
        }
    }
    
    func fetchQuantities(completion: @escaping ([Int])->Void){
        apiClient.fetchFoods { (foods) in
            DispatchQueue.main.async{
                var qs = [Int]()
                for f in foods!{
                    qs.append(f.Quantity);
                }
                completion(qs)
            }
        }
    }
    
    
}
