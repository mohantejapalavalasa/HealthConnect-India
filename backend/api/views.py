from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from .models import Profile, HealthRecord, Document, Permission, Appointment
from .serializers import UserSerializer, HealthRecordSerializer, DocumentSerializer, PermissionSerializer, AppointmentSerializer
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    username = data.get('name')
    if not username:
        return Response({'error': 'Name is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    role = data.get('role', 'patient')
    
    user, created = User.objects.get_or_create(username=username)
    if created:
        user.set_unusable_password()
        user.save()
        Profile.objects.create(user=user, role=role)
    else:
        # Just update role if needed
        pass
        
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UserSerializer(user).data})

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    data = request.data
    phone = data.get('phone') # we'll map phone to username for now
    if not phone:
        return Response({'error': 'Phone/Identifier is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    user = User.objects.filter(username=phone).first()
    if not user:
        # Create a default to mimic OTP success
        user = User.objects.create(username=phone)
        user.set_unusable_password()
        user.save()
        Profile.objects.create(user=user, role='patient')
        
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'user': UserSerializer(user).data})

class HealthRecordViewSet(viewsets.ModelViewSet):
    serializer_class = HealthRecordSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        profile = getattr(self.request.user, 'profile', None)
        if profile and profile.role == 'patient':
            return HealthRecord.objects.filter(patient=self.request.user).order_by('-date')
        return HealthRecord.objects.all().order_by('-date')

    def perform_create(self, serializer):
        patient_id = self.request.data.get('patient_id')
        if patient_id:
            patient = User.objects.filter(id=patient_id).first()
        else:
            patient = self.request.user
            
        if not patient:
            patient = self.request.user

        serializer.save(patient=patient, source=self.request.user.username + " (Professional)")

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Document.objects.filter(patient=self.request.user).order_by('-date')

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class PermissionViewSet(viewsets.ModelViewSet):
    serializer_class = PermissionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Permission.objects.filter(patient=self.request.user)

    def perform_create(self, serializer):
        granted_to_id = self.request.data.get('granted_to')
        if granted_to_id:
            granted_to = User.objects.get(id=granted_to_id)
            serializer.save(patient=self.request.user, granted_to=granted_to)

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'profile') and user.profile.role != 'patient':
            return Appointment.objects.filter(professional=user).order_by('date', 'time')
        return Appointment.objects.filter(patient=user).order_by('date', 'time')

    def perform_create(self, serializer):
        prof_id = self.request.data.get('professional')
        if prof_id:
            prof = User.objects.get(id=prof_id)
            serializer.save(patient=self.request.user, professional=prof)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_professionals(request):
    professionals = Profile.objects.exclude(role='patient')
    data = []
    for p in professionals:
        data.append({
            'id': p.user.id,
            'name': p.user.username,
            'role': p.role,
            'phone': p.phone
        })
    return Response(data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_permission(request):
    granted_to_id = request.data.get('granted_to_id')
    status_val = request.data.get('status', True)
    
    if not granted_to_id:
        return Response({'error': 'granted_to_id is required'}, status=400)
        
    try:
        professional = User.objects.get(id=granted_to_id)
        perm, created = Permission.objects.get_or_create(
            patient=request.user, 
            granted_to=professional
        )
        perm.status = status_val
        perm.save()
        return Response({'status': 'success', 'permission_id': perm.id, 'active': perm.status})
    except User.DoesNotExist:
        return Response({'error': 'Professional not found'}, status=404)
