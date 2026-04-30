from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, HealthRecord, Document, Permission, Appointment

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['role', 'phone', 'abha_id']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'profile']

class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = '__all__'
        read_only_fields = ['patient', 'source']

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        read_only_fields = ['patient']

class PermissionSerializer(serializers.ModelSerializer):
    granted_to_name = serializers.CharField(source='granted_to.username', read_only=True)
    class Meta:
        model = Permission
        fields = ['id', 'granted_to', 'granted_to_name', 'status']
        read_only_fields = ['patient']

class AppointmentSerializer(serializers.ModelSerializer):
    professional_name = serializers.CharField(source='professional.username', read_only=True)
    patient_name = serializers.CharField(source='patient.username', read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'
