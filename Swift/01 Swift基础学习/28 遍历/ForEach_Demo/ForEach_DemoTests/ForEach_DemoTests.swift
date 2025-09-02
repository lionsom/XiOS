//
//  ForEach_DemoTests.swift
//  ForEach_DemoTests
//
//  Created by 启业云03 on 2023/1/10.
//

import XCTest

@testable import ForEach_Demo

class ForEach_DemoTests: XCTestCase {
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

    let vc = ViewController()

    func testTraversal_1() {
        vc.traversal_1()
    }

    func testTraversal_2() {
        vc.traversal_2()
    }

    func testTraversal_3() {
        vc.traversal_3()
    }

    func testTraversal_4() {
        vc.traversal_4()
    }

    func testTraversal_5() {
        vc.traversal_5()
    }

    func testTraversal_delete_1() {
        vc.traversal_delete_1()
    }

    func testTraversal_delete_2() {
        vc.traversal_delete_2()
    }

    func testTraversal_delete_3() {
        vc.traversal_delete_3()
    }

    func testTraversal_delete_4() {
        vc.traversal_delete_4()
    }

    func testTraversal_delete_11() {
        vc.traversal_delete_11()
    }

    func testTraversal_delete_12() {
        vc.traversal_delete_12()
    }

    func testTraversal_delete_13() {
        vc.traversal_delete_13()
    }

    func testTraversal_delete_14() {
        vc.traversal_delete_14()
    }
}
