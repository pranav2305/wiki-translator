from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Project(models.Model):
    LANGUAGE_CHOICE = (
        ('bn', 'Bengali'),
        ('gu', 'Gujarati'),
        ('hi', 'Hindi'),
        ('kn', 'Kannada'),
        ('ml', 'Malayalam'),
        ('mr', 'Marathi'),
        ('ne', 'Nepali'),
        ('or', 'Oriya'),
        ('pa', 'Punjabi'),
        ('si', 'Sinhala'),
        ('ta', 'Tamil'),
        ('te', 'Telugu'),
        ('ur', 'Urdu'),
    )

    title = models.CharField(max_length=100)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Sentence(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    original_sentence = models.CharField(max_length=500)
    translated_sentence = models.CharField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.original_sentence

class ProjectUser(models.Model):
    ROLE_CHOICES = (
        ('M', 'Manager'),
        ('A', 'Annotator'),
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    role = models.CharField(max_length=1, choices=ROLE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name