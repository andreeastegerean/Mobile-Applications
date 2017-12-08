//
//  SigninViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 24/10/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import Charts

class SigninViewController: UIViewController {

    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet var loginViewModel : LoginViewModel!
    
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func signInButtonTapped(_ sender: UIButton) {
        loginViewModel.loginUser(Username: usernameTextField.text!, Password: passwordTextField.text!, completion: {
            (succes) in
            if succes{
                let foodsTableViewController =
                    self.storyboard?.instantiateViewController(withIdentifier: "FoodsTableViewController") as!
                FoodsTableViewController
                self.present(foodsTableViewController, animated: true)
            }
            else{
                let alert = UIAlertController(title: "Alert", message: "Username or password incorrect", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
        }
        
    )}
    @IBAction func registerNewButtonTapped(_ sender: UIButton) {
        let registerViewController =
            self.storyboard?.instantiateViewController(withIdentifier: "RegisterViewController") as!
            RegisterViewController
        
        self.present(registerViewController, animated: true)
        
    }
}

    


