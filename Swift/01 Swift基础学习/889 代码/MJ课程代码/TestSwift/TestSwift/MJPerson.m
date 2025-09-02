//
//  MJPerson.m
//  TestSwift
//
//  Created by MJ Lee on 2019/8/4.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import "MJPerson.h"
#import "TestSwift-Swift.h"

@implementation MJPerson
- (instancetype)initWithAge:(NSInteger)age name:(NSString *)name {
    if (self = [super init]) {
        self.age = age;
        self.name = name;
    }
    return self;
}
+ (instancetype)personWithAge:(NSInteger)age name:(NSString *)name {
    return nil;
}
+ (void)run { NSLog(@"Person +run"); }
- (void)run { NSLog(@"%zd %@ -run", _age, _name); }
+ (void)eat:(NSString *)food other:(NSString *)other { NSLog(@"Person +eat %@ %@", food, other); }
- (void)eat:(NSString *)food other:(NSString *)other { NSLog(@"%zd %@ -eat %@ %@", _age, _name, food, other); }
@end

int sum(int a, int b) { return a + b; }

void testSwift() {
    NSLog(@"testSwift");
    
//    Car * car = [[Car alloc] initWithPrice:1.55 band:@"Benz"];
//    [car test];
//    [car run];
//    [Car run];
}


