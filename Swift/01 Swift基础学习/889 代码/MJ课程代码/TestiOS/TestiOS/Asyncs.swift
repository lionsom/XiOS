//
//  Asyncs.swift
//  TestiOS
//
//  Created by MJ Lee on 2019/8/6.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

import Foundation

public typealias Task = () -> Void

public enum Asyncs {
    public static func async(_ task: @escaping Task) {
        _async(task)
    }

    public static func async(_ task: @escaping Task,
                             _ mainTask: @escaping Task)
    {
        _async(task, mainTask)
    }

    private static func _async(_ task: @escaping Task,
                               _ mainTask: Task? = nil)
    {
        let item = DispatchWorkItem(block: task)
        DispatchQueue.global().async(execute: item)
        if let main = mainTask {
            item.notify(queue: DispatchQueue.main, execute: main)
        }
    }

    @discardableResult
    public static func delay(_ seconds: Double,
                             _ block: @escaping Task) -> DispatchWorkItem
    {
        let item = DispatchWorkItem(block: block)
        DispatchQueue.main.asyncAfter(deadline: DispatchTime.now() + seconds,
                                      execute: item)
        return item
    }

    @discardableResult
    public static func asyncDelay(_ seconds: Double,
                                  _ task: @escaping Task) -> DispatchWorkItem
    {
        return _asyncDelay(seconds, task)
    }

    @discardableResult
    public static func asyncDelay(_ seconds: Double,
                                  _ task: @escaping Task,
                                  _ mainTask: @escaping Task) -> DispatchWorkItem
    {
        return _asyncDelay(seconds, task, mainTask)
    }

    private static func _asyncDelay(_ seconds: Double,
                                    _ task: @escaping Task,
                                    _ mainTask: Task? = nil) -> DispatchWorkItem
    {
        let item = DispatchWorkItem(block: task)
        DispatchQueue.global().asyncAfter(deadline: DispatchTime.now() + seconds,
                                          execute: item)
        if let main = mainTask {
            item.notify(queue: DispatchQueue.main, execute: main)
        }
        return item
    }
}
