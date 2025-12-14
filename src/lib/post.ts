import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostsData() : {
    id: string;
    title: string;
    date: string;
    thumbnail?: string;
}[] {
    if (!fs.existsSync(postsDirectory)) {
        console.warn("posts directory not found:", postsDirectory);
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        };
    });
    return allPostsData;
}

// getSaticPathsでreturnで使うpathを取得する
export function getAllPostIds() : { params: { id: string } }[] {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        };
    });
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id: string) : Promise<{
    id: string;
    blogContentHtml: string;
    title: string;
    date: string;
    thumbnail?: string;
}> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const blogContent = await remark()
        .use(html)
        .process(matterResult.content);
    const blogContentHtml = blogContent.toString();
    return {
        id,
        blogContentHtml,
        ...matterResult.data,
    };
}