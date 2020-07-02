//
//  FBMeBaseCell.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

class FBMeBaseCell: UITableViewCell {

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    static let identifier = "FBMeCell"
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: .default, reuseIdentifier: reuseIdentifier)
        
        backgroundColor = UIColor.white
        
        textLabel?.textColor = Specs.color.red
        textLabel?.font = Specs.font.regular
        
        detailTextLabel?.font = Specs.font.small
        detailTextLabel?.textColor = Specs.color.green
    }
    
    // https://stackoverflow.com/questions/26081287/required-initializer-initcoder-must-be-provided-by-subclass-of-uitablevi/26081426#26081426
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
}
