---
id: protocol
title: NRPE Protocol
---

This document tries to describe the **NRPE Protocol** as reverse engineered while writing JNRPE. A big help has arrived
from the [NRPE Protocol Document](https://github.com/stockholmuniversity/Nagios-NRPE/blob/master/share/protocol-nrpe.md)".

## Communication flow

The communication is always initiated by `check_nrpe` and happens as follows:

    +------------+   Query             +----------+
    |            |-------------------->|          |
    | check_nrpe |                     |   NRPE   |
    |            |<--------------------|          |
    +------------+   Response          +----------+

1. `check_nrpe` sends a **QUERY PACKET** to NRPE
2. `NRPE` answers with a **RESPONSE PACKET**

The structure of both request and response packets is the same.

As of today, NRPE supports 3 different protocol versions: 2, 3 and 4. Version 1 is not used anymore.

## Protocol Version 2

When using protocol version 2, each frame has the same size and the structure looks like below:

    +-------------+---------+------+-------+------------+----------+------------+
    | BYTE        | 0     1 | 2  3 | 4   7 | 8        9 | 10  1034 | 1035  1036 |
    +-------------+---------+------+-------+------------+----------+------------+
    | DESCRIPTION | VERSION | TYPE | CRC32 | RESULTCODE |  BUFFER  |  PADDING   |
    +-------------+---------+------+-------+------------+----------+------------+
    
* **VERSION**: the protocol version. For protocol Version 2, it must be 2.
* **TYPE**: the type of the packet:
  * 1: Request Packet
  * 2: Response Packet
* **CRC32**: used to validate the packet, is computed against the whole packet but the CRC itself, with must be replaced with 0 (4 bytes)
* **RESULTCODE**: it has a meaning only when dealing with responses. If TYPE is REQUEST, its value is random, otherwise the value can be:
  * 0: OK
  * 1: WARNING 
  * 2: CRITICAL
  * 3: UNKNOWN
* **BUFFER**: 
  * When TYPE is REQUEST: the command to execute together with all the parameters. The parameters are separated between
    each other and from the command using an exclamation mark. For example, 
    
    `check_nrpe -c MYCHECK -a ARG1 ARG2 ARG3`
    
    will be sent as
    
    `MYCHECK!ARG1!ARG2!ARG3` 
  * When TYPE is RESPONSE: the message returned by the check
* **PADDING**: two random bytes

## Protocol Version 3

Version 3 of the protocol is very similar to version 2, but the length of the buffer is now variable. Two new fields
are added to the packet:
* **ALIGNMENT**: this is always zero
* **BUFFERLENGTH**: the length of the buffer


    +-------------+---------+------+-------+------------+-----------+--------------+----------+------------+
    | BYTE        | 0     1 | 2  3 | 4   7 | 8        9 | 10     11 | 12        15 | 16     ? | ?        ? |
    +-------------+---------+------+-------+------------+-----------+--------------+----------+------------+
    | DESCRIPTION | VERSION | TYPE | CRC32 | RESULTCODE | ALIGNMENT | BUFFERLENGTH |  BUFFER  |  PADDING   |
    +-------------+---------+------+-------+------------+-----------+--------------+----------+------------+

The padding starts right after the buffer and its length is `max(1020-BUFFERLENGTH, 0)`

* **VERSION**: the protocol version. For protocol Version 3, it must be 3.
* **TYPE**: the type of the packet:
  * 1: Request Packet
  * 2: Response Packet
* **CRC32**: used to validate the packet, is computed against the whole packet but the CRC itself, with must be replaced with 0 (4 bytes)
* **RESULTCODE**: it has a meaning only when dealing with responses. If TYPE is REQUEST, its value is ZERO, otherwise the value can be:
  * 0: OK
  * 1: WARNING 
  * 2: CRITICAL
  * 3: UNKNOWN
* **BUFFER**: 
  * When TYPE is REQUEST: the command to execute together with all the parameters. The parameters are separated between
    each other and from the command using an exclamation mark. For example, 
    
    `check_nrpe -c MYCHECK -a ARG1 ARG2 ARG3`
    
    will be sent as
    
    `MYCHECK!ARG1!ARG2!ARG3` 
  * When TYPE is RESPONSE: the message returned by the check
* **PADDING**: a number of '0' bytes

## Protocol Version 4

As I've been able to analise, looks like protocol V4 is totally identical to protocol V3, with the exception of the 
VERSION field, whose value must be 4.
I believe this can be due to the fact that Protocol V3 is not really supported anymore 
(see [here](https://github.com/NagiosEnterprises/nrpe/issues/233#issuecomment-597726617)).