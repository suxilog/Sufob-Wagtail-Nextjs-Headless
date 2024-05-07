from django.db import models


# Create your models here.
class Comment(models.Model):
    post = models.ForeignKey(
        "blog.BlogPage", on_delete=models.CASCADE, related_name="comments"
    )
    parent = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    author = models.CharField(max_length=100)
    content = models.TextField()
    website = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    approved_comment = models.BooleanField(default=True)

    def approve(self):
        self.approved_comment = True
        self.save()

    def __str__(self):
        return self.author

    class Meta:
        ordering = ("-created_at",)
