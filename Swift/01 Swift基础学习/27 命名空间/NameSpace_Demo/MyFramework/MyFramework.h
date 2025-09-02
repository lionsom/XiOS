//
//  MyFramework.h
//  MyFramework
//
//  Created by 启业云03 on 2023/1/9.
//

#import <Foundation/Foundation.h>

//! Project version number for MyFramework.
FOUNDATION_EXPORT double MyFrameworkVersionNumber;

//! Project version string for MyFramework.
FOUNDATION_EXPORT const unsigned char MyFrameworkVersionString[];

// In this header, you should import all the public headers of your framework using statements like #import <MyFramework/PublicHeader.h>

// MyFramework.swift
// 这个文件存在于 MyFramework.framework 中
public class MyClass {
    public class func hello() {
        print("hello from framework")
    }
}
