# forms.py
from django import forms

from .models import Comment


class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = [
            "content",
            "author",
            "parent",
            "website",
        ]  # 或者包括 'author' 如果不是从请求中自动设置
