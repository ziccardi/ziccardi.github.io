---
id: implementations
title: NRPE Implementations
---

## Very short introduction to NRPE

[NRPE](https://github.com/NagiosEnterprises/nrpe) stands for **N**agios **R**emote **P**lugin **E**xecutor and allows, as
the name implies, the execution of [Nagios Plugins](https://www.nagios.org/downloads/nagios-plugins/) remotely.
That's very handy when you need to perform checks on a machine that for some reason you can't perform remotely.

The way [NRPE](https://github.com/NagiosEnterprises/nrpe) works is very simple: it receive a remote request to execute a command
from `check_nrpe` (a plugin you can find in the [Nagios Plugins](https://www.nagios.org/downloads/nagios-plugins/)) and 
executes the **executable** of the command locally, returning its results to `check_nrpe`.

## JNRPE

NRPE is great and works in many cases. But what if you would like to run a check written with the JAVA language?
NRPE will launch the plugin as an _external executable_ starting a new JAVA VM instance for each java check to be run. 
It's easy to imagine how fast that will drain your server memory if you run more than a couple of checks.

That's the issue [JNRPE](/jnrpe) (**J**ava NRPE) tries to resolve. When a plugin is installed into the 
[JNRPE Server](/jnrpe), it becomes part of it and shares the same JVM [JNRPE](/jnrpe) uses. 
This way only one JVM instance will be used to execute all the java plugins.

It supports the NRPE protocol, so you can seamlessly replace NRPE with JNRPE. You will only need to adapt your NRPE Commands
configuration to the JNRPE Commands configuration

## jNRPE

[jNRPE](/jsnrpe) gives the ability to write Nagios Plugins in **javascript** and invoke them remotely by using `check_nrpe`.
The plugins are dynamically loaded by jNRPE avoiding the instantiation of a new JavaScript Engine for each plugin
execution.

## NRPE++

[NRPE++](/nrpe_plus) is just a C++ implementation of [NRPE](https://github.com/NagiosEnterprises/nrpe) using the great 
[Boost.Asio](https://www.boost.org/doc/libs/1_72_0/doc/html/boost_asio.html) library.