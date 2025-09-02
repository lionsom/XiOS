import Foundation

enum Character {
    enum Weapon {
        case Bow
        case Sword
        case Lance
        case Dagger
    }

    enum Helmet {
        case Wooden
        case Iron
        case Diamond
    }

    case Thief
    case Warrior
    case Knight
}

let character = Character.Thief
let weapon = Character.Weapon.Bow
let helmet = Character.Helmet.Iron
