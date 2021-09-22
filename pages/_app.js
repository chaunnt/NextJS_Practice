import { Provider } from 'react-redux'
import { useStore } from '../store'
import { Container } from 'next/app'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import CommentsFacebook from './../components/CommentsFacebook'
import GlobalStyles from "./../public/GlobalStyles";
import theme from "./../public/theme";
import Header from "./../components/Header"
import { toast, ToastContainer } from 'react-toastify'
import '../styles/main.scss'
import "./../styles/header.scss"
import "./../styles/home.scss"
import "normalize.css";
import "./../styles/styles.scss";
import "./../styles/searchAdvance.scss"
import './../styles/detail.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    // <Container>
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

        <Component {...pageProps} />
        <CommentsFacebook />

      </MuiThemeProvider>

    </Provider>
    // </Container>
  )
}
