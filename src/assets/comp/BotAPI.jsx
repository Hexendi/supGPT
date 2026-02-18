import React, { useState } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";

function BotAPI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question) return;

    setLoading(true);
    try {
      const res = await axios.post("https://supnum.onrender.com/api/ask", {
        question,
      });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error(err);
      setAnswer("Oooh sorry, something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div style={{padding:"1rem"}}>
        <div style={{textAlign:"center"}}>
        <h2>welcom to supGPT</h2>
        <p>how can i help you mister</p>
        </div>
        <br></br>

        <div style={{background:"#0091ff16",padding:"20px",borderRadius:"10px",height:"100%",border: "1px solid #64b9ff89"}}>
        
            {loading ? <p>Loading...</p> : <><p style={{background:"#0091ff16",marginBottom:"10px" ,padding:"20px",borderRadius:"10px",border: "1px solid #64b9ff89"}}>you: {question}</p> <p>Answer: {answer}</p></>}
        </div>
        <br></br>
     <div>
        <div style={{display:"flex",justifyContent:"centre",alignContent:"center",gap:"10px"}}>
           <input
           type="text"
           value={question}
           onChange={(e) => setQuestion(e.target.value)}
           placeholder="Ask something..." style={{}}
           />
           <button style={{background:"#0040ffc5",padding:"1px",borderRadius:"10px",width:"100px",height:"50px"}} onClick={handleSend} >
             <IoSend/>
           </button>
        </div>
    </div>
     
    </div>

    // <div>
    //   <h2>Welcome to SUPGPT </h2>
    //   <p>how can i help you </p>

    //    <AsksupGPT question={question} setAnswer={setAnswer} trigger={sendTrigger} />
    //   <footer className="botinput" style={{display:"flex",alignItems:"center"}}>
    //     <input
    //       type="text"
    //       value={question}
    //       onChange={(e) => setQuestion(e.target.value)}
    //     />
    //     <IoSend onClick={handleSend} />
    //     <button onClick={handleSend}></button>
    //     <AsksupGPT question={question} setAnswer={setAnswer} trigger={sendTrigger} />
    //   </footer>
    // </div>
  );
}

export default BotAPI;