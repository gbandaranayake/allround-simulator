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
class HttpRequestActionHandler(@Autowired val collectionRepo: HttpRequestMongoRepository) {

    fun create(request: Mono<HttpRequest>): Mono<ServerResponse> {
        return request.flatMap {
            collectionRepo.save(it)
        }.flatMap {
            ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(BodyInserters.fromObject(it))
        }
    }
}

@Document("http-requests")
data class HttpRequest(
        @Id val id: String?,
        val uri: String,
        val method: HttpMethod,
        val body: String?,
        val headers:    List<Pair<String, String>>?,
        val collectionId: String?
)

enum class HttpMethod{
    GET, POST, PUT, DELETE, PATCH
}