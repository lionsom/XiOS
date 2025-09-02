//
//  Zip.swift
//  RxSwift
//
//  Created by Krunoslav Zaher on 5/23/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

protocol ZipSinkProtocol: class {
    func next(_ index: Int)
    func fail(_ error: Swift.Error)
    func done(_ index: Int)
}

class ZipSink<Observer: ObserverType>: Sink<Observer>, ZipSinkProtocol {
    typealias Element = Observer.Element

    let _arity: Int

    let _lock = RecursiveLock()

    // state
    private var _isDone: [Bool]

    init(arity: Int, observer: Observer, cancel: Cancelable) {
        _isDone = [Bool](repeating: false, count: arity)
        _arity = arity

        super.init(observer: observer, cancel: cancel)
    }

    func getResult() throws -> Element {
        rxAbstractMethod()
    }

    func hasElements(_: Int) -> Bool {
        rxAbstractMethod()
    }

    func next(_: Int) {
        var hasValueAll = true

        for i in 0 ..< _arity {
            if !hasElements(i) {
                hasValueAll = false
                break
            }
        }

        if hasValueAll {
            do {
                let result = try getResult()
                forwardOn(.next(result))
            } catch let e {
                self.forwardOn(.error(e))
                self.dispose()
            }
        }
    }

    func fail(_ error: Swift.Error) {
        forwardOn(.error(error))
        dispose()
    }

    func done(_ index: Int) {
        _isDone[index] = true

        var allDone = true

        for done in _isDone where !done {
            allDone = false
            break
        }

        if allDone {
            forwardOn(.completed)
            dispose()
        }
    }
}

final class ZipObserver<Element>:
    ObserverType,
    LockOwnerType,
    SynchronizedOnType
{
    typealias ValueSetter = (Element) -> Void

    private var _parent: ZipSinkProtocol?

    let _lock: RecursiveLock

    // state
    private let _index: Int
    private let _this: Disposable
    private let _setNextValue: ValueSetter

    init(lock: RecursiveLock, parent: ZipSinkProtocol, index: Int, setNextValue: @escaping ValueSetter, this: Disposable) {
        _lock = lock
        _parent = parent
        _index = index
        _this = this
        _setNextValue = setNextValue
    }

    func on(_ event: Event<Element>) {
        synchronizedOn(event)
    }

    func _synchronized_on(_ event: Event<Element>) {
        if _parent != nil {
            switch event {
            case .next:
                break
            case .error:
                _this.dispose()
            case .completed:
                _this.dispose()
            }
        }

        if let parent = _parent {
            switch event {
            case let .next(value):
                _setNextValue(value)
                parent.next(_index)
            case let .error(error):
                parent.fail(error)
            case .completed:
                parent.done(_index)
            }
        }
    }
}
