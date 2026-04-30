from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('patient', 'Citizen'),
        ('doctor', 'Doctor'),
        ('lab', 'Laboratory'),
        ('pharmacy', 'Pharmacy'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    phone = models.CharField(max_length=15, blank=True)
    abha_id = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.user.username} ({self.role})"

class HealthRecord(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_records')
    type = models.CharField(max_length=20) # 'prescription', 'report', 'document'
    title = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

    def __str__(self):
        return self.title

class Document(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    size = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    ROLE_CHOICES = (
        ('patient', 'Citizen'),
        ('doctor', 'Doctor'),
        ('lab', 'Laboratory'),
        ('pharmacy', 'Pharmacy'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    phone = models.CharField(max_length=15, blank=True)
    abha_id = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return f"{self.user.username} ({self.role})"

class HealthRecord(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='health_records')
    type = models.CharField(max_length=20) # 'prescription', 'report', 'document'
    title = models.CharField(max_length=255)
    source = models.CharField(max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    details = models.TextField()

    def __str__(self):
        return self.title

class Document(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='documents')
    name = models.CharField(max_length=255)
    size = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Permission(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='granted_permissions')
    granted_to = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_permissions')
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.patient.username} -> {self.granted_to.username} ({self.status})"

class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments_as_patient')
    professional = models.ForeignKey(User, on_delete=models.CASCADE, related_name='appointments_as_prof')
    date = models.DateField()
    time = models.CharField(max_length=20)
    reason = models.CharField(max_length=255)
    status = models.CharField(max_length=20, default='Upcoming') # Upcoming, Completed, Cancelled
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient.username} with {self.professional.username} on {self.date}"
