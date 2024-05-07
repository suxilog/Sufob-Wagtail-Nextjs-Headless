import re

import bleach
import markdown
from bs4 import BeautifulSoup
from lxml import html
from markdown import markdown
from rest_framework.fields import Field

from .utils import sufob_render_markdown


class StreamFieldHeadings(Field):

    def to_representation(self, value):
        api_context = value.stream_block.get_api_representation(value, self.context)
        headers = []

        for context_item in api_context:
            if context_item and "value" in context_item:
                tree = html.fromstring(context_item["value"])
                headings = tree.xpath("//h1|//h2|//h3|//h4|//h5|//h6")
                for heading in headings:
                    text = heading.xpath("string(.)").strip()
                    # 使用正则表达式移除特殊字符
                    id = "-".join(re.sub(r"[^\w\s-]", "", text).lower().split())
                    headers.append(
                        {
                            "text": text,
                            "tag": heading.tag,
                            "id": id,
                            "dataBlockKey": heading.get("data-block-key", None),
                        }
                    )
        return headers


class BlogTagsField(Field):
    def to_representation(self, value):
        return [{"name": tag.name, "slug": tag.slug} for tag in value.all()]


class BlogCategoriesField(Field):
    def to_representation(self, value):
        return [
            {"id": category.id, "name": category.name, "slug": category.slug}
            for category in value.all()
        ]


class MDContentField(Field):
    def to_representation(self, value):
        html_content = sufob_render_markdown(value)
        soup = BeautifulSoup(html_content, "html.parser")
        for img in soup.find_all("img"):
            new_tag = soup.new_tag("SufobMDImagePlaceholder")
            new_tag["src"] = img["src"]
            new_tag["alt"] = img.get("alt", "")
            img.replace_with(new_tag)
        return str(soup)


class MDContentHeadings(Field):
    def to_representation(self, value):
        rendered_html = sufob_render_markdown(value)
        tree = html.fromstring(rendered_html)
        md_headers = []
        headings = tree.xpath("//h1|//h2|//h3|//h4|//h5|//h6")
        for heading in headings:
            text = heading.xpath("string(.)").strip()
            id = heading.get(
                "id", "-".join(re.sub(r"[^\w\s-]", "", text).lower().split())
            )
            md_headers.append(
                {
                    "text": text,
                    "tag": heading.tag,
                    "id": id,
                    "dataBlockKey": heading.get("data-block-key", None),
                }
            )
        return md_headers
