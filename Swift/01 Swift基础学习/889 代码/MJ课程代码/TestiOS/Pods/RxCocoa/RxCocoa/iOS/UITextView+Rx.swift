//
//  UITextView+Rx.swift
//  RxCocoa
//
//  Created by Yuta ToKoRo on 7/19/15.
//  Copyright © 2015 Krunoslav Zaher. All rights reserved.
//

#if os(iOS) || os(tvOS)

    import RxSwift
    import UIKit

    public extension Reactive where Base: UITextView {
        /// Reactive wrapper for `text` property
        var text: ControlProperty<String?> {
            return value
        }

        /// Reactive wrapper for `text` property.
        var value: ControlProperty<String?> {
            let source: Observable<String?> = Observable.deferred { [weak textView = self.base] in
                let text = textView?.text

                let textChanged = textView?.textStorage
                    // This project uses text storage notifications because
                    // that's the only way to catch autocorrect changes
                    // in all cases. Other suggestions are welcome.
                    .rx.didProcessEditingRangeChangeInLength
                    // This observe on is here because text storage
                    // will emit event while process is not completely done,
                    // so rebinding a value will cause an exception to be thrown.
                    .observeOn(MainScheduler.asyncInstance)
                    .map { _ in
                        textView?.textStorage.string
                    }
                    ?? Observable.empty()

                return textChanged
                    .startWith(text)
            }

            let bindingObserver = Binder(base) { (textView, text: String?) in
                // This check is important because setting text value always clears control state
                // including marked text selection which is imporant for proper input
                // when IME input method is used.
                if textView.text != text {
                    textView.text = text
                }
            }

            return ControlProperty(values: source, valueSink: bindingObserver)
        }

        /// Reactive wrapper for `attributedText` property.
        var attributedText: ControlProperty<NSAttributedString?> {
            let source: Observable<NSAttributedString?> = Observable.deferred { [weak textView = self.base] in
                let attributedText = textView?.attributedText

                let textChanged: Observable<NSAttributedString?> = textView?.textStorage
                    // This project uses text storage notifications because
                    // that's the only way to catch autocorrect changes
                    // in all cases. Other suggestions are welcome.
                    .rx.didProcessEditingRangeChangeInLength
                    // This observe on is here because attributedText storage
                    // will emit event while process is not completely done,
                    // so rebinding a value will cause an exception to be thrown.
                    .observeOn(MainScheduler.asyncInstance)
                    .map { _ in
                        textView?.attributedText
                    }
                    ?? Observable.empty()

                return textChanged
                    .startWith(attributedText)
            }

            let bindingObserver = Binder(base) { (textView, attributedText: NSAttributedString?) in
                // This check is important because setting text value always clears control state
                // including marked text selection which is imporant for proper input
                // when IME input method is used.
                if textView.attributedText != attributedText {
                    textView.attributedText = attributedText
                }
            }

            return ControlProperty(values: source, valueSink: bindingObserver)
        }

        /// Reactive wrapper for `delegate` message.
        var didBeginEditing: ControlEvent<Void> {
            return ControlEvent<Void>(events: delegate.methodInvoked(#selector(UITextViewDelegate.textViewDidBeginEditing(_:)))
                .map { _ in
                    ()
                })
        }

        /// Reactive wrapper for `delegate` message.
        var didEndEditing: ControlEvent<Void> {
            return ControlEvent<Void>(events: delegate.methodInvoked(#selector(UITextViewDelegate.textViewDidEndEditing(_:)))
                .map { _ in
                    ()
                })
        }

        /// Reactive wrapper for `delegate` message.
        var didChange: ControlEvent<Void> {
            return ControlEvent<Void>(events: delegate.methodInvoked(#selector(UITextViewDelegate.textViewDidChange(_:)))
                .map { _ in
                    ()
                })
        }

        /// Reactive wrapper for `delegate` message.
        var didChangeSelection: ControlEvent<Void> {
            return ControlEvent<Void>(events: delegate.methodInvoked(#selector(UITextViewDelegate.textViewDidChangeSelection(_:)))
                .map { _ in
                    ()
                })
        }
    }

#endif
