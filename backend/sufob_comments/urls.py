from django.urls import path

from . import views

urlpatterns = [
    path(
        "<int:post_id>/add/",
        views.add_comment_to_post,
        name="add_comment_to_post",
    ),
    path(
        "<int:comment_id>/approve/",
        views.comment_approve,
        name="comment_approve",
    ),
    path("<int:post_id>/list/", views.comment_list, name="comment_list"),
    path("csrf/", views.csrf, name="csrf"),
]
