from rest_framework import generics,status
from rest_framework.response import Response
from .serializers import CreateProjectSerializer
from .models import Project ,ProjectUser
from wiki_translator.utils.wiki_fetch import get_wiki_page

# Create your views here.
class CreateProjectView(generics.CreateAPIView):
    queryset = Project.objects.all()
    serializer_class = CreateProjectSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        ProjectUser.objects.create(project=serializer.instance, user=request.user, role='M')
        get_wiki_page(serializer.instance.title, serializer.instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)