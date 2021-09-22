import HomeHeader from '@/widgets/header-home'
import HomeFooter from '@/widgets/footer-home'

const HomeLayout = (props: any) => {
  return (
    <>
      <HomeHeader />

      <main>
        {props.children}
      </main>

      <HomeFooter />
    </>
  )
}

export default HomeLayout
