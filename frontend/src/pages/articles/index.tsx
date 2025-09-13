import { GetServerSideProps, NextPage } from "next";
import SortableTable from "../../components/table/SortableTable";
import data from "../../utils/dummydata"; // 原始书目数据

interface ArticlesInterface {
  id: string;
  title: string;
  authors: string;
  source: string;
  pubyear: string;
  doi: string;
  claim: string;
  evidence: string;
  status: string; // 新增
}

type ArticlesProps = {
  articles: ArticlesInterface[];
};

const Articles: NextPage<ArticlesProps> = ({ articles }) => {
  const headers = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    { key: "source", label: "Source" },
    { key: "pubyear", label: "Publication Year" },
    { key: "doi", label: "DOI" },
    { key: "claim", label: "Claim" },
    { key: "evidence", label: "Evidence" },
    { key: "status", label: "Status" }, // 新增
  ];

  return (
    <div className="container">
      <h1>Articles Index Page</h1>
      <p>Page containing a table of articles:</p>
      <SortableTable headers={headers} data={articles} />
    </div>
  );
};

// 从后端拉取数据 + 合并本地 dummydata
export const getServerSideProps: GetServerSideProps<ArticlesProps> = async () => {
  let backendArticles: ArticlesInterface[] = [];

  try {
    const res = await fetch("http://localhost:3000/articles");
    const dataFromBackend = await res.json();

    backendArticles = dataFromBackend.map((article: any) => ({
      id: article._id ?? article.id,
      title: article.title,
      authors: Array.isArray(article.authors)
        ? article.authors.join(", ")
        : article.authors ?? "",
      source: article.source ?? "",
      pubyear: article.pubyear?.toString() ?? "",
      doi: article.doi ?? "",
      claim: article.claim ?? "",
      evidence: article.evidence ?? "",
      status: article.status ?? "pending", // 默认 pending
    }));
  } catch (error) {
    console.error("Failed to fetch backend articles:", error);
  }

  // 合并本地数据和后端数据
  const articles = [
    ...data.map((article) => ({
      id: article.id ?? "",
      title: article.title,
      authors: article.authors,
      source: article.source,
      pubyear: article.pubyear,
      doi: article.doi,
      claim: article.claim,
      evidence: article.evidence,
      status: "N/A", // 本地 dummydata 没有状态，用 N/A
    })),
    ...backendArticles,
  ];

  return { props: { articles } };
};

export default Articles;
