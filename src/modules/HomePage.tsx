
import { useState } from "react";
;
import Header from "./views/Header";
import GreetingsSection from "./views/GreetingsSection";
import MainSection from "./views/MainSection";

export default function HomePage() {
  const [openAddCard, setOpenAddCard] = useState(false)//The state to control whether the add new task should show
 
  const handleOpenAddCard = () =>{
    setOpenAddCard(true)
  }

  const closeOpenAddCard = () => {
    setOpenAddCard(false)
  }
  return (
    <div>
      <Header />
      <GreetingsSection handleOpenAddCard={handleOpenAddCard}/>
      <MainSection openAddCard={openAddCard} closeOpenAddCard={closeOpenAddCard}/>
    </div>
  );
}
