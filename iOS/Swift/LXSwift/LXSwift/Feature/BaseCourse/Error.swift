//
//  Error.swift
//  LXSwift
//
//  Created by 启业云03 on 2020/6/24.
//  Copyright © 2020 LX. All rights reserved.
//

import UIKit

enum PrinterError: Error {
    case outOfPaper
    case noToner
    case onFire
}


func send(job: Int, toPrinter printerName: String) throws -> String {
    if printerName == "AAA" {
        throw PrinterError.outOfPaper
    }
    return "Job sent"
}
