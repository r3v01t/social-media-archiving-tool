import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ArchiveCreated } from "../generated/Contract/Contract"

export function createArchiveCreatedEvent(
  user: Address,
  timestamp: BigInt,
  ipAddress: Bytes,
  pHash: Bytes,
  webpageUrl: string
): ArchiveCreated {
  let archiveCreatedEvent = changetype<ArchiveCreated>(newMockEvent())

  archiveCreatedEvent.parameters = new Array()

  archiveCreatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  archiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )
  archiveCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "ipAddress",
      ethereum.Value.fromFixedBytes(ipAddress)
    )
  )
  archiveCreatedEvent.parameters.push(
    new ethereum.EventParam("pHash", ethereum.Value.fromFixedBytes(pHash))
  )
  archiveCreatedEvent.parameters.push(
    new ethereum.EventParam("webpageUrl", ethereum.Value.fromString(webpageUrl))
  )

  return archiveCreatedEvent
}
