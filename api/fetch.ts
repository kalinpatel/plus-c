import http from "axios";
import { parse } from "node-html-parser";

export default async function handler(request: any, response: any) {
  console.log(request.body.link);
  const data = await q_set(request.body.link);
  console.log(data);
  return response.status(200).json({ data });
}

const q_set = async (url: string) => {
  try {
    const raw_set = (
      await http.get(url, {
        headers: {
          Accept: "text/html",
        },
      })
    ).data;
    const root = parse(raw_set);

    const getText = (selector: any) => {
      return root?.querySelector(selector)?.childNodes[0].rawText;
    };

    const qArray = new Array();
    const qRoot = root.querySelector(".SetPageTerms-termsList") || root;

    for (let i = 0; i < qRoot.parentNode.childNodes[1].childNodes.length; i++) {
      qArray.push({
        term: qRoot.parentNode.childNodes[1].childNodes[i].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
          .childNodes[0].childNodes[0].childNodes[0].rawText,
        definition:
          qRoot.parentNode.childNodes[1].childNodes[i].childNodes[0]
            .childNodes[0].childNodes[0].childNodes[0].childNodes[1]
            .childNodes[0].childNodes[0].childNodes[0].childNodes[0].rawText,
      });
    }

    return {
      title: `${getText("title")}`,
      author: `${getText(".UserLink-username")}`,
      cards: qArray,
    };
  } catch (e) {
    console.log("Cannot Fetch the Quizlet Cards!");
    console.error(e);
  }
};
