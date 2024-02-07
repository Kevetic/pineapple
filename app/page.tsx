"use client";
import Image from "next/image";
import Google from "@/public/google.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useResults } from "./api/openAi/useResults";
import { ReloadIcon } from "@radix-ui/react-icons";
import Article from "@/components/article/Article";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState();
  const { getQuestions, isLoading, results, setIsLoading } = useResults();
  return (
    <>
      {!results ? (
        <main className="flex  flex-col items-center justify-around p-24">
          <Image src={Google} alt="sudoGoo" priority className="w-2/5" />
          <Input
            placeholder=""
            className="w-2/5"
            onChange={(e) => setInputValue(e.target.value as any)}
          />
          {isLoading && !results ? (
            <Button disabled className="m-5">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              className="m-5"
              onClick={() => {
                getQuestions(inputValue as any), setIsLoading(true);
              }}
            >
              Goxgle Search
            </Button>
          )}
        </main>
      ) : (
        <Article results={results} />
      )}
    </>
  );
}
