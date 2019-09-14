package com.simulator.allround.handler

import com.simulator.allround.repository.HttpRequestMongoRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.http.MediaType
import org.springframework.stereotype.Component
import org.springframework.web.reactive.function.BodyInserters
import org.springframework.web.reactive.function.server.ServerResponse
import reactor.core.publisher.Mono

@Component
class HttpRequestActionHandler(@Autowired val httpRequestRepo: HttpRequestMongoRepository) {

    fun save(request: Mono<HttpRequest>): Mono<ServerResponse> {
        return request.flatMap {
            httpRequestRepo.save(it)
        }.flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }

    fun fetchAllRequestsForCollection(collectionId: String): Mono<ServerResponse> {
        val resolvedColId = if (collectionId.isEmpty()) null else collectionId
        return httpRequestRepo.findByCollectionId(resolvedColId).collectList().flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }

    fun deleteById(requestId: String): Mono<ServerResponse> {
        return httpRequestRepo.deleteById(requestId).flatMap {
            ServerResponse.ok().build()
        }
    }
}

@Document("http-requests")
data class HttpRequest(
        @Id val id: String?,
        val name: String?,
        val uri: String,
        val method: HttpMethod,
        val body: String?,
        val headers: List<Pair<String, String>>?,
        val collectionId: String?
)

enum class HttpMethod {
    GET, POST, PUT, DELETE, PATCH
}