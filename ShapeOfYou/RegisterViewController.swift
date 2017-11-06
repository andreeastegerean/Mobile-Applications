//
//  RegisterViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 24/10/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import MessageUI

class RegisterViewController: UIViewController , MFMailComposeViewControllerDelegate {

    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var fullNameTextField: UITextField!
    @IBOutlet var registerViewModel : RegisterViewModel!
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    @IBAction func cancelButtonTapped(_ sender: UIButton) {
        self.dismiss(animated: true,completion: nil)
        print("cancel")
    }
    func sendEMail(to dest : String, fullname: String, username: String){
        self.dismiss(animated: true, completion: nil)
        if MFMailComposeViewController.canSendMail() {
            let mail = MFMailComposeViewController()
            mail.mailComposeDelegate = self
            mail.setToRecipients([dest])
            mail.setSubject("ShapeOfYou fitness application")
            mail.setMessageBody("<p>Welcome, \(fullname)! Your username is \(username) and have a good time descovering the app</p>", isHTML: true)
            self.dismiss(animated: true, completion: nil)
            present(mail, animated: true)
        }
    }
    @IBAction func signUpButtonTapped(_ sender: UIButton) {
        
        registerViewModel.registerUser(fullname: fullNameTextField.text!, email: emailTextField.text!, username: usernameTextField.text!, password: passwordTextField.text!, completion: {
            (success) in
            if success{
                self.sendEMail(to: self.emailTextField.text!, fullname: self.fullNameTextField.text!, username: self.usernameTextField.text!)
                let loginViewController =
                    self.storyboard?.instantiateViewController(withIdentifier: "SigninViewController") as!
                SigninViewController
                self.present(loginViewController, animated: true)
            }
            else
            {
                let alert = UIAlertController(title: "Alert", message: "Username already registered", preferredStyle: UIAlertControllerStyle.alert)
                alert.addAction(UIAlertAction(title: "Ok", style: UIAlertActionStyle.default, handler: nil))
                self.present(alert, animated: true, completion: nil)
            }
            })
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
  

}
