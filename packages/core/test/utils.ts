import { createTestClient, http } from 'viem'

import { createConfig } from '../src/index.js'
import { chains } from './constants.js'

export const testClient = createTestClient({
  chain: chains.anvil,
  mode: 'anvil',
  transport: http(),
})

export const config = createConfig({
  chains: [chains.anvil, chains.anvilTwo],
  connectors: [],
  pollingInterval: 100,
  reconnectOnMount: false,
  storage: null,
  transports: {
    [chains.anvil.id]: http(),
    [chains.anvilTwo.id]: http(),
  },
})
