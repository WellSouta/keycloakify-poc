import type { ClassKey } from 'keycloakify/login'
import DefaultTemplate from 'keycloakify/login/Template'
import { Suspense, lazy } from 'react'
import type { KcContext } from './KcContext'
import Template from './Template'
import { useI18n } from './i18n'

const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const DefaultPage = lazy(() => import('keycloakify/login/DefaultPage'))
const UserProfileFormFields = lazy(() => import('keycloakify/login/UserProfileFormFields'))

export default function KcPage(props: { kcContext: KcContext }) {
  const { kcContext } = props
  const { i18n } = useI18n({
    kcContext
  })

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case 'login.ftl':
            return (
              <Login
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss
              />
            )

          case 'register.ftl':
            return (
              <Register
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                UserProfileFormFields={UserProfileFormFields}
                doUseDefaultCss
                doMakeUserConfirmPassword
              />
            )

          default:
            return (
              <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={DefaultTemplate}
                UserProfileFormFields={UserProfileFormFields}
                doUseDefaultCss
                doMakeUserConfirmPassword
              />
            )
        }
      })()}
    </Suspense>
  )
}

const classes = {} satisfies {
  [key in ClassKey]?: string
}
