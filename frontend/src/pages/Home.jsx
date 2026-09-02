import Navbar from "../components/Navbar/Navbar.jsx";
import Hero from "../components/Hero/Hero";
import ApiExplorer from "../components/ApiExplorer/ApiExplorer";
// import CodeGenerator from "../components/CodeGenerator/CodeGenerator";
// import Footer from "../components/Footer/Footer";

function Home() {
  return (
    <>
      
       <Hero />
      { <ApiExplorer />}
     
      {/* <Footer />  */}
    </>
  );
}

export default Home;