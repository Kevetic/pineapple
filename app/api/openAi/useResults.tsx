import { useState } from "react";
import axios from "axios";

export const useResults = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState();

  const getQuestions = async (message: any) => {
    try {
      const requestQuestion = `Spin up an entire fictitious page of about ${message}, make sure to make it as credible and real as possible. Remove any fictious from the editorial piece and make it sound like a harvard peer review, Create a title, add minimal of 4 NUMBERED bullets in the body, end with an actionable item making it sound encouraging and promising for the future follow this template:
      
      Title: 

      Introduction:


      Benefits:
      • 
      • 
      • 
      • 

      Actionable item:`;

      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      };
      const data = {
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: requestQuestion }],
      };

      const response = await axios.post(url, data, { headers: headers });
      const res = await response.data.choices[0].message.content;
      setResults(res);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    getQuestions,
    results,
    setIsLoading,
  };
};
