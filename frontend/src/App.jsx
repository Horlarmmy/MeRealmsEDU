import { useLocation } from "react-router-dom";
import AIAssistantWidget from "./components/AIAssistantWidget";
import AppRoutes from "./AppRoutes";
import Footer from "./components/Footer";
import NavBar from "./components/Navbar";

import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  const isMemeDetails = location.pathname.includes("/meme/");

  return (
    <>
      <ToastContainer position="top-center" />
      <NavBar />
      <AppRoutes />
      <AIAssistantWidget memeDetails={isMemeDetails ? {} : null} />
      <Footer />
    </>
  );
}

export default App;

/*
{"_id":{"$oid":"6773eb3c3b9c81e3c12ccf59"},"name":"Zenoxis","desc":"New Token","createdBy":"Horlarmmy","imgUrl":"https://i.pinimg.com/originals/0a/bb/e5/0abbe546e479edc1eb62f5a8ccd66328.jpg","likes":["Current User","Horlarmmy"],"tips":{"$numberInt":"0"},"comments":[],"votes":{"$numberInt":"4"},"createdAt":{"$date":{"$numberLong":"1735650108481"}},"voters":["Current User","Horlarmmy"]}
{"_id":{"$oid":"67754375b608dbaa0a8e1c02"},"name":"MemeFi","desc":"New Token","createdBy":"Horlarmmy","imgUrl":"https://i.pinimg.com/originals/0a/bb/e5/0abbe546e479edc1eb62f5a8ccd66328.jpg","chain_id":{"$numberInt":"4"},"likes":["Horlarmmy","Current User"],"tips":{"$numberDouble":"0.01"},"comments":[{"user":"Horlarmmy","comment":"New tokens","createdAt":{"$date":{"$numberLong":"1735775041837"}}},{"user":"Horlarmmy","comment":"Hew Token","createdAt":{"$date":{"$numberLong":"1735775454678"}}}],"votes":{"$numberInt":"5"},"createdAt":{"$date":{"$numberLong":"1735738229107"}},"voters":["Current User","Horlarmmy"]}
{"_id":{"$oid":"677545b0b608dbaa0a8e1c03"},"name":"Catizen","desc":"Cat on MeRealms 🐈","createdBy":"Horlarmmy","imgUrl":"https://i.ytimg.com/vi/bJXqh377SfU/maxresdefault.jpg","chain_id":{"$numberInt":"5"},"likes":["Horlarmmy"],"tips":{"$numberDouble":"0.02"},"comments":[{"user":"Horlarmmy","comment":"New Token","createdAt":{"$date":{"$numberLong":"1735797687421"}}}],"votes":{"$numberInt":"2"},"createdAt":{"$date":{"$numberLong":"1735738800282"}},"voters":["Current User","Horlarmmy"]}
{"_id":{"$oid":"6775b42225f041a3d6cf54e6"},"name":"Random Meme","desc":"Just a random meme","createdBy":"Horlarmmy","imgUrl":"https://i.redd.it/ke53iac4gg331.jpg","chain_id":{"$numberInt":"6"},"likes":[],"tips":{"$numberInt":"0"},"comments":[],"votes":{"$numberInt":"0"},"createdAt":{"$date":{"$numberLong":"1735767074213"}}}
{"_id":{"$oid":"6775c4e78600151cdcc6bc27"},"name":"Mystic Aurora","desc":"A new mystic meme","createdBy":"Horlarmmy","imgUrl":"https://i.redd.it/ke53iac4gg331.jpg","chain_id":{"$numberInt":"7"},"likes":["Horlarmmy"],"tips":{"$numberDouble":"0.02"},"comments":[],"votes":{"$numberInt":"1"},"createdAt":{"$date":{"$numberLong":"1735771367176"}},"voters":["Horlarmmy"]}
{"_id":{"$oid":"67762c0f95051d97d4492a19"},"name":"MemeDAO","desc":"A new meme on MeRealms","createdBy":"Horlarmmy","imgUrl":"https://th.bing.com/th/id/R.cee97614a67d2907c4b25a7d83c16bc4?rik=TvVe5E4eVbB9tA&pid=ImgRaw&r=0","chain_id":{"$numberInt":"8"},"likes":["Horlarmmy"],"tips":{"$numberDouble":"0.02"},"comments":[{"user":"Horlarmmy","comment":"New Token","createdAt":{"$date":{"$numberLong":"1735797802045"}}}],"votes":{"$numberInt":"1"},"createdAt":{"$date":{"$numberLong":"1735797775482"}},"voters":["Horlarmmy"]}
*/
