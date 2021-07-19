import { AppBar, Toolbar, useMediaQuery, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'src/i18n';
import HeaderProjectLogo from './Header-Project-Logo';
import HeaderMenuContainer from './header-menu/Header-Menu-Container';
import HeaderMenuItem from './header-menu/Header-Menu-Item';
import HeaderLanguageChooser from './Header-Language-Chooser';

/**
 * @interface IProps Component's props interface.
 */
interface IProps { }

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
        marginBottom: '3em'
    },
    root: {
        backgroundColor: '#000000',
    },
    freeEstimateBtn: {
        borderRadius: '50px',
        marginLeft: '25px',
        marginRight: '25px'
    }
}));

/**
 * @function HeaderAppbar Header custom appbar.
 * @returns JSX that renders header navigation bar.
 */
const HeaderAppbar: React.FC<IProps> = () => {
    const classes = useStyles();
    const [tabValue, setTabValue] = useState(0);
    const [langcode, setLangcode] = useState('cs');
    const { t } = useTranslation(['public/skeleton/header/appbar']);

    // Responsivity
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    /**
     * @function handleActiveTabChange Change active indicator for appbar navigation.
     * @param value Value of newly selected page.
     */
    const handleActiveTabChange = (e, value) => {
        setTabValue(value);
    };

    const handleChangeLangcode = () => {
        if (langcode === 'cs') {
            setLangcode('en');
        } else {
            setLangcode('cs');
        }
    };

    /**
     *  Navigation for desktop variant of the application.
     */
    const desktopTabs = (
        <HeaderMenuContainer tabValue={tabValue}>
            <HeaderMenuItem
                label={t('home')}
                url='/'
                value={0}
                handleActiveTabChange={handleActiveTabChange} />

            <HeaderMenuItem
                label={t('aboutus')}
                url='/aboutus'
                value={1}
                handleActiveTabChange={handleActiveTabChange} />

            <HeaderMenuItem
                label={t('contact_us')}
                url='/contactus'
                value={2}
                handleActiveTabChange={handleActiveTabChange} />

            <HeaderLanguageChooser langCode={langcode} changeLang={handleChangeLangcode} />

        </HeaderMenuContainer>
    );

    useEffect(() => {
        if (window.location.pathname === '/' && tabValue !== 0) {
            setTabValue(0);
        } else if (window.location.pathname === '/aboutus' && tabValue !== 1) {
            setTabValue(1);
        } else if (window.location.pathname === '/contactus' && tabValue !== 2) {
            setTabValue(2);
        }
    }, []);

    return (
        <>
            <AppBar color='secondary' className={classes.root}>
                <Toolbar>
                    <HeaderProjectLogo />
                    {matches ? null : desktopTabs}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}></div>
        </>
    );
};

export default HeaderAppbar;
