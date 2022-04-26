from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.views import APIView
from yaml import serialize
from .serializers import CreateProjectSerializer,UserProjectListSerializer,DetailPostSerializer,AddProjectUserSerializer
from .models import Project ,ProjectUser, Sentence
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

class ListProjectView(generics.ListAPIView):
    queryset = ProjectUser.objects.all()
    serializer_class = UserProjectListSerializer

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

class DetailProjectView(generics.RetrieveAPIView):
    queryset = Project.objects.all()
    serializer_class = DetailPostSerializer

    def get_queryset(self):
        return super().get_queryset().filter(pk=self.kwargs['pk'])

class UpdateSentenceListView(APIView):
    def patch(self, request, *args, **kwargs):
        project = Project.objects.get(pk=self.kwargs['pk'])
        if not ProjectUser.objects.filter(project=project, user=request.user).exists():
            return Response({"detail": "You are not allowed to update this project"}, status=status.HTTP_403_FORBIDDEN)
        for sentence in request.data:
            Sentence.objects.filter(pk=sentence['pk']).update(translated_sentence=sentence['translated_sentence'])
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddProjectUserView(generics.CreateAPIView):
    queryset = ProjectUser.objects.all()
    serializer_class = AddProjectUserSerializer

    def create(self, request, *args, **kwargs):
        project = Project.objects.get(pk=self.kwargs['pk'])
        if ProjectUser.objects.get(project=project, user=request.user) and not ProjectUser.objects.get(project=project, user=request.user).role=='M':
            return Response({"detail": "You are not allowed to update this project"}, status=status.HTTP_403_FORBIDDEN)
        serializer = self.get_serializer(data=request.data, context={'project': self.kwargs['pk']})
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)