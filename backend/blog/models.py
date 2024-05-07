from email.mime import image

from django.contrib.auth import get_user_model as user_model
from django.db import models, transaction
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from modelcluster.contrib.taggit import ClusterTaggableManager
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from modelcluster.models import ClusterableModel
from mptt.models import MPTTModel, TreeForeignKey
from pypinyin import lazy_pinyin
from requests import head
from streams import blocks as stream_blocks
from taggit.models import ItemBase, TagBase
from wagtail.admin.panels import (
    FieldPanel,
    FieldRowPanel,
    HelpPanel,
    InlinePanel,
    MultiFieldPanel,
    ObjectList,
    PageChooserPanel,
    TabbedInterface,
    TitleFieldPanel,
)
from wagtail.api import APIField
from wagtail.fields import RichTextField, StreamField

# Create your models here.
from wagtail.models import Orderable, Page, Revision, Task, TaskState
from wagtail.search import index
from wagtail.snippets.models import register_snippet
from wagtailmarkdown.fields import MarkdownField

from .serializers import (
    BlogCategoriesField,
    BlogTagsField,
    MDContentField,
    MDContentHeadings,
    StreamFieldHeadings,
)
from wagtail_headless_preview.models import HeadlessPreviewMixin

User = user_model()


# Create your models here.
# TODO: 动态模板


@register_snippet
class BlogCategory(MPTTModel, ClusterableModel, models.Model):
    name = models.CharField(max_length=80, verbose_name="目录")
    slug = models.SlugField(max_length=80, verbose_name="目录别名", unique=True)
    order = models.PositiveIntegerField(default=0, blank=False, null=False)
    description = models.TextField(blank=True, null=True, verbose_name="描述")
    image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
        verbose_name="图片",
    )
    svg = models.TextField(blank=True, null=True, verbose_name="SVG")
    parent = TreeForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE,
        verbose_name="父目录",
    )

    class Meta:
        verbose_name = "目录"
        verbose_name_plural = "目录"
        ordering = ["order", "name"]

    def __str__(self):
        names = []
        category = self
        while category is not None:
            names.append(category.name)
            category = category.parent
        return " / ".join(reversed(names))

    class MPTTMeta:
        order_insertion_by = ["name"]

    api_fields = [
        APIField("id"),
        APIField("name"),
        APIField("slug"),
        APIField("parent"),
        APIField("order"),
        APIField("description"),
        APIField("image"),
        APIField("svg"),
    ]


@register_snippet
class BlogTag(TagBase):
    class Meta:
        verbose_name = "Blog tag"

    def save(self, *args, **kwargs):
        # 如果slug为空或需要更新slug时
        if not self.slug or self.slug_is_derived_from_name():
            # 使用pypinyin将中文转换为拼音
            pinyin_string = "".join(lazy_pinyin(self.name))
            # 使用Django的slugify处理拼音字符串
            self.slug = slugify(pinyin_string)
        super(BlogTag, self).save(*args, **kwargs)

    def slug_is_derived_from_name(self):
        # 检查当前slug是否由name转换而来
        return slugify("".join(lazy_pinyin(self.name))) == self.slug

    api_fields = [
        APIField("id"),
        APIField("name"),
        APIField("slug"),
    ]


@register_snippet
class TaggedBlog(ItemBase):
    tag = models.ForeignKey(
        BlogTag, related_name="tagged_blogs", on_delete=models.CASCADE
    )
    content_object = ParentalKey(
        to="blog.BlogPage", on_delete=models.CASCADE, related_name="tagged_items"
    )
    api_fields = [
        APIField("tag"),
        APIField("content_object"),
    ]


class BlogPage(HeadlessPreviewMixin, Page):
    template = "blog/detail.html"
    subpage_types = []
    parent_page_types = ["blog.BlogPageIndex"]
    tags = ClusterTaggableManager(through="blog.TaggedBlog", blank=False, help_text="")
    categories = ParentalManyToManyField("blog.BlogCategory", blank=False)
    header_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=False,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    content = StreamField(
        [
            ("richtext", stream_blocks.RichText()),
        ],
        use_json_field=True,
        blank=True,
    )
    md_content = MarkdownField(blank=True, null=True, verbose_name="Markdown内容")
    view_count = models.PositiveIntegerField(default=0, verbose_name="浏览量")
    search_fields = Page.search_fields + [
        index.SearchField("content"),
        index.SearchField("title"),
        index.SearchField("md_content"),
        index.SearchField("search_description"),
        index.SearchField("seo_title"),
    ]

    def get_context(self, request):
        context = super().get_context(request)
        return context

    def serializer_heading_tags(self, content):
        headings = []
        if not content:
            return headings
        for block in content:
            if block.block_type == "richtext":
                print(block.value.get("value").get("headings"))
        return headings

    content_panels = Page.content_panels + [
        FieldPanel("tags", heading="关键词"),
        FieldPanel("categories", heading="目录"),
        FieldPanel("header_image", heading="头图"),
        FieldPanel("content", heading="内容"),
        FieldPanel("md_content", heading="Markdown内容"),
    ]

    def get_absolute_url(self):
        return self.url

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Blog page"
        verbose_name_plural = "Blog page"

    api_fields = [
        APIField("tags", serializer=BlogTagsField()),
        APIField("categories", serializer=BlogCategoriesField()),
        APIField("header_image"),
        APIField("content"),
        APIField("md_content", serializer=MDContentField()),
        APIField("seo_title"),
        APIField("search_description"),
        # APIField(
        #     "published_date_display",
        #     serializer=DateField(format="%A %d %B %Y", source="first_published_at"),
        # ),
        # APIField("tagged_blogs"),
        APIField("headings", serializer=StreamFieldHeadings(source="content")),
        APIField("owner"),
        APIField("view_count"),
        APIField("md_headings", serializer=MDContentHeadings(source="md_content")),
        APIField("last_published_at"),
    ]


class BlogPageView(models.Model):
    blog_page = models.ForeignKey(
        BlogPage, on_delete=models.CASCADE, related_name="views"
    )
    ip_address = models.GenericIPAddressField(
        null=True, blank=True, verbose_name="IP地址"
    )
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, blank=True, verbose_name="用户"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Blog page view"
        verbose_name_plural = "Blog page views"

    def __str__(self):
        return self.blog_page.title


class BlogPageIndex(Page):
    intro = RichTextField(blank=True, verbose_name="简介")
    template = "blog/index.html"
    max_count = 1
    subpage_types = ["blog.BlogPage"]

    api_fields = [
        APIField("intro"),
    ]

    def get_context(self, request):
        context = super().get_context(request)
        context["blog_pages"] = BlogPage.objects.live().order_by("-first_published_at")
        return context

    class Meta:
        verbose_name = "Blog index"
        verbose_name_plural = "Blog indexes"


class CategoryIndexPage(Page):
    template = "blog/category_index.html"
    max_count = 1
    subpage_types = ["blog.BlogPage"]

    def get_context(self, request):
        context = super().get_context(request)
        context["categories"] = BlogCategory.objects.all()
        return context

    class Meta:
        verbose_name = "Category index"
        verbose_name_plural = "Category indexes"
