//
//  ViewController.m
//  LLDB
//
//  Created by 启业云03 on 2021/8/7.
//

#import "ViewController.h"

@interface ViewController ()

@property (nonatomic, assign) NSInteger age;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)touchesBegan:(NSSet<UITouch *> *)touches withEvent:(UIEvent *)event {
    self.view.backgroundColor = UIColor.redColor;
    NSLog(@"123");
    NSLog(@"456");
    NSLog(@"789");
    
    NSArray *arr = @[@1, @2];
    arr[4];
    
    self.age = 20;
    
    [self test01];
}

#pragma mark - First

- (void)test01 {
    int a = 10;
    int b = 20;
    NSLog(@"%d", a + b);
}

@end

