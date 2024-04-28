import { ArchiveCreated as ArchiveCreatedEvent } from "../generated/WebArchive/WebArchive"
import { ArchiveCreated } from "../generated/schema"

export function handleArchiveCreated(event: ArchiveCreatedEvent): void {
  let entity = new ArchiveCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.timestamp = event.params.timestamp
  entity.ipAddress = event.params.ipAddress
  entity.pHash = event.params.pHash
  entity.webpageUrl = event.params.webpageUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
