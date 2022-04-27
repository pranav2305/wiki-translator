import email
import imp
from rest_framework import serializers
from .models import Project,ProjectUser,Sentence
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model

class CreateProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('pk', 'title', 'language',)

class ProjectSerializer(serializers.ModelSerializer):
    language = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('pk','title', 'language',)

    def get_language(self, obj):
        return obj.get_language_display()

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

class AddProjectUserSerializer(serializers.Serializer):
    role = serializers.ChoiceField(choices=ProjectUser.ROLE_CHOICES)
    email = serializers.EmailField()

    def validate_email(self, value):
        if not get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError('User with this email does not exist')
        return value

    def create(self, validated_data):
        user = get_user_model().objects.get(email=validated_data['email'])
        project = self.context['project']
        created_role = ProjectUser.objects.create(project=project, user=user, role=validated_data['role'])
        return created_role

class ProjectUserSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    role = serializers.SerializerMethodField()

    class Meta:
        model = ProjectUser
        fields = ('user','role',)

    def get_role(self, obj):
        return obj.get_role_display()

class ProjectUserListSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('pk', 'title', 'users','role',)

    def get_users(self, obj):
        project_users = ProjectUser.objects.filter(project=obj)
        return ProjectUserSerializer(project_users, many=True).data

    def get_role(self, obj):
        user = self.context['request'].user
        try:
            project_user = ProjectUser.objects.get(project=obj, user=user)
            return project_user.role
        except ProjectUser.DoesNotExist:
            return None
