from django.urls import path,include
from .views import *

app_name = 'projects'

urlpatterns = [
    path('create/',CreateProjectView.as_view(),name='create'),
    path('list/',ListProjectView.as_view(),name='list'),
    path('<int:pk>/',DetailProjectView.as_view(),name='detail'),
    path('<int:pk>/update/', UpdateSentenceListView.as_view(),name='update'),
    path('<int:pk>/users/add/', AddProjectUserView.as_view(),name='add_annotator'),
    path('<int:pk>/users/', ProjectUserListView.as_view(),name='users'),
    path('get-language-choices/', GetLanguageChoicesView.as_view(),name='get_language_choices'),
]