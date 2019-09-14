package com.simulator.allround.http.client

import com.simulator.allround.handler.HttpMethod
import com.simulator.allround.handler.HttpRequest
import org.apache.http.HttpResponse
import org.apache.http.client.methods.HttpGet
import org.apache.http.client.methods.HttpRequestBase
import org.apache.http.concurrent.FutureCallback
import org.apache.http.impl.nio.client.CloseableHttpAsyncClient
import org.apache.http.nio.conn.ssl.SSLIOSessionStrategy
import org.apache.http.nio.conn.NoopIOSessionStrategy
import org.apache.http.nio.conn.SchemeIOSessionStrategy
import org.apache.http.config.RegistryBuilder
import org.apache.http.ssl.SSLContexts
import org.apache.http.impl.nio.reactor.IOReactorConfig
import org.apache.http.impl.nio.reactor.DefaultConnectingIOReactor
import org.apache.http.impl.nio.conn.PoolingNHttpClientConnectionManager
import org.apache.http.impl.nio.client.HttpAsyncClients
import org.apache.http.message.BasicHeader


class HttpClientConnector {
    lateinit var client: CloseableHttpAsyncClient;
    var connectionTimeout = 30000
    var soTimeout = 30000
    var maxTotalConnections = 100
    var maxConnectionsPerRoute = 10
    private val requestMappers = mapOf(Pair(HttpMethod.GET, this::mapToHttpGet))

    fun init() {
        val sslcontext = SSLContexts.createSystemDefault()
        val sessionStrategyRegistry = RegistryBuilder.create<SchemeIOSessionStrategy>()
                .register("http", NoopIOSessionStrategy.INSTANCE)
                .register("https", SSLIOSessionStrategy(sslcontext))
                .build()
        val ioReactorConfig = IOReactorConfig.custom()
                .setIoThreadCount(Runtime.getRuntime().availableProcessors())
                .setConnectTimeout(connectionTimeout)
                .setSoTimeout(soTimeout)
                .build()
        val ioReactor = DefaultConnectingIOReactor(ioReactorConfig)
        val connManager = PoolingNHttpClientConnectionManager(ioReactor, sessionStrategyRegistry)
        connManager.maxTotal = maxTotalConnections;
        connManager.defaultMaxPerRoute = maxConnectionsPerRoute
        client = HttpAsyncClients.custom()
                .setConnectionManager(connManager)
                .build();
        client.start()
    }

    fun executeRequest(request: HttpRequest, doneCallback: FutureCallback<HttpResponse>) {
        if (!client.isRunning) client.start()
        val requestBase = requestMappers[request.method]?.invoke(request)
        client.execute(requestBase, doneCallback)
    }

    private fun mapToHttpGet(request: HttpRequest): HttpRequestBase {
        val get = HttpGet(request.uri)
        val headers = request.headers?.map { BasicHeader(it.first, it.second) }
        get.setHeaders(headers?.toTypedArray())
        return get
    }

}