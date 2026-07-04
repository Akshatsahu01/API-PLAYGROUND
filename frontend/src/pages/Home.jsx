import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero";
import ApiExplorer from "../components/ApiExplorer/ApiExplorer";
// import CodeGenerator from "../components/CodeGenerator/CodeGenerator";
// import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
       <Hero />
      { <ApiExplorer />}
      {/* {<CodeGenerator /> } */}
      {/* <Footer />  */}
    </>
  );
}

export default Home;