from collections import defaultdict

import bleach
import markdown
from django.conf import settings
from django.utils.encoding import smart_str
from django.utils.safestring import mark_safe
from wagtailmarkdown.constants import DEFAULT_BLEACH_KWARGS, SETTINGS_MODE_OVERRIDE
from wagtailmarkdown.mdx.inlinepatterns import ImageExtension, LinkExtension
from wagtailmarkdown.mdx.linker import LinkerExtension
from wagtailmarkdown.utils import (
    _get_bleach_kwargs,
    _get_markdown_kwargs,
    _sanitise_markdown_html,
)


def _transform_markdown_into_html(text):
    a = markdown.markdown(smart_str(text), **_get_markdown_kwargs())
    return a


def sufob_render_markdown(text, context=None):
    """
    Turn markdown into HTML.
    """
    markdown_html = _transform_markdown_into_html(text)
    sanitised_markdown_html = _sanitise_markdown_html(markdown_html)
    # note: we use mark_safe here because bleach is already sanitising the HTML
    return mark_safe(sanitised_markdown_html)  # noqa: S308
