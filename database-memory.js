// Banco de dados em Memoria!

import { randomUUID } from "node:crypto"

export class DatabaseMemory {

    #videos = new Map()


    list(search) {
    return  Array.from(this.#videos.entries())
    .map((videoArray) => {
        const id = videoArray[0]
        const data = videoArray[1]

        return {
            id, 
            ...data,
        }

    })
    .filter( video => {
        if (search) { // se tiver uma busca
            return video.title.includes(search) // retorne se o video tem a busca dentro do seu titulo 
        } // se nao tiver busca
        return true // nao filtre nada, retorne tudo
    })
}

    create(video) {
        const videoId = randomUUID() // ID unico
        this.#videos.set(videoId, video)
    }

    update(id, video) {
    this.#videos.set(id, video)
    }

    delete(id) {
        this.#videos.delete(id)
        }
}