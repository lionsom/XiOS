//
//  MyTests.swift
//  testableTests
//
//  Created by 启业云03 on 2023/1/5.
//

import XCTest

@testable import testable

class MyTests: XCTestCase {
    func testPrintddd() throws {
        let a = ViewController()
        a.showSomething("123")
    }

    override func setUpWithError() throws {
        // Put setup code here. This method is called before the invocation of each test method in the class.
    }

    override func tearDownWithError() throws {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
    }

    func testExample() throws {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }

    func testPerformanceExample() throws {
        // This is an example of a performance test case.
        measure {
            // Put the code you want to measure the time of here.
        }
    }
}
