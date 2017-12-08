//
//  ViewController.swift
//  ShapeOfYou
//
//  Created by Andreea Stegerean on 06/12/2017.
//  Copyright © 2017 Andreea Stegerean. All rights reserved.
//

import UIKit
import Charts

class ChartsViewController: UIViewController,ChartViewDelegate {

    let chartViewModel = ChartViewModel()
    var quantities = [Int]()
    var names = [String]()
    override func viewDidLoad() {
        super.viewDidLoad()
        self.loadDataIntoLists()

        
    }
    
    func loadDataIntoLists(){
        chartViewModel.fetchDataForChart { (l1,l2) in
            self.quantities = l2
            self.names = l1
            self.updateChartData()
        }
    }
    
    func getNames()-> Void {
         chartViewModel.fetchNames{ (list) in
            self.names = list
            
        }
        
    }
    
    func getQs()-> [Int] {
        chartViewModel.fetchQuantities{ (list) in
            self.quantities = list
        }
        for n in self.quantities{
            print(n)
        }
        return self.quantities
    }
    
    func updateChartData()  {
        let pieChartView = PieChartView(frame: self.view.frame)
        // 2. generate chart data entries
        //let track = ["Income", "Expense", "Wallet", "Bank"]
        //let money = [650, 456.13, 78.67, 856.52]
        //let qs=self.getQs()
        var entries = [PieChartDataEntry]()
        for (index, value) in self.quantities.enumerated() {
            let entry = PieChartDataEntry()
            entry.y = Double(value)
            entry.label = self.names[index]
            entries.append( entry)
        }
        
        // 3. chart setup
        let set = PieChartDataSet( values: entries, label: "Pie Chart")
        // this is custom extension method. Download the code for more details.
        var colors: [UIColor] = []
        
        for _ in 0..<self.quantities.count {
            let red = Double(arc4random_uniform(256))
            let green = Double(arc4random_uniform(256))
            let blue = Double(arc4random_uniform(256))
            let color = UIColor(red: CGFloat(red/255), green: CGFloat(green/255), blue: CGFloat(blue/255), alpha: 1)
            colors.append(color)
        }
        set.colors = colors
        let data = PieChartData(dataSet: set)
        pieChartView.data = data
        pieChartView.noDataText = "No data available"
        // user interaction
        pieChartView.isUserInteractionEnabled = true
        
        let d = Description()
        d.text = "iOSCharts.io"
        pieChartView.chartDescription = d
        pieChartView.centerText = "Pie Chart"
        pieChartView.holeRadiusPercent = 0.2
        pieChartView.transparentCircleColor = UIColor.clear
        self.view.addSubview(pieChartView)
        
    }
    
}
