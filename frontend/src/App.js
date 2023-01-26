import { useState } from "react"
import './App.css';
import axios, { formToJSON } from "axios";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import 'ace-builds/src-noconflict/theme-cobalt';

function App() {
  const [lang, setLang] = useState('js')
  const [code, setCode] = useState("");
  const [op, setOp] = useState("");
  const [compiled, setCompiled] = useState(true)
  const langMap = {
    "js" : "javascript",
    "py" : "python"
  }
  const run  = async () => {
    console.log(code, lang);
    const url = "http://localhost:5000/run";
    axios.post(url, {
      lang: lang,
      code: code
    }).then((response) => {
      let data = response?.data?.data;
      console.log(data)
      setOp(data?.output);
      setCompiled(true)
    }).catch((error) => {
      console.log(error?.request?.response)
      console.log(error?.request)
      let res = JSON.parse(error?.request?.response)
      console.log(res)
      console.log(error?.request)
      setOp(res?.data?.error?.stderr)
      setCompiled(false)
    })
  }
  function onChange(newValue) {
    setCode(newValue)
  }
  return (
    <div className="App">
      <center>
        <h1 style={{ color: "#fff" }}>Welcome to your own compiler</h1>
      </center>
      {/* <textarea rows={30} cols={100} value={code} onChange={(e) => setCode(e.target.value)}></textarea> */}
      <div className="main-body">
        <div className="editor-space">
          <div className="helper-bar">
            <div style={{ display: "flex" }}>
              <div className="lang">
                <img onClick={() => setLang("js")} style={lang === "js" ? { width: 60, height: 60 } : null} alt="js" src="https://imgs.search.brave.com/H4pIdYMAme1di27SUCv61oTSX_jZ0eSDuzomjq2lsRw/rs:fit:1052:1052:1/g:ce/aHR0cDovLzMuYnAu/YmxvZ3Nwb3QuY29t/Ly1QVHR5M0NmVEdu/QS9UcFpPRWpUUV9X/SS9BQUFBQUFBQUFl/by9LZUt0X0Q1WDJ4/by9zMTYwMC9qcy5q/cGc" />
              </div>
              <div className="lang">
                <img onClick={() => setLang("py")} style={lang === "py" ? { width: 60, height: 60 } : null} alt="py" src="https://imgs.search.brave.com/kf5C_mPABmxNcK2BZQj-YGbePhB3ZCnLENNTGprfEt8/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2ltZy5j/b20vdGh1bWIvYW5k/cm9pZC83MjUzNy1p/Y29ucy1weXRob24t/cHJvZ3JhbW1pbmct/Y29tcHV0ZXItc29j/aWFsLXR1dG9yaWFs/LnBuZw" />
              </div>
            </div>
            <button className="run-btn" onClick={run}>Run</button>
          </div>
          <AceEditor
            mode={langMap[lang]}
            theme="cobalt"
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            width="100%"
            height="75vh"
            enableLiveAutocompletion={true}
            enableSnippets={true}
            setOptions={{
              fontSize: 16,
              fixedWidthGutter: true
            }}
          />
        </div>
        <div className="output-space">
          <div style={{ alignItems: "center", display: "flex", height: "10vh", marginLeft: 10 }}>
            <h3 style={{ color: "#fff" }}>Output:</h3>
          </div>
          <div className="terminal">
            <p style={{ whiteSpace: "pre-line", paddingLeft: 15, fontFamily: "Ubuntu", color: compiled ? "#fff" : "red" }}>
              {op}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
