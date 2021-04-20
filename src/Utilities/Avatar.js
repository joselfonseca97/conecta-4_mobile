import React from 'react'

export function getAvatars() {
    let avatars = []
    avatars.push({ avatar_id: 1, avatar_url: require('../Assets/avatar_default.png'), avatar_name: 'Defaut' })
    avatars.push({ avatar_id: 2, avatar_url: require('../Assets/avatar_cat2.png'), avatar_name: 'Cat2' })
    avatars.push({ avatar_id: 3, avatar_url: require('../Assets/avatar_bird.png'), avatar_name: 'Bird' })
    avatars.push({ avatar_id: 4, avatar_url: require('../Assets/avatar_cat1.png'), avatar_name: 'Cat1' })
    avatars.push({ avatar_id: 5, avatar_url: require('../Assets/avatar_donkey.png'), avatar_name: 'Donkey' })
    avatars.push({ avatar_id: 6, avatar_url: require('../Assets/avatar_dragon.png'), avatar_name: 'Dragon' })
    avatars.push({ avatar_id: 7, avatar_url: require('../Assets/avatar_frog.png'), avatar_name: 'Frog' })
    avatars.push({ avatar_id: 8, avatar_url: require('../Assets/avatar_horse.png'), avatar_name: 'Horse' })
    avatars.push({ avatar_id: 9, avatar_url: require('../Assets/avatar_tadpole.png'), avatar_name: 'Tadpole' })
    return avatars
}

