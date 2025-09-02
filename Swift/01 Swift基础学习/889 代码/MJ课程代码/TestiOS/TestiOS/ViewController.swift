//
//  ViewController.swift
//  TestiOS
//
//  Created by MJ Lee on 2019/6/25.
//  Copyright © 2019 MJ Lee. All rights reserved.
//

import RxCocoa
import RxSwift
import UIKit

enum MJError: Error {
    case test
}

// extension Reactive where Base: UIControl {
//    var hidden: Binder<Bool> {
//        Binder<Bool>(base) { button, value in
//            button.isHidden = value
//        }
//    }
//    var enabled: Binder<Bool> {
//        Binder<Bool>(base) { button, value in
//            button.isEnabled = value
//        }
//    }
// }

struct Person {
    var name: String
    var age: Int
}

class ViewController: UIViewController {
    @IBOutlet var slider: UISlider!
    @IBOutlet var tableView: UITableView!
    @IBOutlet var button: UIButton!
    @IBOutlet var label: UILabel!
    @IBOutlet var textField: UITextField!

    let bag = DisposeBag()
    let persons = Observable.just([
        Person(name: "Jack", age: 20),
        Person(name: "Rose", age: 22),
        Person(name: "Kate", age: 25),
    ])

    override func viewDidLoad() {
        super.viewDidLoad()

        persons.bind(to: tableView.rx.items(cellIdentifier: "cell")) { _, person, cell in
            cell.textLabel?.text = person.name
            cell.detailTextLabel?.text = "\(person.age)"
        }.disposed(by: bag)

        tableView.rx.itemSelected.subscribe(onNext: { path in
            print("点击了", path)
        }).disposed(by: bag)

//        tableView.rx.modelSelected(Person.self)
//            .subscribe(onNext: { person in
//                print("点击了", person)
//            }).disposed(by: bag)
    }

    func test2() {
//        Observable.just(0.8).bind(to: slider.rx.value).disposed(by: bag)
//
//        slider.rx.value.map { "slider数值是\($0)" }
//            .bind(to: textField.rx.text).disposed(by: bag)

//        textField.rx.text.subscribe(onNext: { text in
//            print(text ?? "")
//            }).disposed(by: bag)

//        button.rx.controlEvent(.touchUpInside).subscribe(onNext: {
//            print("按钮被点击了")
//        }).disposed(by: bag)

//        let observable = Observable<Int>.timer(.seconds(2), period: .seconds(1), scheduler: MainScheduler.instance)
        ////        let binder = Binder<Bool>(button) { button, value in
        ////            button.isHidden = value
        ////        }
//        observable.map { "\($0)" }.bind(to: label.rx.text).disposed(by: bag)

//        let binder  = Binder<String>(label) { label, value in
//            label.text = value
//        }
//        Observable.just(1).map { "数值：\($0)" }.subscribe(binder).dispose()
//        Observable.just(1).map { "数值：\($0)" }.bind(to: binder).dispose()

//        observable.bind(to: binder)
//        observable.subscribe(binder)
    }

    func test() {
//        let observable = Observable<Int>.create { observer in
//            observer.onNext(1)
//            observer.onCompleted()
//            return Disposables.create()
//        }

        let observable = Observable<Int>.timer(.seconds(2), period: .seconds(1), scheduler: MainScheduler.instance)

        let _ = observable
            .takeUntil(rx.deallocated)
            .map { "数值是：\($0)" }
            .bind(to: label.rx.text)

        observable.subscribe(onNext: { element in
            print("next", element)
        }, onError: { error in
            print("error", error)
        }, onCompleted: {
            print("completed")
        }).disposed(by: bag)

        observable.subscribe { event in
            switch event {
            case let .next(element):
                print("next", element)
            case let .error(error):
                print("error", error)
            case .completed:
                print("completed")
            }
        }.disposed(by: bag)
    }
}
