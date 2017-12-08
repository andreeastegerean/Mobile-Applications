//
//  FoodsTableViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 01/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import Charts

public class FoodTableNavBar : UINavigationBar{
    
    
}

public class FoodTableViewCell : UITableViewCell{
    @IBOutlet weak var KcalLabel: UILabel!
    @IBOutlet weak var QuantityLabel: UILabel!
    @IBOutlet weak var NameLabel: UILabel!
    

}
class FoodsTableViewController: UITableViewController {

    @IBOutlet var foodViewModel : FoodViewModel!
    
    @IBAction func goToChart(_ sender: Any) {
        let chartsController =
            self.storyboard?.instantiateViewController(withIdentifier: "ChartsViewController") as!
        ChartsViewController
        self.present(chartsController, animated: true)
    }
    @IBAction func navigateToCreateFood(_ sender: Any) {
        let createViewController =
            self.storyboard?.instantiateViewController(withIdentifier: "AddFoodViewController") as!
        AddFoodViewController
        self.present(createViewController, animated: true)
    }
    override func viewDidLoad() {
        
        super.viewDidLoad()
        self.tableView.contentInset = UIEdgeInsets(top: 40,left: 0,bottom: 0,right: 0)
        foodViewModel.getFoods {
            self.tableView.reloadData()
        }
     
    }
    
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
                        self.foodViewModel.DeleteFoodVM(for: indexPath){ok in
                                print(ok)
                            }
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
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
