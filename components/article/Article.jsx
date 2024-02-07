import React, { useEffect, useState } from "react";

function Article({ results }) {
  const [cleanStr, setCleanStr] = useState({
    title: "",
    summary: "",
    benefits: "",
    actionable: "",
  });

  console.log(cleanStr);

  useEffect(() => {
    let titleIntroSplit = results.split("Introduction:");
    let introBenefitsSplit = titleIntroSplit[1].split("Benefits:");
    let benefits = introBenefitsSplit[1].split("Actionable item:");
    let benefitSplit = benefits[0].split("\n");

    setCleanStr({
      title: titleIntroSplit[0].trim(),
      summary: introBenefitsSplit[0].trim(),
      benefits: benefitSplit.map((x, i) => (
        <h1 className="m-2" key={i}>
          {x}
        </h1>
      )),

      actionable: benefits[1].trim(),
    });
  }, [results]);

  return (
    <div className="w-1/2">
      <h1>{cleanStr.title}</h1>
    </div>
  );
}

export default Article;
