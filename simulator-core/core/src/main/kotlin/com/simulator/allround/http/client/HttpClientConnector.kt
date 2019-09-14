package com.simulator.allround.http.client

import com.simulator.allround.handler.HttpMethod
import com.simulator.allround.handler.HttpRequest
import com.simulator.allround.handler.HttpResponse
import org.apache.http.config.RegistryBuilder
import org.apache.http.impl.client.CloseableHttpClient
import org.apache.http.ssl.SSLContexts
import org.apache.http.message.BasicHeader
import org.apache.http.conn.ssl.SSLConnectionSocketFactory
import org.apache.http.conn.socket.PlainConnectionSocketFactory
import org.apache.http.conn.socket.ConnectionSocketFactory
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager
import org.apache.http.client.methods.*
import org.apache.http.impl.client.HttpClients
import org.springframework.stereotype.Component
import java.io.InputStreamReader
import javax.annotation.PostConstruct

@Component
class HttpClientConnector {
    lateinit var client: CloseableHttpClient;
    var connectionTimeout = 30000
    var soTimeout = 30000
    var maxTotalConnections = 100
    var maxConnectionsPerRoute = 10
    private val requestMappers = mapOf(Pair(HttpMethod.GET, this::mapToHttpGet))

    @PostConstruct
    fun init() {
        val sslcontext = SSLContexts.createSystemDefault()
        val socketFactoryRegistry = RegistryBuilder.create<ConnectionSocketFactory>()
                .register("http", PlainConnectionSocketFactory.INSTANCE)
                .register("https", SSLConnectionSocketFactory(sslcontext))
                .build()
        val connManager = PoolingHttpClientConnectionManager(socketFactoryRegistry)
        connManager.maxTotal = maxTotalConnections;
        connManager.defaultMaxPerRoute = maxConnectionsPerRoute
        client = HttpClients.custom()
                .setConnectionManager(connManager)
                .build()
    }

    fun executeRequest(request: HttpRequest): HttpResponse {
        val uriRequest = requestMappers[request.method]?.invoke(request)
        val response = client.execute(uriRequest)
        val responseEntityReader = InputStreamReader(response.entity.content)
        responseEntityReader.use { responseEntityReader ->
            return HttpResponse(
                    response.statusLine.statusCode,
                    response.statusLine.reasonPhrase,
                    response.allHeaders.map { Pair(it.name, it.value) },
                    responseEntityReader.readText()
            )
        }
    }

    private fun mapToHttpGet(request: HttpRequest): HttpUriRequest {
        val get = HttpGet(request.uri)
        val headers = request.headers?.map { BasicHeader(it.first, it.second) }
        get.setHeaders(headers?.toTypedArray())
        return get
    }

}