from django.urls import path,include
from .views import *

app_name = 'projects'

urlpatterns = [
    path('create/',CreateProjectView.as_view(),name='create'),
]