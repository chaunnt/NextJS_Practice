import { Provider } from 'react-redux'
import { useStore } from '../store'
import { Container } from 'next/app'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import CommentsFacebook from './../components/CommentsFacebook'
import GlobalStyles from "./../public/GlobalStyles";
import theme from "./../public/theme";
import Header from "./../components/Header"
import { toast, ToastContainer } from 'react-toastify'
import "./../styles/header.scss"
import "./../styles/detail.scss"
import "./../styles/home.scss"
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/styles.scss";
import "./../styles/searchAdvance.scss"
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <Container>
      <Provider store={store}>

        <MuiThemeProvider theme={theme}>
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            position={toast.POSITION.TOP_RIGHT}
            style={{ zIndex: 1000 }}
          />
          <CssBaseline />
          <GlobalStyles />
          <Header />
          {/* <body> */}
          <Component {...pageProps} />
          <CommentsFacebook />
          <div className="zalo-chat-widget" data-oaid="1525463065982785123" data-welcome-message="Xin chào, Bạn cần mình hỗ trợ gì ?" data-autopopup="0" data-width="350" data-height="420"></div>
          {/* </body> */}
        </MuiThemeProvider>

      </Provider>

    </Container>
  )
}
