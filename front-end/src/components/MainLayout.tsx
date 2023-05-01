import { ReactNode } from "react";
import Footer from "./Footer"
import Header from "./Header"

type Props = {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default MainLayout