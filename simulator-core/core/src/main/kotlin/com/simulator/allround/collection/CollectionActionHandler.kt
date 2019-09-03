package com.simulator.allround.collection

import com.simulator.allround.repository.CollectionMongoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono
import java.util.stream.Collectors

@Component
class CollectionActionHandler(@Autowired private val collectionRepository: CollectionMongoRepository) {
    fun create(collection: Mono<Collection>): Mono<ServerResponse> {
        return collection.flatMap {
            collectionRepository.save(it)
        }.flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }

    fun getAll(): Mono<ServerResponse> {
        return collectionRepository.findAll().collect(Collectors.toList()).flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }
}

@Document("collection-docs")
data class Collection(@Id val id: String, val name: String, val description: String)