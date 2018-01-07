//
//  AddFoodViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 29/11/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import UserNotifications

class AddFoodViewController: UIViewController {
    /*
    @IBOutlet weak var pickerView: UIPickerView!
    let pickerData=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerData.count
    }*/

    @IBOutlet var addViewModel : CreateFoodViewModel!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var quantityTextField: UITextField!
    @IBOutlet weak var kcalTextField: UITextField!
    let userDefaults = UserDefaults.standard
    override func viewDidLoad() {
        super.viewDidLoad()
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge], completionHandler: {didAllow, error in
                   })
    }

    @IBAction func cancelButtonPress(_ sender: Any) {
        let tableViewController =
            self.storyboard?.instantiateViewController(withIdentifier: "FoodsTableViewController") as!
        FoodsTableViewController
        self.present(tableViewController, animated: true)
    }
    @IBAction func savePressButton(_ sender: Any) {
        //let selection = pickerView.selectedRow(inComponent: 0)+1
        self.addViewModel.CreateFoodVM(name: nameTextField.text!, kcal: Int(kcalTextField.text!)! , quantity: Int(quantityTextField.text!)!, userId: UserDefaults.standard.integer(forKey: "currentId")) {
            if self.addViewModel != nil {
                let content = UNMutableNotificationContent()
                content.title = "Hello" + self.userDefaults.string(forKey: "username")! + "!"
                content.subtitle="You just added a new food"
                content.body="hoped you enjoyed your" + String(self.nameTextField.text!)
                content.badge=1
                
                let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 5, repeats: false)
                let request = UNNotificationRequest(identifier: "timerDone",content: content,trigger: trigger)
                UNUserNotificationCenter.current().add(request, withCompletionHandler: nil)
            }
            else
            {
                print("NIL" )
            }
            
        }
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
