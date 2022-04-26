from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    use_in_migrations = True
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have an password address')

        email = self.normalize_email(email)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        email = self.normalize_email(email)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

class CustomUser(AbstractUser):
    username=None
    email = models.EmailField(_('email address'), unique=True)
    is_superuser = models.BooleanField(_('superuser status'),default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']
    objects = CustomUserManager()

    def __str__(self):
        return self.email

