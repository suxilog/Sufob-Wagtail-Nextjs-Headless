from blog.models import BlogPage
from django.conf import settings
from django.core.mail import EmailMultiAlternatives, send_mail
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import get_object_or_404, redirect, render
from django.template.loader import render_to_string

from .forms import CommentForm
from .models import Comment


def add_comment_to_post(request, post_id):
    post = get_object_or_404(BlogPage, id=post_id)
    if request.method != "POST":
        return JsonResponse({"status": "error", "message": "Wrong request method"})

    form = CommentForm(request.POST)
    if form.is_valid():
        comment = form.save(commit=False)
        comment.post = post

        # 处理父评论
        parent = form.cleaned_data.get("parent")
        if parent is not None:
            comment.parent = get_object_or_404(Comment, id=parent.id)

        comment.save()
        # 发送邮件通知管理员

        text_content = render_to_string(
            "email_templates/comment_add_success.txt",
            {
                "blog": post,
                "comment": comment,
            },
        )
        html_content = render_to_string(
            "email_templates/comment_add_success.html",
            {
                "blog": post,
                "comment": comment,
            },
        )
        mail = EmailMultiAlternatives(
            f"{settings.EMAIL_SUBJECT_PREFIX} 新留言通知",
            text_content,
            settings.DEFAULT_FROM_EMAIL,
            [settings.ADMIN_EMAIL],
        )
        mail.attach_alternative(html_content, "text/html")
        mail.send(fail_silently=False)
        return JsonResponse(
            {
                "status": "success",
                "message": "Comment added successfully",
                "data": comment.id,
            }
        )

    return JsonResponse({"status": "error", "message": "Form is invalid"})


def comment_approve(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id)
    comment.approve()
    return redirect("blog:post_detail", post_id=comment.post.id)


def get_all_comments(comments):
    all_comments = []
    for comment in comments:
        # 添加当前评论
        comment_data = {
            "id": comment.id,
            "author": comment.author,
            "content": comment.content,
            "created_at": comment.created_at,
            "replies": get_all_comments(comment.replies.all()),  # 递归获取子评论
        }
        all_comments.append(comment_data)
    return all_comments


def comment_list(request, post_id):
    post = get_object_or_404(BlogPage, id=post_id)
    comments = post.comments.filter(approved_comment=True)
    main_comments = comments.filter(parent=None)

    # 使用递归函数获取所有评论及其子评论
    all_comments = get_all_comments(main_comments)

    return JsonResponse(
        {
            "status": "success",
            "data": {
                "comments": all_comments,
            },
            "post_id": post.id,
            "total_comments": comments.count(),
        }
    )


def csrf(request):
    return JsonResponse({"csrftoken": get_token(request)})
