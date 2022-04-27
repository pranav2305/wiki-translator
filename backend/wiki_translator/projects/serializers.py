from rest_framework import serializers
from .models import Project,ProjectUser,Sentence

class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'title', 'language',)

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk','title', 'language',)

class UserProjectListSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    class Meta:
        model = ProjectUser
        fields = ('project','role',)

class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ('pk','original_sentence','translated_sentence',)

class DetailPostSerializer(serializers.ModelSerializer):
    sentences = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('pk','title', 'language','sentences','role',)

    def get_sentences(self, obj):
        return SentenceSerializer(obj.sentence_set.all(), many=True).data

    def get_role(self, obj):
        user = self.context['request'].user
        try:
            project_user = ProjectUser.objects.get(project=obj, user=user)
            return project_user.get_role_display()
        except ProjectUser.DoesNotExist:
            return None

    def get_language(self, obj):
        return obj.get_language_display()

class AddProjectUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUser
        fields = ('user','role',)

    def create(self, validated_data):
        validated_data['project'] = Project.objects.get(pk=self.context['project'])
        project_user = ProjectUser.objects.create(**validated_data)
        project_user.save()
        return project_user
