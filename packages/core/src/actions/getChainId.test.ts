import { describe, expect, test } from 'vitest'

import { chains } from '../../test/constants.js'
import { config } from '../../test/index.js'
import { getChainId, watchChainId } from './getChainId.js'

describe('getChainId', () => {
  test('default', async () => {
    expect(getChainId(config)).toEqual(chains.anvil.id)
    config.setState((x) => ({ ...x, chainId: chains.anvilTwo.id }))
    expect(getChainId(config)).toEqual(chains.anvilTwo.id)
  })
})

describe('watchChainId', () => {
  test('default', async () => {
    const chainIds: number[] = []
    const unwatch = watchChainId(config, {
      onChange: (chainId) => chainIds.push(chainId),
    })
    config.setState((x) => ({ ...x, chainId: chains.anvilTwo.id }))
    config.setState((x) => ({ ...x, chainId: chains.anvil.id }))
    config.setState((x) => ({ ...x, chainId: 69 }))

    expect(chainIds).toMatchInlineSnapshot(`
      [
        123,
        69,
      ]
    `)

    unwatch()
  })
})
