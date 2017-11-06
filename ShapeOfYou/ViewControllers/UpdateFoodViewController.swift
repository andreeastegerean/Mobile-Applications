//
//  UpdateFoodViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 04/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit

class UpdateFoodViewController: UIViewController {

    @IBOutlet var updateViewModel : UpdateFoodViewModel!
    @IBOutlet weak var quantityTextField: UITextField!
    @IBOutlet weak var kcalTextField: UITextField!
    @IBOutlet weak var nametextField: UITextField!
    override func viewDidLoad() {
        
        
        super.viewDidLoad()
        nametextField.text = updateViewModel.getName()
        kcalTextField.text = String(updateViewModel.getKcal())
        quantityTextField.text=String(updateViewModel.getQuantity())
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func saveButtonPressed(_ sender: Any) {
        self.updateViewModel.UpdateFoodVM(name: nametextField.text!, kcal: Int(kcalTextField.text!)! , quantity: Int(quantityTextField.text!)!, userId: UserDefaults.standard.integer(forKey: "currentId")) {
            if self.updateViewModel != nil {
                let alert = UIAlertController(title: "Done", message: "\(self.nametextField.text!) was updated", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
            else
            {
                print("NIL" )
            }
            
        }
            
    }
    
    @IBAction func cancelButtonPressed(_ sender: Any) {
        let tableViewController =
            self.storyboard?.instantiateViewController(withIdentifier: "FoodsTableViewController") as!
        FoodsTableViewController
        self.present(tableViewController, animated: true)
    }
    

}
