//
//  Cache.swift
//  TestiOS
//
//  Created by MJ Lee on 2019/8/6.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

import Foundation

public enum Cache {
    private static var data = [String: Any]()
//    private static var lock = DispatchSemaphore(value: 1)
//    private static var lock = NSLock()
    private static var lock = NSRecursiveLock()

    public static func get(_ key: String) -> Any? {
        data[key]
    }

    public static func set(_ key: String, _ value: Any) {
//        lock.wait()
//        defer { lock.signal() }

        lock.lock()
        defer { lock.unlock() }

        data[key] = value
    }
}
