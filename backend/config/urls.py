"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.core.management import call_command
from django.shortcuts import render

from django.http import HttpResponse
from django.conf import settings
import os

def auto_setup_home(request):
    try:
        call_command('makemigrations', 'api', interactive=False)
        call_command('migrate', interactive=False)
        
        # Seed professionals
        from django.contrib.auth.models import User
        from api.models import Profile
        
        entities = [
            ("Dr. Anjali (AIIMS)", "doctor"),
            ("Apollo Diagnostics", "lab"),
            ("City Pharmacy Node", "pharmacy"),
            ("Dr. Sameer (Max)", "doctor")
        ]
        
        for name, role in entities:
            user, created = User.objects.get_or_create(username=name)
            if created:
                user.set_unusable_password()
                user.save()
                Profile.objects.get_or_create(user=user, role=role)
                
        # Seed dummy health records for demonstration
        from api.models import HealthRecord
        if not HealthRecord.objects.exists():
            patient_user, _ = User.objects.get_or_create(username='Rajesh Kumar')
            HealthRecord.objects.create(patient=patient_user, type='prescription', title='Metformin 500mg', source='AIIMS New Delhi', details='Dosage: 1-0-1 | Duration: 90 Days')
            HealthRecord.objects.create(patient=patient_user, type='report', title='Complete Blood Count', source='Apollo Diagnostics', details='Hb: 14.2 g/dL | WBC: 7500 mm3')
            HealthRecord.objects.create(patient=patient_user, type='document', title='X-Ray Chest (Posterior)', source='Max Healthcare', details='No active pleuro-parenchymal lesions.')
                
    except Exception as e:
        print("Auto-migration skipped or failed:", e)
        
    try:
        html_path = os.path.join(settings.BASE_DIR.parent, 'index.html')
        with open(html_path, 'r', encoding='utf-8') as f:
            return HttpResponse(f.read())
    except Exception as e:
        return HttpResponse(f"<h1>Error loading index.html:</h1><p>{e}</p><p>Looked in: {html_path}</p>", status=500)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', auto_setup_home, name='home'),
    path('index.html', auto_setup_home),
]
