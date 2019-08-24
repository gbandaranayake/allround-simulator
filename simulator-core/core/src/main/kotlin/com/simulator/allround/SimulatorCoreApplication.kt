package com.simulator.allround

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
open class SimulatorCoreApplication

fun main(args: Array<String>) {
	runApplication<SimulatorCoreApplication>(*args)
}
