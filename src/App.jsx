//import { useState } from 'react';
import { IoGitNetworkOutline } from 'react-icons/io5';
import { PiCodeDuotone } from "react-icons/pi";
import { BiStats } from "react-icons/bi";
import DarkM from "./assets/comp/DMode";


import './App.css'

function App() {
  

  return (
    <>
    <div className='top-bar'>
      <div>
        <img src='https://supnum.mr/wp-content/uploads/2025/06/logo-supnum.png'></img>
      </div>
      <div>
      <ul>
        <li>Accuiel</li>
        <li>Formations </li>
        <li>A propos</li>
        <li>srtaf</li>
        <li>Actulaite</li>
        <DarkM />
      </ul>
      </div>
     </div>

     <header>
      <div className='headertitle'>
         <h1>SUPNUM</h1>
          <p>Pôle d’excellence pour les métiers du numérique</p>
      </div>
         <div className='headerdesc'>
            <p>Formations professionnalisantes en développement, réseaux, multimédia & développement informatique .</p>
            <button>Inscrivez-vous</button>
            
         </div>

      
     </header>

     <br></br>
    
    <div className='cards'>
     <div className='card'>
      <div>
        <IoGitNetworkOutline className='i' />
        <h1>Réseaux, Systèmes et Sécurité</h1>
        <p>Formez‑vous aux compétences clés du numérique : réseaux, cybersécurité, systèmes, développement et intelligence artificielle,<br></br> et soyez immédiatement opérationnel dans un environnement technologique en constante évolution.</p>
      </div>
     </div>
     <div className='card'>
      <div>
        <PiCodeDuotone className='i' />
        <h1>Développement des Systèmes Informatiques</h1>
        <p>Acquérez les compétences pour créer, déployer et maintenir des systèmes et applications performants, fiables et <br></br> adaptés aux besoins des entreprises modernes.</p>
      </div>
     </div>
     <div className='card'>
      <div>
        <BiStats className='i' />
        <h1>Ingénierie des Données et Statistiques</h1>
        <p>Devenez expert en collecte, traitement et analyse des données. Transformez les informations brutes en insights exploitables pour la prise de décision stratégique.</p>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
