# Create your views here.

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import BlogPage, BlogPageView


@csrf_exempt
@require_POST
def update_view_count(request, blog_page_id):
    try:
        ip_address = get_client_ip(request)
        user = request.user if request.user.is_authenticated else None
        blog_page = BlogPage.objects.get(id=blog_page_id)
        blog_page.view_count += 1
        blog_page.save()
        BlogPageView.objects.create(
            blog_page=blog_page,
            ip_address=ip_address,
            user=user,
        )
        return JsonResponse({"status": "success", "view_count": blog_page.view_count})
    except BlogPage.DoesNotExist:
        return JsonResponse({"status": "error", "message": "Blog page not found"})
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)})


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


def health_check(request):
    return HttpResponse("OK", content_type="text/plain")
