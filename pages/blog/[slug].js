import fs from "fs";
import matter from "gray-matter";
import path from "path";
import Link from "next/link";

import React from "react";
import { marked } from "marked";

const Slug = ({ frontmatter: { title, date, cover_image }, slug, content }) => {
  return (
    <>
      {" "}
      <Link href={"/"}>
        <a className="btn btn-back">Go Back</a>
      </Link>{" "}
      <div className="card card-page">
        <h1 className="post-title"> {title} </h1>
        <div className="post-date"> Posted On {date} </div>
        <img src={cover_image} alt="" />
        <div className="post-body">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => {
    const slug = filename.replace(".md", "");
    return {
      params: {
        slug,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markedWithMatter = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markedWithMatter);

  return {
    props: {
      slug,
      frontmatter,
      content,
    },
  };
}

export default Slug;
