const slugify = require("slugify");

import React from "react";
import ReactMarkdown from "react-markdown";
import { DefaultLayout } from "./Layout";
import ItemWithComma from "./ItemWithComma";

export default function BlogPost(props: { preview?: any; blogPost?: any }) {
  const { blogPost } = props;
  let preview = false;
  if (props.preview != undefined) {
    preview = props.preview;
  }
  let tagroot = "/blog/tag/";
  let frontmatter = {
    title: blogPost.frontmatter.title,
    breadcrumbs: blogPost.frontmatter.title + " | News",
    description: blogPost.excerpt,
  };
  let showimage = true;
  let isSvg = false;
  if (blogPost.frontmatter.featured_image == undefined) {
    blogPost.frontmatter.featured_image = { title: "", src: "", alt: "" };
    showimage = false;
  } else {
    if (blogPost.frontmatter.featured_image.src.endsWith(".svg")) {
      isSvg = true;
    }
    frontmatter.image = blogPost.frontmatter.featured_image.src;
  }
  if (blogPost.frontmatter.tags == undefined) {
    blogPost.frontmatter.tags = [];
  }

  return (
    <DefaultLayout frontmatter={frontmatter} preview={preview}>
      <div
        style={{ display: showimage ? "block" : "none" }}
        className="relative pb-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative shadow-xl rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              {!isSvg && (
                <img
                  className="h-full w-full"
                  src={blogPost.frontmatter.featured_image.src}
                />
              )}
              <div className="flex absolute inset-0 backdrop-blur-md">
                <img
                  className="m-auto object-cover h-full"
                  src={blogPost.frontmatter.featured_image.src}
                  title={blogPost.frontmatter.featured_image.title}
                  alt={blogPost.frontmatter.featured_image.alt}
                />
              </div>
            </div>
            <div className="relative px-6 py-40"></div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h2 className="text-3xl font-bold">{blogPost.frontmatter.title}</h2>
        <p className="text-md font-medium text-kodi prose prose-blue">
          {blogPost.frontmatter.tags.map((tag: string, index: any) => {
            return (
              <ItemWithComma
                key={index}
                description={tag}
                index={index}
                url={tagroot + slugify(tag, { lower: true })}
                length={blogPost.frontmatter.tags.length - 1}
                linkType="internal"
              />
            );
          })}
          &nbsp;
        </p>
      </div>
      <div className="mt-3 flex items-center">
        <div>
          <p className="text-lg font-medium text-gray-900">
            {blogPost.frontmatter.author}
          </p>
          <div className="flex space-x-1 text-lg text-gray-500">
            <span>{blogPost.frontmatter.date}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{blogPost.timeToRead} min read</span>
          </div>
        </div>
      </div>

      <ReactMarkdown className="pt-6 prose prose-blue max-w-none">
        {blogPost.rawMarkdownBody}
      </ReactMarkdown>
    </DefaultLayout>
  );
}
