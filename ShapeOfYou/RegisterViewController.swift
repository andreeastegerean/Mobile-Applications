//
//  RegisterViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 24/10/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import MessageUI

class RegisterViewController: UIViewController , MFMailComposeViewControllerDelegate, UIPickerViewDataSource,UIPickerViewDelegate {

    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var fullNameTextField: UITextField!
    @IBOutlet var registerViewModel : RegisterViewModel!
    let pickerData = ["Administrator","Guest"]
    
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return pickerData[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return pickerData.count
    }
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
    }

    @IBOutlet weak var pickerView: UIPickerView!
    @IBAction func cancelButtonTapped(_ sender: UIButton) {
        self.dismiss(animated: true,completion: nil)
        print("cancel")
    }
    
    func configuredMailComposeViewController(to dest : String, fullname: String, username: String) -> MFMailComposeViewController {
        let mailComposerVC = MFMailComposeViewController()
        mailComposerVC.mailComposeDelegate = self
        mailComposerVC.setToRecipients([dest])
        mailComposerVC.setSubject("ShapeOfYou fitness application")
        mailComposerVC.setMessageBody("<p>Welcome, \(fullname)! Your username is \(username) and have a good time descovering the app</p>", isHTML: true)
        
        return mailComposerVC
    }
    
    func showSendMailErrorAlert() {
        let sendMailErrorAlert = UIAlertView(title: "Could Not Send Email", message: "Your device could not send e-mail.  Please check e-mail configuration and try again.", delegate: self, cancelButtonTitle: "OK")
        sendMailErrorAlert.show()
    }
    
    // MARK: MFMailComposeViewControllerDelegate Method
    func mailComposeController(_ controller: MFMailComposeViewController, didFinishWith result: MFMailComposeResult, error: Error?) {
        controller.dismiss(animated: true, completion: nil)
    }
    
    @IBAction func signUpButtonTapped(_ sender: UIButton) {
        let selection = pickerView.selectedRow(inComponent: 0)+1
        registerViewModel.registerUser(fullname: fullNameTextField.text!, email: emailTextField.text!, username: usernameTextField.text!, password: passwordTextField.text!, role: selection, completion: {
            (success) in
            if success{
                let mailComposeViewController = self.configuredMailComposeViewController(to: self.emailTextField.text!, fullname: self.fullNameTextField.text!, username: self.usernameTextField.text!)
                if MFMailComposeViewController.canSendMail() {
                    self.present(mailComposeViewController, animated: true, completion: nil)
                } else {
                    self.showSendMailErrorAlert()
                }
                let loginViewController =
                    self.storyboard?.instantiateViewController(withIdentifier: "SigninViewController") as!
                SigninViewController
                self.present(loginViewController, animated: true)
            }
            })
    }
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
  

}
