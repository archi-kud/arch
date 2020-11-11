import UILogo from '@components/ui/Logo/Logo';
import UILink from '@components/ui/Link/Link';
import UIIcon from '@components/ui/Icon/Icon';
import UILayoutLoader from '@components/ui/LayoutLoader/LayoutLoader';
import UISpinner from '@components/ui/Spinner/Spinner';

customElements.define('ui-logo', UILogo);
customElements.define('ui-link', UILink, { extends: 'a' });
customElements.define('ui-icon', UIIcon);
customElements.define('ui-layout-loader', UILayoutLoader);
customElements.define('ui-spinner', UISpinner);

export {
    UILogo,
    UILink,
    UIIcon,
    UILayoutLoader,
    UISpinner
};