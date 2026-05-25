import React, { useState } from 'react'
import { useBalance, useEnsName, useBlockNumber, usePublicClient } from 'wagmi'
import { formatEther } from 'viem'

const CHAIN_COLORS = {
  1: { bg: 'bg-blue-500/20', border: 'border-blue-500/40', text: 'text-blue-400', dot: 'bg-blue-400' },
  137: { bg: 'bg-purple-500/20', border: 'border-purple-500/40', text: 'text-purple-400', dot: 'bg-purple-400' },
  10: { bg: 'bg-red-500/20', border: 'border-red-500/40', text: 'text-red-400', dot: 'bg-red-400' },
  42161: { bg: 'bg-sky-500/20', border: 'border-sky-500/40', text: 'text-sky-400', dot: 'bg-sky-400' },
  8453: { bg: 'bg-blue-600/20', border: 'border-blue-600/40', text: 'text-blue-300', dot: 'bg-blue-300' },
  11155111: { bg: 'bg-yellow-500/20', border: 'border-yellow-500/40', text: 'text-yellow-400', dot: 'bg-yellow-400' },
}

const DEFAULT_CHAIN_STYLE = { bg: 'bg-green-500/20', border: 'border-green-500/40', text: 'text-green-400', dot: 'bg-green-400' }

function truncateAddress(addr) {
  if (!addr) return ''
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`
}

export default function WalletDashboard({ address, chain }) {
  const [copied, setCopied] = useState(false)
  const chainStyle = CHAIN_COLORS[chain?.id] || DEFAULT_CHAIN_STYLE

  const { data: balance, isLoading: balanceLoading } = useBalance({ address })
  const { data: ensName } = useEnsName({ address, chainId: 1 })
  const { data: blockNumber } = useBlockNumber({ watch: true })

  const handleCopy = () => {
    if (!address) return
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const formattedBalance = balance
    ? parseFloat(formatEther(balance.value)).toFixed(4)
    : null

  return (
    <div className="w-full max-w-2xl mx-auto animate-slide-up">
      {/* Connected badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
          </span>
          <span className="text-sm text-green-400 font-medium">Wallet Connected</span>
        </span>
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-white/10 bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-2xl">
        {/* Card header */}
        <div className="px-6 pt-6 pb-5 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Wallet Address</p>
              {ensName && (
                <p className="text-lg font-semibold text-brand-400 mb-0.5">{ensName}</p>
              )}
            </div>
            <button
              onClick={handleCopy}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                copied
                  ? 'bg-green-500/20 text-green-400 border border-green-500/40'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                    <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Address display */}
          <div className="bg-black/30 rounded-xl p-4 border border-white/5">
            <p className="font-mono text-white text-sm sm:text-base break-all leading-relaxed">
              {address}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 divide-x divide-white/10">
          {/* Network */}
          <div className="px-5 py-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Network</p>
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-medium ${chainStyle.bg} ${chainStyle.border} ${chainStyle.text}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${chainStyle.dot}`} />
              {chain?.name || 'Unknown'}
            </div>
            <p className="text-xs text-gray-600 mt-2">Chain ID: {chain?.id ?? '—'}</p>
          </div>

          {/* Balance */}
          <div className="px-5 py-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Balance</p>
            {balanceLoading ? (
              <div className="h-6 w-24 rounded-md bg-white/10 animate-pulse" />
            ) : formattedBalance !== null ? (
              <>
                <p className="text-lg font-bold text-white tabular-nums">
                  {formattedBalance}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{balance?.symbol}</p>
              </>
            ) : (
              <p className="text-sm text-gray-600">—</p>
            )}
          </div>

          {/* Block number */}
          <div className="px-5 py-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Block</p>
            {blockNumber ? (
              <>
                <p className="text-lg font-bold text-white tabular-nums">
                  #{blockNumber.toString()}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse-slow" />
                  Live
                </p>
              </>
            ) : (
              <div className="h-6 w-20 rounded-md bg-white/10 animate-pulse" />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-6 py-4 border-t border-white/10 ${chainStyle.bg}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              You control your keys
            </div>
            {chain?.blockExplorers?.default?.url && (
              <a
                href={`${chain.blockExplorers.default.url}/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity ${chainStyle.text}`}
              >
                View on Explorer
                <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Truncated address hint */}
      <p className="text-center text-xs text-gray-600 mt-4">
        Short address: <span className="font-mono text-gray-500">{truncateAddress(address)}</span>
        {ensName && <span className="ml-2">· ENS: <span className="text-brand-400">{ensName}</span></span>}
      </p>
    </div>
  )
}
