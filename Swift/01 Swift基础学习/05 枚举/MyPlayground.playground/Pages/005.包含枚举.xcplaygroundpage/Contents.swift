import Foundation

// 你也能够在structs或classes中内嵌枚举

struct Character {
    enum CharacterType {
        case Thief
        case Warrior
        case Knight
    }

    enum Weapon {
        case Bow
        case Sword
        case Lance
        case Dagger
    }

    let type: CharacterType
    let weapon: Weapon
}

let warrior = Character(type: .Warrior, weapon: .Sword)
