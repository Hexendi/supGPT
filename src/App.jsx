import { IoGitNetworkOutline } from 'react-icons/io5';
import { PiCodeDuotone } from "react-icons/pi";
import { GrMultimedia } from "react-icons/gr";
import { GoStack } from "react-icons/go";
import { BsRobot } from "react-icons/bs";
import { GoPaperAirplane } from "react-icons/go";
import { PiSealCheckFill } from "react-icons/pi";
import { BiStats } from "react-icons/bi";
import { IoMenu, IoClose } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { Link } from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react';
import { db } from "../server/firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import './App.css';

function AddComment({ comments }) {
  return (
    <div className="comments-list">
      {comments.length === 0 && (
        <p style={{ padding: "20px", color: "var(--text-muted)", fontSize: "13px" }}>
          No comments yet.
        </p>
      )}
      {comments.map((item, index) => (
        <div key={index} className="comment-item">
          <div className="comment-user">
            <img src="userprofile.jpg" className="avatar" alt="user" />
            <div>
              <div className="comment-name">
                {item.name.endsWith("CTW") ? item.name.slice(0, -3) : item.name}
                {item.name.endsWith("CTW") && (
                  <PiSealCheckFill style={{ color: "#f59e0b", fontSize: "13px" }} />
                )}
              </div>
              <div className="comment-email">
                {item.name.endsWith("CTW") ? item.name.slice(0, -3) : item.name}@supnum.mr
              </div>
            </div>
          </div>
          <p className="comment-body">{item.comment}</p>
          {item.tag && (
            <p className="comment-tag">@to_ {item.tag}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [botcomment, setBotcomment] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [comments, setComments] = useState([]);
  const nameRef = useRef();
  const commentRef = useRef();
  const tagRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBotcomment(true);
      setTimeout(() => setBotcomment(false), 4000);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [darkMode]);

  const commentsCollection = collection(db, "comments");

  useEffect(() => {
    const q = query(commentsCollection, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    
      <nav className="top-bar">
        <Link to="/">
          <img src="https://supnum.mr/wp-content/uploads/2025/06/logo-supnum.png" id="logo" alt="Supnum" />
        </Link>

        <ul className="nav-links">
          <li><Link to="/">Accueil</Link></li>
          <li><a href="#formations">Formations</a></li>
          <li><a href="#about">À propos</a></li>
          <li><a href="#comments">Actualité</a></li>
          <li><Link to="/bot">supGPT</Link></li>
        </ul>

        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle theme"
          >
            <MdOutlineWbSunny />
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoClose /> : <IoMenu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link>
          <a href="#formations" onClick={() => setMenuOpen(false)}>Formations</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>À propos</a>
          <a href="#comments" onClick={() => setMenuOpen(false)}>Actualité</a>
          <Link to="/bot" onClick={() => setMenuOpen(false)}>supGPT</Link>
        </div>
      )}

      <div className="page">

    
        <section className="hero" id="about">
          <div className="hero-tag">SUPNUM INSTITUTE — EST. 2021</div>
          <h1>Pôle d'excellence pour<br /><span>les métiers du numérique</span></h1>
          <p>
            Créé par décret présidentiel, SupNum forme les cadres supérieurs dans les métiers du numérique : développement, réseaux, systèmes, sécurité et communication numérique.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-val">5</span>
              <span className="stat-label">Licences</span>
            </div>
            <div className="stat">
              <span className="stat-val">2</span>
              <span className="stat-label">Masters</span>
            </div>
            <div className="stat">
              <span className="stat-val">2021</span>
              <span className="stat-label">Fondé</span>
            </div>
            <div className="stat">
              <span className="stat-val">300+</span>
              <span className="stat-label">Étudiants</span>
            </div>
          </div>
        </section>

    
        <div className="info-band">
          <h2>Formations OIF — Fibre Optique & Web Design</h2>
          <p>
            L'Organisation Internationale de la Francophonie (OIF), dans le cadre de « D-CLIC », lance une formation professionnelle pour 300 jeunes Mauritaniens dans deux secteurs en plein essor : la fibre optique et le développement web & design.
          </p>
        </div>

       
        <section id="formations">
          <div className="section-header">
            <h2>Licences</h2>
          </div>

          <div className="cards">
            <div className="card">
              <div className="card-icon"><IoGitNetworkOutline /></div>
              <h3>Réseaux, Systèmes et Sécurité</h3>
              <p>Réseaux, cybersécurité, systèmes et intelligence artificielle. Opérationnel dès la sortie.</p>
              <span className="card-tag">RSS</span>
            </div>
            <div className="card">
              <div className="card-icon"><PiCodeDuotone /></div>
              <h3>Développement des Systèmes Informatiques</h3>
              <p>Création, déploiement et maintenance de systèmes et applications modernes.</p>
              <span className="card-tag">DSI</span>
            </div>
            <div className="card">
              <div className="card-icon"><BiStats /></div>
              <h3>Ingénierie des Données et Statistiques</h3>
              <p>Collecte, traitement et analyse des données pour la prise de décision.</p>
              <span className="card-tag">IDS</span>
            </div>
          </div>

          <details>
            <summary>Voir d'autres spécialités</summary>
            <div className="cards">
              <div className="card">
                <div className="card-icon"><GrMultimedia /></div>
                <h3>Communication Numérique et Multimédia</h3>
                <p>Design graphique, médias interactifs et contenus digitaux engageants.</p>
                <span className="card-tag">DWM</span>
              </div>
              <div className="card">
                <div className="card-icon"><BsRobot /></div>
                <h3>Ingénierie des Systèmes Intelligents</h3>
                <p>Systèmes automatisés et intelligents intégrant logiciels, matériels et capteurs.</p>
                <span className="card-tag">IOT</span>
              </div>
              <div className="card">
                <div className="card-icon"><GoStack /></div>
                <h3>Masters</h3>
                <p>Intelligence Artificielle (AI) et Cybersécurité (CYS) pour aller plus loin.</p>
                <span className="card-tag">AI / CYS</span>
              </div>
            </div>
          </details>
        </section>

      
        <section id="comments">
          <div className="section-header">
            <h2>Communauté</h2>
          </div>

          <div className="bottom-grid">
            {/* CTA */}
            <div className="cta-panel">
              <h3>Rejoindre SupNum</h3>
              <p>Formations professionnalisantes en développement, réseaux, multimédia et data science.</p>
              <a href="https://supnum.mr" target="_blank" rel="noreferrer">
                <button>Inscrivez-vous</button>
              </a>
            </div>

        
            <div>
              <div className="comments">
                <form onSubmit={handleSubmit}>
                  <label>Nom</label>
                  <input ref={nameRef} placeholder="Votre nom" required />
                  <label>Commentaire</label>
                  <input ref={commentRef} placeholder="Votre commentaire" required />
                  <label>Tag</label>
                  <input ref={tagRef} placeholder="@tag (optionnel)" />
                  <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    <GoPaperAirplane /> Envoyer
                  </button>
                </form>
              </div>
            </div>

            
            <div>
              <AddComment comments={comments} />
            </div>
          </div>
        </section>

      </div>

     
      {botcomment && (
        <div className="bot-popup">
          <h3>supGPT en ligne</h3>
          <p>Posez vos questions sur les cours, horaires et spécialités de SupNum.</p>
          <Link to="/bot">
            <button>Ouvrir le chat</button>
          </Link>
        </div>
      )}

      
      <Link to="/bot">
        <div className="bot-fab">
          <BsRobot />
        </div>
      </Link>
    </>
  );
}

export default App;
