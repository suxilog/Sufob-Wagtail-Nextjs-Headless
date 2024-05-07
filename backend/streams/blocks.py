from wagtail import blocks


class RichText(blocks.RichTextBlock):
    class Meta:
        template = "streams/richtext.html"
        icon = "doc-full"
        label = "RichText"
