import React from 'react'
import { AppProps } from 'next/app'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { themes } from '../theme/themes'
import { NextComponentType, NextPageContext } from 'next'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { I18nextProvider } from 'react-i18next'
import i18next from '../translations/i18next'
import '@/styles/main.scss'
import 'sweetalert2/src/sweetalert2.scss'
import Header from '@/widgets/header'
import DefaultLayout from 'src/frameworks/layouts/default'

interface MyAppProps extends AppProps {
  Component: {
    Layout?: React.ExoticComponent<{
      children?: React.ReactNode;
    }>;
  } & NextComponentType<NextPageContext, any, {}>;
}

interface Props {
  LangList: []
}

export default function App({ Component, pageProps }: MyAppProps) {
  const Layout = Component.Layout || React.Fragment
  const { LangList }: Props = pageProps;
  
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <ThemeProvider theme={themes.light}>
          <Wrapper>
            <GlobalStyles />
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </Wrapper>
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  )
}

const Wrapper = styled.div`
  button{
    background: ${(props) => props.theme.primary};
  }
`

// Reset default browser styling
const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html {
    min-height: 100vh;
  }

  body {
    min-height: 100vh;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  #__next {
    min-height: 100vh;
  }
`
