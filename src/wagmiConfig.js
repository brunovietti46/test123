import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from 'wagmi/chains'

// WalletConnect projectId — set VITE_WALLETCONNECT_PROJECT_ID in your env for full WC support.
// Without a valid projectId, MetaMask / Coinbase / injected wallets still work fine.
const PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b54d35f7b7b64be4cd614ea63bb3e3c8'

export const config = getDefaultConfig({
  appName: 'RainbowKit Wallet',
  projectId: PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false,
})
