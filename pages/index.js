import { Inter } from "@next/font/google";
import classes from "../styles/Home.module.css";
import Highlight from "react-highlight";
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Lottie from "lottie-react";
import Loader from "../public/loader.json";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const [inputText, setInputText] = useState("");

  const [loading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState("");

  console.log(process.env.SECRET_KEY);
  const configuration = new Configuration({
    apiKey: process.env.SECRET_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleChange = (e) => setInputText(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${inputText} in js`,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setLoading(false);
    setDataToShow(response.data.choices[0].text);
  };

  return (
    <div className={classes.box}>
      <div className={classes.form}>
        <h3 className={classes.heading}>Get desired javascript code</h3>
        <textarea
          className={classes.text}
          value={inputText}
          onChange={handleChange}
          rows="4"
          placeholder="Get a function snippet"
        />
        <button
          type="submit"
          className={classes.button}
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Get Code
        </button>
      </div>
      <div className={classes.code}>
        {loading && (
          <Lottie animationData={Loader} className={classes.loader} />
        )}
        {!loading && (
          <Highlight className={classes.codespace} language="javascript">
            {dataToShow}
          </Highlight>
        )}
      </div>
    </div>
  );
}
