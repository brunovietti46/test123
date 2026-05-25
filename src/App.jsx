import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useBalance, useEnsName, useBlockNumber } from 'wagmi'
import { formatEther } from 'viem'
import WalletDashboard from './components/WalletDashboard.jsx'

export default function App() {
  const { address, isConnected, chain } = useAccount()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600 rounded-full opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-800 rounded-full opacity-5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="border-b border-white/10 backdrop-blur-sm bg-gray-950/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <span className="font-semibold text-white text-lg tracking-tight">WalletView</span>
            </div>
            <ConnectButton />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          {isConnected ? (
            <WalletDashboard address={address} chain={chain} />
          ) : (
            <LandingView />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 py-4 text-center">
          <p className="text-xs text-gray-600">Powered by RainbowKit · wagmi · viem</p>
        </footer>
      </div>
    </div>
  )
}

function LandingView() {
  return (
    <div className="text-center max-w-lg mx-auto animate-fade-in">
      {/* Icon */}
      <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center mb-8 shadow-2xl shadow-brand-500/30">
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18-3a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3m18 0V6" />
        </svg>
      </div>

      <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
        Connect Your Wallet
      </h1>
      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        Connect any EVM-compatible wallet to view your address, network details, and balance.
      </p>

      {/* Supported wallets */}
      <div className="flex items-center justify-center gap-3 mb-10 flex-wrap">
        {['MetaMask', 'Coinbase', 'Rainbow', 'WalletConnect', 'Trust'].map((wallet) => (
          <span
            key={wallet}
            className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400"
          >
            {wallet}
          </span>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🔐', label: 'Secure', desc: 'Non-custodial' },
          { icon: '⚡', label: 'Fast', desc: 'Instant connect' },
          { icon: '🌐', label: 'Multi-chain', desc: '6 networks' },
        ].map(({ icon, label, desc }) => (
          <div key={label} className="rounded-xl bg-white/5 border border-white/10 p-4">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-sm font-medium text-white">{label}</div>
            <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
