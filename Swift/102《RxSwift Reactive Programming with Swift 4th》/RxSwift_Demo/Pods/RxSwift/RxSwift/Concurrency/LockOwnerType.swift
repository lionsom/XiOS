//
//  LockOwnerType.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 10/25/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

protocol LockOwnerType: AnyObject, Lock {
    var lock: RecursiveLock { get }
}

extension LockOwnerType {
    func lock() { lock.lock() }
    func unlock() { lock.unlock() }
}
