from blog.models import BlogCategory, BlogTag
from wagtail.api.v2.filters import FieldsFilter
from wagtail.api.v2.utils import BadRequestError
from wagtail.api.v2.views import BaseAPIViewSet
from wagtail.api.v2.views import PagesAPIViewSet

from wagtail_headless_preview.models import PagePreview
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType


class BlogCategoryAPIViewSet(BaseAPIViewSet):
    model = BlogCategory
    known_query_parameters = BaseAPIViewSet.known_query_parameters.union(["slug"])

    listing_default_fields = BaseAPIViewSet.listing_default_fields + [
        "name",
        "slug",
        "order",
        "description",
        "image",
        "svg",
        "parent",
    ]

    filter_backends = BaseAPIViewSet.filter_backends + [FieldsFilter]

    def check_query_parameters(self, queryset):
        """
        Ensure that only valid query parameters are included in the URL.
        """
        query_parameters = set(self.request.GET.keys())
        # All query parameters must be either a database field or an operation
        allowed_query_parameters = set(
            self.get_available_fields(queryset.model, db_fields_only=True)
        ).union(self.known_query_parameters)
        unknown_parameters = query_parameters - allowed_query_parameters
        if unknown_parameters:
            raise BadRequestError(
                "query parameter is not an operation or a recognised field: %s"
                % ", ".join(sorted(unknown_parameters))
            )


class BlogTagAPIViewSet(BaseAPIViewSet):
    model = BlogTag
    # body_fields = BaseAPIViewSet.body_fields + ["slug"]
    known_query_parameters = BaseAPIViewSet.known_query_parameters.union(["slug"])

    listing_default_fields = BaseAPIViewSet.listing_default_fields + ["name", "slug"]
    filter_backends = BaseAPIViewSet.filter_backends + [FieldsFilter]

    def check_query_parameters(self, queryset):
        """
        Ensure that only valid query parameters are included in the URL.
        """
        query_parameters = set(self.request.GET.keys())
        print(query_parameters)
        print(self.get_available_fields(queryset.model, db_fields_only=True))
        # All query parameters must be either a database field or an operation
        allowed_query_parameters = set(
            self.get_available_fields(queryset.model, db_fields_only=True)
        ).union(self.known_query_parameters)
        unknown_parameters = query_parameters - allowed_query_parameters
        if unknown_parameters:
            raise BadRequestError(
                "query parameter is not an operation or a recognised field: %s"
                % ", ".join(sorted(unknown_parameters))
            )


class PagePreviewAPIViewSet(PagesAPIViewSet):
    known_query_parameters = PagesAPIViewSet.known_query_parameters.union(
        ["content_type", "token"]
    )

    def listing_view(self, request):
        # Delegate to detail_view, specifically so there's no
        # difference between serialization formats.
        self.action = "detail_view"
        return self.detail_view(request, 0)

    def detail_view(self, request, pk):
        page = self.get_object()
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    def get_object(self):
        app_label, model = self.request.GET["content_type"].split(".")
        content_type = ContentType.objects.get(app_label=app_label, model=model)

        page_preview = PagePreview.objects.get(
            content_type=content_type, token=self.request.GET["token"]
        )
        page = page_preview.as_page()
        if not page.pk:
            # fake primary key to stop API URL routing from complaining
            page.pk = 0

        return page
