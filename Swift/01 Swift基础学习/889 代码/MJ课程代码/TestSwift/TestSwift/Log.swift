//
//  Log.swift
//  TestSwift
//
//  Created by MJ Lee on 2019/7/30.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

import Foundation

func log<T>(_ msg: T,
            file: NSString = #file,
            line: Int = #line,
            fn: String = #function)
{
    #if DEBUG
        let prefix = "\(file.lastPathComponent)_\(line)_\(fn):"
        print(prefix, msg)
    #endif
}
