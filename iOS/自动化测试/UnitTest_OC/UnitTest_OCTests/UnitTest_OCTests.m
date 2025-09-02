//
//  UnitTest_OCTests.m
//  UnitTest_OCTests
//
//  Created by 启业云03 on 2022/11/10.
//

#import <XCTest/XCTest.h>
#import "ViewController.h"

@interface UnitTest_OCTests : XCTestCase

@end

@implementation UnitTest_OCTests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
    // This is an example of a functional test case.
    // Use XCTAssert and related functions to verify your tests produce the correct results.
}

- (void)testPerformanceExample {
    // This is an example of a performance test case.
    [self measureBlock:^{
        // Put the code you want to measure the time of here.
    }];
}

- (void)testShowNum {
    ViewController *A = [ViewController new];
    NSInteger B = [A showTheNumber:11];
    NSLog(@"测试 = %ld", (long)B);
}

@end
