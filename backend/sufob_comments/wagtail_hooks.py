from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from .models import Comment


class CommentAdmin(ModelAdmin):
    model = Comment
    menu_label = "Comments"  # 用于后台菜单的标签
    menu_icon = "placeholder"  # 图标
    list_display = ("content", "author", "created_at", "approved_comment")
    search_fields = ("content", "author")


modeladmin_register(CommentAdmin)
