import './Template.css'

import { kcSanitize } from 'keycloakify/lib/kcSanitize'
import { useInitialize } from 'keycloakify/login/Template.useInitialize'
import type { TemplateProps } from 'keycloakify/login/TemplateProps'
import { getKcClsx } from 'keycloakify/login/lib/kcClsx'
import { clsx } from 'keycloakify/tools/clsx'
import { useSetClassName } from 'keycloakify/tools/useSetClassName'
import { useEffect } from 'react'
import type { KcContext } from './KcContext'
import type { I18n } from './i18n'

export default function Template(props: TemplateProps<KcContext, I18n>) {
  const {
    displayInfo = false,
    displayMessage = true,
    displayRequiredFields = false,
    headerNode,
    socialProvidersNode = null,
    infoNode = null,
    documentTitle,
    bodyClassName,
    kcContext,
    i18n,
    doUseDefaultCss,
    classes,
    children
  } = props

  const { kcClsx } = getKcClsx({ doUseDefaultCss, classes })

  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n

  const { realm, auth, url, message, isAppInitiatedAction } = kcContext

  // biome-ignore lint/correctness/useExhaustiveDependencies: ejected from keycloakify
  useEffect(() => {
    document.title = documentTitle ?? msgStr('loginTitle', kcContext.realm.displayName)
  }, [])

  useSetClassName({
    qualifiedName: 'html',
    className: kcClsx('kcHtmlClass')
  })

  useSetClassName({
    qualifiedName: 'body',
    className: bodyClassName ?? kcClsx('kcBodyClass')
  })

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss })

  if (!isReadyToRender) {
    return null
  }

  return (
    <div className={kcClsx('kcLoginClass')}>
      <div id="kc-header" className={kcClsx('kcHeaderClass')}>
        <div id="kc-header-wrapper" className={kcClsx('kcHeaderWrapperClass')}>
          {/* Logo */}
          <span />
          {/* Title */}
          <h1>{msg('loginTitleHtml', realm.displayNameHtml)}</h1>
          {/* Subtitle */}
          <p>{msg('loginSubtitleHtml')}</p>
        </div>
      </div>
      <div className={kcClsx('kcFormCardClass')}>
        <header className={kcClsx('kcFormHeaderClass')}>
          {(() => {
            const node = !(auth?.showUsername && !auth.showResetCredentials) ? (
              <h1 id="kc-page-title">{headerNode}</h1>
            ) : (
              <div id="kc-username" className={kcClsx('kcFormGroupClass')}>
                <label id="kc-attempted-username">{auth.attemptedUsername}</label>
                <a
                  id="reset-login"
                  href={url.loginRestartFlowUrl}
                  aria-label={msgStr('restartLoginTooltip')}
                >
                  <div className="kc-login-tooltip">
                    <i className={kcClsx('kcResetFlowIcon')} />
                    <span className="kc-tooltip-text">{msg('restartLoginTooltip')}</span>
                  </div>
                </a>
              </div>
            )

            if (displayRequiredFields) {
              return (
                <div className={kcClsx('kcContentWrapperClass')}>
                  <div className={clsx(kcClsx('kcLabelWrapperClass'), 'subtitle')}>
                    <span className="subtitle">
                      <span className="required">*</span>
                      {msg('requiredFields')}
                    </span>
                  </div>
                  <div className="col-md-10">{node}</div>
                </div>
              )
            }

            return node
          })()}
        </header>
        <div id="kc-content">
          <div id="kc-content-wrapper">
            {/* Social providers */}
            {socialProvidersNode}

            {/* App-initiated actions should not see warning messages about the need to complete the action during login. */}
            {displayMessage &&
              message !== undefined &&
              (message.type !== 'warning' || !isAppInitiatedAction) && (
                <div
                  className={clsx(
                    `alert-${message.type}`,
                    kcClsx('kcAlertClass'),
                    `pf-m-${message?.type === 'error' ? 'danger' : message.type}`
                  )}
                >
                  <div className="pf-c-alert__icon">
                    {message.type === 'success' && (
                      <span className={kcClsx('kcFeedbackSuccessIcon')} />
                    )}
                    {message.type === 'warning' && (
                      <span className={kcClsx('kcFeedbackWarningIcon')} />
                    )}
                    {message.type === 'error' && <span className={kcClsx('kcFeedbackErrorIcon')} />}
                    {message.type === 'info' && <span className={kcClsx('kcFeedbackInfoIcon')} />}
                  </div>
                  <span
                    className={kcClsx('kcAlertTitleClass')}
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: ejected from keycloakify
                    dangerouslySetInnerHTML={{
                      __html: kcSanitize(message.summary)
                    }}
                  />
                </div>
              )}

            {/* Page */}
            {children}

            {auth?.showTryAnotherWayLink && (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                <div className={kcClsx('kcFormGroupClass')}>
                  <input type="hidden" name="tryAnotherWay" value="on" />
                  <a
                    href="#"
                    id="try-another-way"
                    onClick={() => {
                      document.forms['kc-select-try-another-way-form' as never].submit()
                      return false
                    }}
                  >
                    {msg('doTryAnotherWay')}
                  </a>
                </div>
              </form>
            )}

            {displayInfo && (
              <div id="kc-info" className={kcClsx('kcSignUpClass')}>
                <div id="kc-info-wrapper" className={kcClsx('kcInfoAreaWrapperClass')}>
                  {infoNode}
                </div>
              </div>
            )}

            {/* Language */}
            {enabledLanguages.length > 1 && (
              <div className={kcClsx('kcLocaleMainClass')} id="kc-locale">
                <div id="kc-locale-wrapper" className={kcClsx('kcLocaleWrapperClass')}>
                  <div
                    id="kc-locale-dropdown"
                    className={clsx('menu-button-links', kcClsx('kcLocaleDropDownClass'))}
                  >
                    <button
                      tabIndex={1}
                      type="button"
                      id="kc-current-locale-link"
                      aria-label={msgStr('languages')}
                      aria-haspopup="true"
                      aria-expanded="false"
                      aria-controls="language-switch1"
                    >
                      {currentLanguage.label}
                    </button>
                    <ul
                      role="menu"
                      tabIndex={-1}
                      aria-labelledby="kc-current-locale-link"
                      aria-activedescendant=""
                      id="language-switch1"
                      className={kcClsx('kcLocaleListClass')}
                    >
                      {enabledLanguages.map(({ languageTag, label, href }, i) => (
                        <li
                          key={languageTag}
                          className={kcClsx('kcLocaleListItemClass')}
                          role="none"
                        >
                          <a
                            role="menuitem"
                            id={`language-${i + 1}`}
                            className={kcClsx('kcLocaleItemClass')}
                            href={href}
                          >
                            {label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}