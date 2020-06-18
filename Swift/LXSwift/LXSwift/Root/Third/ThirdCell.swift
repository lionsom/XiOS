//
//  ThirdCell.swift
//  LXSwift
//
//  Created by 林祥 on 2020/6/13.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

/// Declaration ThirdCellDelegate
protocol ThirdCellDelegate: class {
    /// Declaration function
    func thirdCellDetailBtnClick(fromCell: ThirdCell, didClickBtn: UIButton)
    
}

/// ThirdCell
class ThirdCell: UITableViewCell {
    /// Property
    weak var delegate:ThirdCellDelegate?
    
    /// 懒加载
    lazy var dataArr : NSMutableArray = {
        let arr = NSMutableArray()
        return arr
    }()
    lazy var dataMarr = NSMutableSet()
    
    private var _model: ThirdModel?  ///< 存储属性
    var model: ThirdModel? {
        set {
            // 给存储属性赋值
            self._model = newValue
            var title: String = self._model?.title ?? ""
            if title.isEmpty {
                title = "默认title"
            }
            dayLabel.text = title
            
            var image = UIImage(named: self._model?.avatar ?? "default_avatar")
            if image == nil {
                image = UIImage(named: "default_avatar")
            }
            avatarImageView.image = image
            
            
        }
        get {
            // 返回新的存储属性
            return self._model
        }
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
        
        setupView()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: - ========== UI ==========
    func setupView() {
        // addSubview
        addSubview(cellView)
        cellView.addSubview(avatarImageView)
        cellView.addSubview(dayLabel)
        cellView.addSubview(detailBtn)
        // 按钮点击事件，放在这里生效【Why?】
        detailBtn.addTarget(self, action: #selector(detailBtnClick(sender:)), for: .touchUpInside)

        // layout
        NSLayoutConstraint.activate([
            cellView.topAnchor.constraint(equalTo: self.topAnchor, constant: 10),
            cellView.leadingAnchor.constraint(equalTo: self.leadingAnchor, constant: 10),
            cellView.trailingAnchor.constraint(equalTo: self.trailingAnchor, constant: -10),
            cellView.bottomAnchor.constraint(equalTo: self.bottomAnchor, constant: -10)
        ])
        
        avatarImageView.topAnchor.constraint(equalTo: cellView.topAnchor, constant: 10).isActive = true
        avatarImageView.bottomAnchor.constraint(equalTo: cellView.bottomAnchor, constant: -10).isActive = true
        avatarImageView.widthAnchor.constraint(equalTo: avatarImageView.heightAnchor).isActive = true
        avatarImageView.leftAnchor.constraint(equalTo: cellView.leftAnchor, constant: 10).isActive = true
        
        NSLayoutConstraint.activate([
            detailBtn.widthAnchor.constraint(equalToConstant: 50),
            detailBtn.heightAnchor.constraint(equalToConstant: 50),
            detailBtn.centerYAnchor.constraint(equalTo: cellView.centerYAnchor),
            detailBtn.rightAnchor.constraint(equalTo: cellView.rightAnchor, constant: -20)
        ])

        NSLayoutConstraint.activate([
            dayLabel.topAnchor.constraint(equalTo: avatarImageView.topAnchor, constant: 0),
            dayLabel.leftAnchor.constraint(equalTo: avatarImageView.rightAnchor, constant: 10),
            dayLabel.bottomAnchor.constraint(equalTo: self.centerYAnchor, constant: 0),
            dayLabel.rightAnchor.constraint(equalTo: detailBtn.leftAnchor, constant: -10)
        ])
    }
    
    // MARK: - ========== Action ==========
    @objc func detailBtnClick(sender: UIButton) {
        delegate?.thirdCellDetailBtnClick(fromCell: self, didClickBtn: sender)
    }
    
    // MARK: - ========== Set&Get ==========
    let cellView: UIView = {
        let view = UIView()
        view.backgroundColor = UIColor.randomColor()
        // 圆角
        view.layer.cornerRadius = 10.0
        view.layer.borderWidth = 2.0
        view.layer.borderColor = UIColor.orange.cgColor
        view.translatesAutoresizingMaskIntoConstraints = false
        return view
    }()
    
    let avatarImageView: UIImageView = {
        let imageview = UIImageView()
        imageview.translatesAutoresizingMaskIntoConstraints = false
        imageview.backgroundColor = UIColor.red
        imageview.image = UIImage(named: "default_avatar")
        imageview.contentMode = .scaleAspectFit
        return imageview
    }()
    
    let dayLabel: UILabel = {
        let label = UILabel()
        label.translatesAutoresizingMaskIntoConstraints = false
        label.text = "day 01"
        label.textAlignment = .left
        label.lineBreakMode = .byTruncatingTail
        label.textColor = Specs.color.green
        label.font = Specs.font.regular
        return label
    }()
    
    let detailBtn: UIButton = {
        let btn = UIButton(type: .custom)
        btn.translatesAutoresizingMaskIntoConstraints = false
        btn.backgroundColor = Specs.color.gray
        btn.setTitle("详情", for: .normal)
        btn.setTitle("进入", for: .selected)
        // 边角
        btn.layer.cornerRadius = 3
        btn.clipsToBounds = true
        return btn
    }()
    
}
