// This file is auto-generated by the `update-kc-gen` command. Do not edit it manually.
// Hash: d9e8e43fc9bbdcb9f480388cd8b452fa7e285a2e9cc8d6679b06162a894ce16b

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

import { type ReactNode, Suspense, lazy } from 'react'

export type ThemeName = 'keycloakify-poc'

export const themeNames: ThemeName[] = ['keycloakify-poc']

export type KcEnvName = never

export const kcEnvNames: KcEnvName[] = []

export const kcEnvDefaults: Record<KcEnvName, string> = {}

/**
 * NOTE: Do not import this type except maybe in your entrypoint.
 * If you need to import the KcContext import it either from src/login/KcContext.ts or src/account/KcContext.ts.
 * Depending on the theme type you are working on.
 */
export type KcContext = import('./login/KcContext').KcContext

declare global {
  interface Window {
    kcContext?: KcContext
  }
}

export const KcLoginPage = lazy(() => import('./login/KcPage'))

export function KcPage(props: { kcContext: KcContext; fallback?: ReactNode }) {
  const { kcContext, fallback } = props
  return (
    <Suspense fallback={fallback}>
      {(() => {
        switch (kcContext.themeType) {
          case 'login':
            return <KcLoginPage kcContext={kcContext} />
        }
      })()}
    </Suspense>
  )
}
