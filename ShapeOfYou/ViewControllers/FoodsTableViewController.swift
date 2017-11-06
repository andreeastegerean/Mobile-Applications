//
//  FoodsTableViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 01/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit

public class FoodTableViewCell : UITableViewCell{
    @IBOutlet weak var KcalLabel: UILabel!
    @IBOutlet weak var QuantityLabel: UILabel!
    @IBOutlet weak var NameLabel: UILabel!
    

}
class FoodsTableViewController: UITableViewController {

    @IBOutlet var foodViewModel : FoodViewModel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        foodViewModel.getFoods {
            self.tableView.reloadData()
        }
        
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        return foodViewModel.NumberOfItemsToDisplay(in: section)
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "foodCell", for: indexPath) as! FoodTableViewCell
        
        cell.NameLabel?.text = foodViewModel.FoodNameToDisplay(for: indexPath)
        cell.KcalLabel?.text = String(foodViewModel.FoodKcalToDisplay(for: indexPath))
        cell.QuantityLabel?.text = String(foodViewModel.FoodQuantityToDisplay(for: indexPath))
        cell.backgroundColor = .clear
        return cell
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        super.prepare(for: segue, sender: sender)
        
        guard let updateViewController = segue.destination as? UpdateFoodViewController
            else{
                fatalError("Error")
        }
        
        guard let selectedCell = sender as? FoodTableViewCell
            else{
                fatalError("Errorn2")
        }
        
        guard let indexPath = tableView.indexPath(for: selectedCell)
            else{
                fatalError("error3")
        }
        
        if let selectedFoodViewModel = foodViewModel.getDetailForFood(for: indexPath){
            updateViewController.updateViewModel = selectedFoodViewModel
        } else {
            fatalError("error4")
        }
        
    }

}
