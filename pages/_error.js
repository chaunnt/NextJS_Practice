import Error from 'next/error';


function PageError({ statusCode }) {
  return <Error statusCode={statusCode}></Error>;
}

PageError.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default PageError;