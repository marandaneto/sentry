import React from 'react';
import styled from '@emotion/styled';

import {t} from 'app/locale';
import ConfigStore from 'app/stores/configStore';
import Link from 'app/components/links/link';
import Hook from 'app/components/hook';
import getDynamicText from 'app/utils/getDynamicText';
import space from 'app/styles/space';

const Footer = () => {
  const config = ConfigStore.getConfig();
  return (
    <footer>
      <div className="container">
        <div className="pull-right">
          <FooterLink className="hidden-xs" to="/api/" external>
            {t('API')}
          </FooterLink>
          <FooterLink to="/docs/" external>
            {t('Docs')}
          </FooterLink>
          <FooterLink
            className="hidden-xs"
            to="https://github.com/getsentry/sentry"
            external
          >
            {t('Contribute')}
          </FooterLink>
          {config.isOnPremise && (
            <FooterLink className="hidden-xs" to="/out/" external>
              {t('Migrate to SaaS')}
            </FooterLink>
          )}
        </div>
        {config.isOnPremise && (
          <div className="version pull-left">
            {'Sentry '}
            {getDynamicText({
              fixed: 'Acceptance Test',
              value: config.version.current,
            })}
            <Build>
              {getDynamicText({
                fixed: 'test',
                value: config.version.build.substring(0, 7),
              })}
            </Build>
          </div>
        )}
        <a href="/" tabIndex={-1} className="icon-sentry-logo" />
        <Hook name="footer" />
      </div>
    </footer>
  );
};

const FooterLink = styled(Link)`
  &.focus-visible {
    outline: none;
    box-shadow: ${p => p.theme.blue} 0 2px 0;
  }
`;

const Build = styled('span')`
  font-size: ${p => p.theme.fontSizeRelativeSmall};
  color: ${p => p.theme.gray1};
  font-weight: bold;
  margin-left: ${space(1)};
`;

export default Footer;
