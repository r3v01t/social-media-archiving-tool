import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import { ArchiveCreated } from "../generated/schema"
import { ArchiveCreated as ArchiveCreatedEvent } from "../generated/Contract/Contract"
import { handleArchiveCreated } from "../src/contract"
import { createArchiveCreatedEvent } from "./contract-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let timestamp = BigInt.fromI32(234)
    let ipAddress = Bytes.fromI32(1234567890)
    let pHash = Bytes.fromI32(1234567890)
    let webpageUrl = "Example string value"
    let newArchiveCreatedEvent = createArchiveCreatedEvent(
      user,
      timestamp,
      ipAddress,
      pHash,
      webpageUrl
    )
    handleArchiveCreated(newArchiveCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ArchiveCreated created and stored", () => {
    assert.entityCount("ArchiveCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ArchiveCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ArchiveCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )
    assert.fieldEquals(
      "ArchiveCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ipAddress",
      "1234567890"
    )
    assert.fieldEquals(
      "ArchiveCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pHash",
      "1234567890"
    )
    assert.fieldEquals(
      "ArchiveCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "webpageUrl",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
