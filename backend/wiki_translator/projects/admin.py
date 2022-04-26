from django.contrib import admin
from .models import Project, ProjectUser, Sentence

# Register your models here.
admin.site.register(Project)
admin.site.register(ProjectUser)
admin.site.register(Sentence)