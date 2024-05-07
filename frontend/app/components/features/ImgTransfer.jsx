import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import React from "react";
import Image from "next/image";

// 自定义的组件来处理图片
const targetImage = ({ src, alt }) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={700} // 根据需要设定宽度
            height={400} // 根据需要设定高度
            layout="responsive"
        />
    );
};

const processImg = (markdownText) => {
    const processor = unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeReact, {
            createElement: React.createElement,
            components: {
                img: targetImage, // 将img标签替换为MyImage组件
            },
        });

    return processor.processSync(markdownText).result;
};

export default processImg;
