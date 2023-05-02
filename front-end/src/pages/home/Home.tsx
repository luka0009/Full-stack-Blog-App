import MainLayout from "../../components/MainLayout"
import Articles from "./container/Articles"
import Hero from "./container/Hero"

const Home = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
    </MainLayout>
  )
}

export default Home