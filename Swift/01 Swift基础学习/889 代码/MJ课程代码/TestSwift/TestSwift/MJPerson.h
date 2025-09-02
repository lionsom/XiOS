//
//  MJPerson.h
//  TestSwift
//
//  Created by MJ Lee on 2019/8/4.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

int sum(int a, int b);
void testSwift();

@interface MJPerson : NSObject
@property (nonatomic, assign) NSInteger age;
@property (nonatomic, copy) NSString *name;
- (instancetype)initWithAge:(NSInteger)age name:(NSString *)name;
+ (instancetype)personWithAge:(NSInteger)age name:(NSString *)name;
- (void)run;
+ (void)run;
- (void)eat:(NSString *)food other:(NSString *)other;
+ (void)eat:(NSString *)food other:(NSString *)other;
- (void)abc:(NSArray *)abc;
@end



NS_ASSUME_NONNULL_END
