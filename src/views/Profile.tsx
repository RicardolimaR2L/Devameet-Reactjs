import { Header } from '../component/general/Header'
import { Footer } from '../component/general/Footer'
import { ActioHeader } from '../component/general/ActioHeader'

export const Profile = () => {
  return (
    <>
      <Header />
      <div className="container-profile">
        <ActioHeader />
      </div>
      <Footer />
    </>
  )
}
