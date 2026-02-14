

import { IoGitNetworkOutline } from 'react-icons/io5';
import { PiCodeDuotone } from "react-icons/pi";
import { BiStats } from "react-icons/bi";

import { useState, useRef, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

import DarkM from "./assets/comp/DMode";


import './App.css'



function AddComment({ comments }) {
  return (
 <div style={{ padding: "10px", marginBottom: "10px" }}>
      {comments.map((item, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex" }}>
            <img
              src="userprofile.jpg"
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }}
              alt="user"
            />
            <div>
              <h3>{item.name}</h3>
              <p>{item.name}@supnum.mr</p>
            </div>
          </div>
          <p>{item.comment}</p>
          <p>@__{item.tag}</p>
        </div>
      ))}
    </div>
  );
}


function App() {
  const [comments, setComments] = useState([]);
  const nameRef = useRef();
  const commentRef = useRef();
  const tagRef = useRef();

  const commentsCollection = collection(db, "comments");


  useEffect(() => {
    const q = query(commentsCollection, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    });
    return () => unsubscribe(); 
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nameRef.current.value || !commentRef.current.value) return;

    await addDoc(commentsCollection, {
      name: nameRef.current.value,
      comment: commentRef.current.value,
      tag: tagRef.current.value || "",
      timestamp: new Date()
    });

    nameRef.current.value = "";
    commentRef.current.value = "";
    tagRef.current.value = "";
  };

  return (
    <>
    <div className='top-bar'>
      <div>
        <img src='https://supnum.mr/wp-content/uploads/2025/06/logo-supnum.png' id="logo"></img>
      </div>
      <div>
      <ul>
        <li>Accuiel</li>
        <li>Formations </li>
        <li>A propos</li>
        <li>srtaf</li>
        <li>Actulaite</li>
      </ul>
      <DarkM />
      </div>
     </div>

     <header>
      <div className='headertitle'>
        <div>
         <h1>SUPNUM</h1>
          <p>Pôle d’excellence pour les métiers du numérique</p>
        </div>
        <br></br>
        <h2>Nos spécialités</h2>
        <p>Créé en septembre  2021 par décret présidentiel, SupNum a pour mission de former les cadres moyens supérieurs dans les métiers du numérique : développement, réseaux, systèmes, sécurité et communication numérique.</p>
         <br></br>
      </div>
     </header>
      <div className='infoimg'>
        <div>
          <h2>Formations en Fibre Optique && dweb desg :</h2>
          <p>L’Organisation Internationale de la Francophonie (OIF) dans le cadre de son Programme « D-CLIC Formez- vous au numérique », annonce le lancement d’une formation professionnelle pour 300 jeunes Mauritaniens dans deux secteurs en plein essor : la fibre optique et le développement web & design</p>
        </div>
    
         <br></br>
      </div>
      <div className='school'>
        <div className='bg'></div>
          <div className='child'>
          <h2>supnum instaiti</h2>
          <p>instute réé en septembre  2021 par décret présidentiel, SupNum a pour mission de former les cadres moyens supérieurs dans les métiers du numérique : développement, réseaux, systèmes, sécurité et communication numérique. supernumer numer hou sjosfj uto fsjojfsfs</p>
          </div>
      </div>
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
    <br></br>
    <div style={{display:"flex", flexWrap:"wrap"}}>
         <div className='headerdesc' style={{flex:"1 10 250px"}}>
            <p>Formations professionnalisantes en développement, réseaux, multimédia & développement informatique .</p>
            <button>Inscrivez-vous</button>
         </div>
   <div>
       <h2>comment</h2>
       <p>your comment please</p>
        <br></br>
     <div className='comments'>
      <form onSubmit={handleSubmit}>
        <label>name</label>
        <input ref={nameRef} placeholder="Name" required/>
         <label>comment</label>
        <input ref={commentRef} placeholder="Comment" required />
         <label>tags</label>
        <input ref={tagRef} placeholder="@Tag"/>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
      <div id="profile">
        <AddComment comments={comments} />
      </div>
    </div>
    </>
  )
}

export default App
