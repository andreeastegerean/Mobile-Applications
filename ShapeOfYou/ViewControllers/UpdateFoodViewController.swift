//
//  UpdateFoodViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 04/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit

class UpdateFoodViewController: UIViewController ,UIPickerViewDataSource,UIPickerViewDelegate{
    
    
    @IBOutlet weak var quantityPicker: UIPickerView!
    @IBOutlet var updateViewModel : UpdateFoodViewModel!
    @IBOutlet weak var quantityTextField: UITextField!
    @IBOutlet weak var kcalTextField: UITextField!
    @IBOutlet weak var nametextField: UITextField!
    //let pickerData=["10","20","30","40","50","60","70","80","90","100","150","175","200","250","300","350","400","450","500"]
    let pickerData=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
            return String(pickerData[row])
    }
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerData.count
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        
    }
    override func viewDidLoad() {
        super.viewDidLoad()

        nametextField.text = updateViewModel.getName()
        kcalTextField.text = String(updateViewModel.getKcal())
        quantityTextField.text=String(updateViewModel.getQuantity())
        quantityTextField.isUserInteractionEnabled=false
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func saveButtonPressed(_ sender: Any) {
        let selection = quantityPicker.selectedRow(inComponent: 0)+1
        self.updateViewModel.UpdateFoodVM(name: nametextField.text!, kcal: Int(kcalTextField.text!)! , quantity: Int(selection), userId: UserDefaults.standard.integer(forKey: "currentId")) {
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
