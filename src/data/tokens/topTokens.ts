import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'

export const TOP_TOKENS = gql`
  query topPools {
    tokens(first: 200, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
    }
  }
`

interface TopTokensResponse {
  tokens: {
    id: string
  }[]
}

/**
 * Fetch top addresses by volume
 */
export function useTopTokenAddresses(): {
  loading: boolean
  error: boolean
  addresses: string[] | undefined
} {
  const { loading, error, data } = useQuery<TopTokensResponse>(TOP_TOKENS)

  const formattedData = useMemo(() => {
    if (data) {
      return data.tokens.map((t) => t.id)
    } else {
      return undefined
    }
  }, [data])

  return {
    loading: loading,
    error: Boolean(error),
    addresses: formattedData,
  }
}
