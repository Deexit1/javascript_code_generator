// import { Inter } from "@next/font/google";
import classes from "../styles/Home.module.css";
// import Highlight from "react-highlight";
import { useEffect, useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Lottie from "lottie-react";
import Loader from "../public/loader.json";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Logo from "../public/logo.png";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const [inputText, setInputText] = useState("");

  const [loading, setLoading] = useState(false);
  const [dataToShow, setDataToShow] = useState("");

  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const handleChange = (e) => setInputText(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `"${inputText}"\nFind the code language.
      Check the error from the above code and and give the correct error.
      Check if any vulnerabiliy is there.
      Give the response in this format:
      Language:
      Error( Fill error section only if any error is there):
      Improved Code:
      Vulnrability:`,
      temperature: 0,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    let data = response.data.choices[0].text.split("\n");
    console.log(data);
    setLoading(false);
    setDataToShow(data);
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.heading}>
        <Image src={Logo} alt="Logo" width={300} />
      </div>
      <div className={classes.box}>
        <div className={classes.form}>
          <textarea
            className={classes.text}
            value={inputText}
            onChange={handleChange}
            rows="4"
            placeholder="Put your code here..."
          />
          <button
            type="submit"
            className={classes.button}
            onClick={() => handleSubmit()}
            disabled={loading}
          >
            Get Analyzed
          </button>
        </div>
        <div className={classes.code}>
          {loading && (
            <Lottie animationData={Loader} className={classes.loader} />
          )}
          {!loading && (
            <div className={classes.codespace} language="javascript">
              {dataToShow &&
                dataToShow.map((line, i) => {
                  return (
                    <div className={classes.line} key={i}>
                      {line}
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
