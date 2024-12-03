import type { ExtendKcContext } from 'keycloakify/login'
import type { KcEnvName, ThemeName } from '../kc.gen'

export type KcContextExtension = {
  themeName: ThemeName
  properties: Record<KcEnvName, string> & {}
}

// biome-ignore lint/complexity/noBannedTypes: for later use
export type KcContextExtensionPerPage = {
  // todo
}

export type KcContext = ExtendKcContext<KcContextExtension, KcContextExtensionPerPage>
