from blog.api.v2.views import (
    BlogCategoryAPIViewSet,
    BlogTagAPIViewSet,
    PagePreviewAPIViewSet,
)
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.views import PagesAPIViewSet
from wagtail.documents.api.v2.views import DocumentsAPIViewSet
from wagtail.images.api.v2.views import ImagesAPIViewSet

api_router = WagtailAPIRouter("wagtailapi")

api_router.register_endpoint("pages", PagesAPIViewSet)
api_router.register_endpoint("images", ImagesAPIViewSet)
api_router.register_endpoint("documents", DocumentsAPIViewSet)
api_router.register_endpoint("categories", BlogCategoryAPIViewSet)
api_router.register_endpoint("tags", BlogTagAPIViewSet)
api_router.register_endpoint("page_preview", PagePreviewAPIViewSet)
